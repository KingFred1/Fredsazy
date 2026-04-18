import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const result = await resend.emails.send({
      from: 'welcome@fredsazy.com',
      to: email,
      subject: `Welcome to TechFacts, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4f46e5;">Welcome to TechFacts! 🎉</h1>
          <p style="font-size: 16px; color: #333;">Hi ${name},</p>
          <p style="font-size: 16px; color: #333;">
            Thank you for joining our community! We're excited to have you as part of TechFacts.
          </p>
          <p style="font-size: 16px; color: #333;">
            You can now:
          </p>
          <ul style="font-size: 16px; color: #333;">
            <li>Access exclusive blog posts and tech insights</li>
            <li>Subscribe to our newsletter for weekly updates</li>
            <li>Connect with other tech enthusiasts</li>
            <li>Get notified about new content</li>
          </ul>
          <p style="font-size: 16px; color: #333;">
            Check out your profile to manage your preferences and settings.
          </p>
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Best regards,<br/>
            The TechFacts Team
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;"/>
          <p style="font-size: 12px; color: #999;">
            © 2026 TechFacts. All rights reserved.
          </p>
        </div>
      `,
    });
    return result;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

export async function sendNewsletterConfirmation(email: string, name?: string) {
  try {
    const result = await resend.emails.send({
      from: 'newsletter@fredsazy.com',
      to: email,
      subject: 'Newsletter Subscription Confirmed - TechFacts',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4f46e5;">Newsletter Subscription Confirmed! 📬</h1>
          <p style="font-size: 16px; color: #333;">Hi ${name || 'there'},</p>
          <p style="font-size: 16px; color: #333;">
            You've successfully subscribed to our newsletter! Starting next week, you'll receive:
          </p>
          <ul style="font-size: 16px; color: #333;">
            <li>Weekly tech insights and industry trends</li>
            <li>Curated blog posts from our experts</li>
            <li>Exclusive deals and resources</li>
            <li>Community highlights and announcements</li>
          </ul>
          <p style="font-size: 16px; color: #333;">
            Thank you for staying informed with TechFacts!
          </p>
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Best regards,<br/>
            The TechFacts Team
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;"/>
          <p style="font-size: 12px; color: #999;">
            © 2026 TechFacts. All rights reserved.
          </p>
        </div>
      `,
    });
    return result;
  } catch (error) {
    console.error('Error sending newsletter confirmation:', error);
    throw error;
  }
}

export async function sendContactNotification(name: string, email: string, subject: string, message: string) {
  try {
    // Send to admin
    const adminResult = await resend.emails.send({
      from: 'contact@fredsazy.com',
      to: 'hello@fredsazy.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4f46e5;">New Contact Form Submission</h1>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #4f46e5;">
            ${message.replace(/\n/g, '<br/>')}
          </p>
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Please reply to the sender's email address above.
          </p>
        </div>
      `,
    });

    // Send confirmation to user
    const userResult = await resend.emails.send({
      from: 'contact@fredsazy.com',
      to: email,
      subject: 'We received your message - TechFacts',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4f46e5;">Thank You for Reaching Out! 📧</h1>
          <p style="font-size: 16px; color: #333;">Hi ${name},</p>
          <p style="font-size: 16px; color: #333;">
            We've received your message and will get back to you shortly.
          </p>
          <p style="font-size: 14px; color: #666;">
            <strong>Your Message Summary:</strong><br/>
            Subject: ${subject}
          </p>
          <p style="font-size: 16px; color: #333;">
            Thank you for contacting TechFacts!
          </p>
          <p style="margin-top: 30px; font-size: 14px; color: #666;">
            Best regards,<br/>
            The TechFacts Team
          </p>
        </div>
      `,
    });

    return { adminResult, userResult };
  } catch (error) {
    console.error('Error sending contact notification:', error);
    throw error;
  }
}
