import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contacts } from "@/lib/schema";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
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

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Save to database
    await db.insert(contacts).values({
      name,
      email,
      subject,
      message,
      status: "new",
    });

    // Send emails
    await sendContactNotification(name, email, subject, message);

    return NextResponse.json(
      { message: "Message sent successfully. We'll be in touch!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
