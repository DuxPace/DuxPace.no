"use client";

import { useActionState, useEffect, useState } from "react";
import { sendContactEmail } from "../../actions/contact";
import { translations, type Language } from "../../lib/data/content";
import { track } from "../../shared/components/Consent";

const TOPICS = ["site", "insurance", "research", "other"] as const;

function Form({ lang, onDone }: { lang: Language; onDone: () => void }) {
  const t = translations[lang].contact;
  const [state, action, pending] = useActionState(sendContactEmail, null);
  const [topic, setTopic] = useState<string>("site");

  useEffect(() => {
    if (state?.success) track("contact_submit", { topic });
  }, [state, topic]);

  if (state?.success) {
    return (
      <div role="status">
        <p className="text-lg font-bold">{t.successTitle}</p>
        <p className="mt-2 text-ink-2">{t.successBody}</p>
        <button
          type="button"
          onClick={onDone}
          className="mt-5 inline-flex min-h-11 items-center font-semibold text-magenta underline underline-offset-4 transition-colors duration-150 hover:text-magenta-dark"
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const field =
    "mt-1.5 w-full rounded-[var(--radius-control)] border border-ink-2 bg-paper px-3.5 py-3 text-ink transition-colors duration-150 focus:border-magenta";
  const label = "block font-medium";
  const req = <span className="font-normal text-ink-2"> ({t.required})</span>;

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="lang" value={lang} />
      {/* Honeypot: real users never see or fill it; the server drops submissions that do. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={label}>{t.name}{req}</label>
          <input id="contact-name" name="name" required minLength={2} maxLength={100} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="contact-email" className={label}>{t.email}{req}</label>
          <input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-topic" className={label}>{t.topic}</label>
        <select
          id="contact-topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={`${field} min-h-12`}
        >
          {TOPICS.map((k) => (
            <option key={k} value={k}>{t.topics[k]}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={label}>{t.message}{req}</label>
        <p id="contact-message-hint" className="text-sm text-ink-2">{t.messageHint}</p>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          aria-describedby="contact-message-hint"
          className={`${field} resize-y`}
        />
      </div>

      {state?.error && (
        <p role="alert" className="rounded-[var(--radius-control)] bg-paper px-4 py-3 font-medium text-magenta-dark">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="min-h-12 rounded-[var(--radius-control)] bg-magenta px-6 font-semibold text-paper transition-colors duration-150 hover:bg-magenta-dark active:bg-ink disabled:cursor-wait disabled:opacity-80"
      >
        {pending ? t.sending : t.send}
      </button>
    </form>
  );
}

export default function ContactForm({ lang }: { lang: Language }) {
  const [key, setKey] = useState(0);
  return <Form key={key} lang={lang} onDone={() => setKey((k) => k + 1)} />;
}
