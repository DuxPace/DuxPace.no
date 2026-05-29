"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactState = {
  success: boolean;
  error?: string;
} | null;

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all fields." };
  }

  if (name.length < 2 || name.length > 100) {
    return { success: false, error: "Name must be between 2 and 100 characters." };
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (message.length < 10 || message.length > 5000) {
    return { success: false, error: "Message must be between 10 and 5000 characters." };
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set");
    return { success: false, error: "Email service not configured." };
  }

  const from = "DuxPace Contact <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: "planet@duxpace.no",
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Failed to send. Please try again." };
  }

  return { success: true };
}
