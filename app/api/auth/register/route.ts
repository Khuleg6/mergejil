import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool, initializeSchema } from "@/lib/db";
import { signToken, getSessionCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await initializeSchema();
    const { email, password, firstName, lastName, grade } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "И-мэйл болон нууц үг шаардлагатай" },
        { status: 400 }
      );
    }

    const pool = getPool();

    // Check if user already exists
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email.toLowerCase()]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "Энэ и-мэйл хаяг бүртгэлтэй байна" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, grade)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name`,
      [email.toLowerCase(), passwordHash, firstName || null, lastName || null, grade || null]
    );

    const user = result.rows[0];
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
    console.error("Register error:", err);
    return NextResponse.json({ error: "Серверийн алдаа гарлаа" }, { status: 500 });
  }
}
