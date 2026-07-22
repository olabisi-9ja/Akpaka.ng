import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
      if (req.nextauth.token?.role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }
  },
  {
    secret: process.env.NEXTAUTH_SECRET || "akpaka-super-secret-development-key-2026",
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/admin/login")) {
          return true;
        }
        return !!token;
      }
    }
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
