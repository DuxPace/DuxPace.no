"use server";

import { cookies, headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RL_COOKIE = "rl_contact";
const RL_WINDOW_S = 60;
const RL_WINDOW_MS = RL_WINDOW_S * 1000;
const MAX_IP_MAP = 10_000;

// In-process IP rate limit. Survives across warm serverless invocations on the
// same instance, significantly raising the bar even when cookies are absent.
const ipLastSeen = new Map<string, number>();

// x-real-ip is set by Vercel to the actual client IP and cannot be spoofed.
// x-forwarded-for is taken from the rightmost entry (Vercel-appended), not the
// leftmost, which is attacker-controlled.
function clientIp(realIp: string | null, forwardedFor: string | null): string | null {
  if (realIp) return realIp.trim();
  if (!forwardedFor) return null;
  const parts = forwardedFor.split(",");
  return parts[parts.length - 1].trim();
}

function ipAllowed(ip: string | null): boolean {
  if (ip === null) return true;
  const now = Date.now();
  const last = ipLastSeen.get(ip);
  if (last !== undefined && now - last < RL_WINDOW_MS) return false;
  if (ipLastSeen.size >= MAX_IP_MAP) {
    const cutoff = now - RL_WINDOW_MS;
    for (const [k, v] of ipLastSeen) {
      if (v < cutoff) ipLastSeen.delete(k);
    }
    if (ipLastSeen.size >= MAX_IP_MAP) return false;
  }
  ipLastSeen.set(ip, now);
  return true;
}

export type ContactState = {
  success: boolean;
  error?: string;
} | null;

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

const MESSAGES = {
  en: {
    name_empty: "Please enter your name.",
    name_short: "Name must be at least 2 characters.",
    name_long: "Name must be less than 100 characters.",
    email_empty: "Please enter your email.",
    email_long: "Email must be less than 254 characters.",
    email_invalid: "Please enter a valid email address.",
    message_empty: "Please enter a message.",
    message_short: "Message must be at least 10 characters.",
    message_long: "Message must be less than 5000 characters.",
    service_error: "Email service not configured.",
    send_failed: "Failed to send. Please try again.",
    rate_limited: "Please wait 60 seconds before sending another message.",
  },
  no: {
    name_empty: "Vennligst oppgi ditt navn.",
    name_short: "Navnet må være minst 2 tegn.",
    name_long: "Navnet kan ikke være mer enn 100 tegn.",
    email_empty: "Vennligst oppgi din e-postadresse.",
    email_long: "E-postadressen kan ikke være mer enn 254 tegn.",
    email_invalid: "Vennligst oppgi en gyldig e-postadresse.",
    message_empty: "Vennligst skriv en melding.",
    message_short: "Meldingen må være minst 10 tegn.",
    message_long: "Meldingen kan ikke være mer enn 5000 tegn.",
    service_error: "E-posttjeneste ikke konfigurert.",
    send_failed: "Sending mislyktes. Prøv igjen.",
    rate_limited: "Vent 60 sekunder før du sender en ny melding.",
  },
};

type Messages = typeof MESSAGES.en;

function validate(name: string, email: string, message: string, m: Messages): string | null {
  if (!name) return m.name_empty;
  if (name.length < 2) return m.name_short;
  if (name.length > 100) return m.name_long;
  if (!email) return m.email_empty;
  if (email.length > 254) return m.email_long;
  if (!EMAIL_RE.test(email)) return m.email_invalid;
  if (!message) return m.message_empty;
  if (message.length < 10) return m.message_short;
  if (message.length > 5000) return m.message_long;
  return null;
}

export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const lang = formData.get("lang") === "no" ? "no" : "en";
  const m = MESSAGES[lang];

  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  const err = validate(name, email, message, m);
  if (err) return { success: false, error: err };

  const headerStore = await headers();
  const ip = clientIp(headerStore.get("x-real-ip"), headerStore.get("x-forwarded-for"));
  if (!ipAllowed(ip)) {
    return { success: false, error: m.rate_limited };
  }

  const cookieStore = await cookies();
  if (cookieStore.get(RL_COOKIE)) {
    return { success: false, error: m.rate_limited };
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set");
    return { success: false, error: m.service_error };
  }

  const from = "DuxPace Contact <noreply@duxpace.no>";

  let sendError: unknown;
  try {
    const { error } = await resend.emails.send({
      from,
      to: "planet@duxpace.no",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    sendError = error;
  } catch (err) {
    console.error("Resend threw:", err);
    return { success: false, error: m.send_failed };
  }

  if (sendError) {
    console.error("Resend error:", sendError);
    return { success: false, error: m.send_failed };
  }

  (await cookies()).set(RL_COOKIE, "1", {
    maxAge: RL_WINDOW_S,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return { success: true };
}
