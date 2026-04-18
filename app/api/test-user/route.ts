import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export async function GET(request: NextRequest) {
  try {
    const allUsers = await db.select().from(users);
    
    return NextResponse.json({
      count: allUsers.length,
      users: allUsers.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        hasPassword: !!u.password,
      }))
    });
  } catch (error) {
    console.error("Test error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users", details: String(error) },
      { status: 500 }
    );
  }
}
