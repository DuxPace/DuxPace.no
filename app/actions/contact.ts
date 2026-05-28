"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  success: boolean;
  error?: string;
} | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@.][^\s@]*$/;

function validate(name: string, email: string, message: string): string | null {
  if (!name) return "Please enter your name.";
  if (name.length < 2) return "Name must be at least 2 characters.";
  if (name.length > 100) return "Name must be less than 100 characters.";
  if (!email) return "Please enter your email.";
  if (email.length > 254) return "Email must be less than 254 characters.";
  if (!EMAIL_RE.test(email)) return "Please enter a valid email address.";
  if (!message) return "Please enter a message.";
  if (message.length < 10) return "Message must be at least 10 characters.";
  if (message.length > 5000) return "Message must be less than 5000 characters.";
  return null;
}

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  const err = validate(name, email, message);
  if (err) return { success: false, error: err };

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
