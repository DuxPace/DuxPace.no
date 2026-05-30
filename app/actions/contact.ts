"use server";

import { cookies } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const COOLDOWN_SECONDS = 60;

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
    rate_limited: "Please wait before sending another message.",
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
    rate_limited: "Vennligst vent litt før du sender en ny melding.",
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

  const cookieStore = await cookies();
  const lastTs = cookieStore.get("contact_last")?.value;
  if (lastTs) {
    const elapsed = (Date.now() - parseInt(lastTs, 10)) / 1000;
    if (elapsed < COOLDOWN_SECONDS) {
      return { success: false, error: m.rate_limited };
    }
  }

  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  const err = validate(name, email, message, m);
  if (err) return { success: false, error: err };

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set");
    return { success: false, error: m.service_error };
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
    return { success: false, error: m.send_failed };
  }

  cookieStore.set("contact_last", Date.now().toString(), {
    httpOnly: true,
    sameSite: "strict",
    maxAge: COOLDOWN_SECONDS,
    path: "/",
  });

  return { success: true };
}
