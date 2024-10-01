import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin-auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/api/messages"],
};
