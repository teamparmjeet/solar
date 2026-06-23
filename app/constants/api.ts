import { forceLogout } from "../utils/logout";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export const baseapi = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
        ...(options.headers || {}),
      },
    }
  );

  let data = null;

  try {
    data = await response.clone().json();
  } catch {}

  const tokenErrors = [
    "Access token missing",
    "Invalid token format",
    "Session expired, please login again",
    "Invalid or expired token",
  ];

  const isLogoutRoute =
    endpoint.includes("/api/auth/logout");

  if (
    !isLogoutRoute &&
    (
      response.status === 401 ||
      (
        data &&
        !data.success &&
        tokenErrors.includes(data.message)
      )
    )
  ) {
    await forceLogout();
    throw new Error("Session expired");
  }

  return response;
};