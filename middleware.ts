import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin");
};

const isDashboardRoute = (pathname: string) => {
  return pathname.startsWith("/dashboard");
};

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    //console.log("token in middleware",token)

    if (isDashboardRoute(pathname)) {
      return NextResponse.rewrite(new URL(pathname, req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        //console.log("token value in middleware callback", JSON.stringify(token))
        return token?.role === "admin" || token?.role === "user";
      },
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };
