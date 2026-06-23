import { baseapi } from "../constants/api";
export const forceLogout = async () => {
  try { 

    await baseapi(`/api/auth/logout`,
      {
        method: "POST"
        
      }
    );
  } catch (err) {
    console.log(err);
  }

  localStorage.removeItem("user");
  localStorage.removeItem("token");

  document.cookie =
    "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  document.cookie =
    "role=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  window.location.replace("/");
};