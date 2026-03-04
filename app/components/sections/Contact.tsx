"use client";

import { useActionState } from "react";
import FadeIn from "../FadeIn";
import { useLanguage } from "../LanguageProvider";
import { siteConfig } from "../../data/content";
import { sendContactEmail } from "../../actions/contact";

function ContactForm() {
  const { t } = useLanguage();
  const [state, action, pending] = useActionState(sendContactEmail, null);

  if (state?.success) {
    return (
      <div className="pt-2">
        <p className="text-white text-sm font-medium mb-1">Message sent.</p>
        <p className="text-gray-600 text-sm">We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <div>
        <label htmlFor="contact-name" className="sr-only">{t.contact.namePlaceholder}</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder={t.contact.namePlaceholder}
          required
          className="w-full bg-transparent border-b border-white/[0.12] py-3 text-white placeholder-gray-700 focus:outline-none focus:border-white/30 transition-colors text-sm"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="sr-only">{t.contact.emailPlaceholder}</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder={t.contact.emailPlaceholder}
          required
          className="w-full bg-transparent border-b border-white/[0.12] py-3 text-white placeholder-gray-700 focus:outline-none focus:border-white/30 transition-colors text-sm"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="sr-only">{t.contact.messagePlaceholder}</label>
        <textarea
          id="contact-message"
          name="message"
          placeholder={t.contact.messagePlaceholder}
          rows={4}
          required
          className="w-full bg-transparent border-b border-white/[0.12] py-3 text-white placeholder-gray-700 focus:outline-none focus:border-white/30 transition-colors resize-none text-sm"
        />
      </div>
      {state?.error && (
        <p className="text-red-400 text-xs">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="text-[11px] font-semibold text-black bg-white px-5 py-2.5 rounded-sm hover:bg-gray-100 transition-colors tracking-[0.1em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {pending ? "Sending…" : t.contact.send}
      </button>
    </form>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const { email, location, mapEmbed } = siteConfig.contact;
  return (
    <section id="contact" className="py-28 md:py-40 border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <FadeIn>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {t.contact.headline}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
                {t.contact.body}
              </p>
              <div className="space-y-1 text-xs font-mono mb-10">
                <p className="text-gray-600">{email}</p>
                <p className="text-gray-600">{location}</p>
              </div>
              <div className="relative w-full aspect-video overflow-hidden border border-white/[0.08]">
                <iframe
                  src={mapEmbed}
                  title="VM-paviljongen location on Google Maps"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
