import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: Request) {
    const token = await getToken({ req });

    // Redirect unauthenticated users to the login page
    if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Redirect users based on their roles
    if (token.role === "Student") {
        return NextResponse.redirect(new URL("/dashboard/student", req.url));
    }

    if (token.role === "Faculty") {
        return NextResponse.redirect(new URL("/dashboard/Faculty", req.url));
    }

    if (token.role === "Head of Examination") {
        return NextResponse.redirect(
            new URL("/dashboard/Head-of-Examination", req.url)
        );
    }

    // Allow the request if no redirection is needed
    return NextResponse.next();
}

// Specify paths where the middleware should run
export const config = {
    matcher: ["/admin/:path*", "/user/:path*"],
};
