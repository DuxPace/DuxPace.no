"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactFormRateLimit } from "../_lib/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  success: boolean;
  error?: string;
} | null;

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a hidden field real users never see. Bots fill every input, so a
  // non-empty value means an automated submission. Report success without
  // sending, so the bot gets no signal that it was caught.
  if (formData.get("company")?.toString().trim()) {
    return { success: true };
  }

  // Rate limit per client IP, server-side. The previous cookie-based limit was
  // trivially bypassed by clearing cookies; this keys on the forwarded IP in
  // Redis. Fails open when Upstash is not configured (e.g. local dev).
  if (contactFormRateLimit) {
    const forwarded = (await headers()).get("x-forwarded-for") ?? "";
    const ip = forwarded.split(",")[0]?.trim() || "unknown";
    const { success } = await contactFormRateLimit.limit(ip);
    if (!success) {
      return {
        success: false,
        error: "Too many messages. Please try again later.",
      };
    }
  }

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all fields." };
  }

  if (!process.env.RESEND_API_KEY) {
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
    return { success: false, error: "Failed to send. Please try again." };
  }

  return { success: true };
}
