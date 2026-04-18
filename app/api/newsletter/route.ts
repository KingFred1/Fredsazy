import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletters } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { sendNewsletterConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await db
      .select()
      .from(newsletters)
      .where(eq(newsletters.email, email))
      .limit(1);

    if (existing.length > 0 && existing[0].subscribed) {
      return NextResponse.json(
        { message: "Already subscribed to newsletter", status: "already_subscribed" },
        { status: 200 }
      );
    }

    if (existing.length > 0) {
      // Resubscribe
      await db
        .update(newsletters)
        .set({ subscribed: true, updatedAt: new Date() })
        .where(eq(newsletters.email, email));
    } else {
      // New subscription
      await db.insert(newsletters).values({
        email,
        name: name || null,
        subscribed: true,
      });
    }

    // Send confirmation email
    await sendNewsletterConfirmation(email, name);

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
