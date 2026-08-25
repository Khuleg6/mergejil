import { NextResponse } from "next/server";
import { getSessionCookieOptions } from "@/lib/auth";

export async function POST() {
  const response = NextResponse?.json({ success: true });
  const cookieOpts = getSessionCookieOptions();
  response?.cookies?.set(cookieOpts?.name, "", { ...cookieOpts, maxAge: 0 });
  return response;
}
