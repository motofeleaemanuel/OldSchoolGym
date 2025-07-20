// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

const SECRET = process.env.NEXTAUTH_SECRET!;

export default withAuth(
  async (req: NextRequestWithAuth) => {
    const { pathname } = req.nextUrl;
    const method = req.method;

    if (pathname.startsWith("/admin/dashboard")) {
      const token = await getToken({ req, secret: SECRET });
      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
      return NextResponse.next();
    }

    if (pathname === "/api/v1/subscriptions" && method === "POST") {
      const token = await getToken({ req, secret: SECRET });
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.next();
    }

    if (pathname === "/api/v1/gallery" && method === "POST") {
      const token = await getToken({ req, secret: SECRET });
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/api/v1/subscriptions",
    "/api/v1/gallery",
  ],
};
