import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool, initializeSchema } from "@/lib/db";
import { signToken, getSessionCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await initializeSchema();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "И-мэйл болон нууц үг шаардлагатай" },
        { status: 400 }
      );
    }

    const pool = getPool();
    const result = await pool.query(
      "SELECT id, email, password_hash, first_name, last_name FROM users WHERE email = $1",
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "И-мэйл эсвэл нууц үг буруу байна" },
        { status: 401 }
      );
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "И-мэйл эсвэл нууц үг буруу байна" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    });

    const cookieOpts = getSessionCookieOptions();
    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name },
    });
    response.cookies.set(cookieOpts.name, token, cookieOpts);
    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Серверийн алдаа гарлаа" }, { status: 500 });
  }
}
