import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const planStatus = request.cookies.get("plan_status")?.value;

    const token =
        request.cookies.get("token")?.value;

    const role =
        request.cookies.get("role")?.value;

    if (pathname === "/Alogin") {
        if (token && role === "admin") {
            return NextResponse.redirect(
                new URL("/Admin", request.url)
            );
        }
        return NextResponse.next();
    }

    if (pathname === "/Elogin") {
        if (token && role === "emitr") {
            return NextResponse.redirect(
                new URL("/Emitr", request.url)
            );
        }
        return NextResponse.next();
    }

    if (pathname.startsWith("/Admin")) {
        if (!token || role !== "admin") {
            return NextResponse.redirect(
                new URL("/Alogin", request.url)
            );
        }
    }

    if (pathname.startsWith("/Emitr")) {
        if (!token || role !== "emitr") {
            return NextResponse.redirect(new URL("/Elogin", request.url));
        }

        // If plan is not active
        if (planStatus !== "active") {
            const allowedPaths = [
                "/Emitr",
                "/Emitr/Setting",
            ];

            const isAllowed = allowedPaths.some(
                (path) => pathname === path
            );

            if (!isAllowed) {
                return NextResponse.redirect(
                    new URL("/Emitr", request.url)
                );
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/Alogin",
        "/Elogin",
        "/Admin/:path*",
        "/Emitr/:path*",
    ],
};