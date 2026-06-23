import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

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
            return NextResponse.redirect(
                new URL("/Elogin", request.url)
            );
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