import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Query database for user
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user[0]) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 401 }
      );
    }

    if (!user[0].password) {
      return NextResponse.json(
        { error: "No password set", success: false },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid password", success: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user[0].id,
        email: user[0].email,
        name: user[0].name,
        role: user[0].role,
      },
      message: "Authentication successful",
    });
  } catch (error) {
    console.error("Auth test error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
