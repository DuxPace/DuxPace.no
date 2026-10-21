"use client";

import { useActionState, useState } from "react";
import { FadeIn } from "../../../shared/components/animations/ScrollReveal";
import { useLanguage } from "../../../shared/providers/LanguageProvider";
import { siteConfig } from "../../../lib/data/content";
import { sendContactEmail } from "../../../actions/contact";
import { motion } from "framer-motion";

function ContactForm({ onReset }: { onReset: () => void }) {
  const { t, lang } = useLanguage();
  const [state, action, pending] = useActionState(sendContactEmail, null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

  if (state?.success) {
    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white text-xl font-medium mb-2">{t.contact.successTitle}</p>
        <p className="text-gray-400 mb-6">{t.contact.successBody}</p>
        <button
          onClick={onReset}
          className="text-sm font-semibold tracking-[0.08em] uppercase text-blue-400 hover:text-blue-300 transition-colors min-h-11"
        >
          {t.contact.sendAnother}
        </button>
      </motion.div>
    );
  }

  const inputClass = "w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors duration-200 text-base";

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="lang" value={lang} />
      {/* Honeypot: off-screen and hidden from assistive tech. Real users never
          fill it; bots do, and the server drops those submissions. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="contact-name" className="block text-sm text-gray-400 mb-1.5">
          {t.contact.nameLabel}
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          placeholder={t.contact.namePlaceholder}
          required
          maxLength={100}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm text-gray-400 mb-1.5">
          {t.contact.emailLabel}
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          placeholder={t.contact.emailPlaceholder}
          required
          maxLength={254}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <div className="flex justify-between items-baseline mb-1.5">
          <label htmlFor="contact-message" className="block text-sm text-gray-400">
            {t.contact.messageLabel}
          </label>
          <span className={`text-xs tabular-nums ${
            formData.message.length > 4800
              ? "text-red-400"
              : formData.message.length > 4500
              ? "text-yellow-400"
              : "text-gray-400"
          }`}>
            {formData.message.length} / 5000
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          placeholder={t.contact.messagePlaceholder}
          rows={4}
          required
          maxLength={5000}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      {state?.error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={!isFormValid || pending}
        className={`w-full text-sm font-semibold tracking-[0.08em] uppercase rounded-sm transition-colors duration-200 mt-2 ${
          isFormValid 
            ? "bg-white text-black hover:bg-gray-100 cursor-pointer py-3 px-6" 
            : "bg-white/10 text-white/30 cursor-not-allowed py-3 px-6"
        }`}
      >
        {pending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t.contact.sending}
          </span>
        ) : (
          t.contact.send
        )}
      </button>
    </form>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const { email, location, mapEmbed } = siteConfig.contact;
  const [formKey, setFormKey] = useState(0);

  return (
    <section id="contact" className="py-24 md:py-36 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <FadeIn className="md:col-span-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              {t.contact.headline}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-md">
              {t.contact.body}
            </p>

            <dl className="border-t border-white/[0.08] mb-10">
              <div className="py-4 border-b border-white/[0.08] grid grid-cols-[7rem_1fr] gap-4 items-baseline">
                <dt className="text-xs font-mono tracking-[0.14em] uppercase text-blue-400">{t.contact.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${email}`} className="text-white text-base hover:text-blue-300 transition-colors">
                    {email}
                  </a>
                </dd>
              </div>
              <div className="py-4 border-b border-white/[0.08] grid grid-cols-[7rem_1fr] gap-4 items-baseline">
                <dt className="text-xs font-mono tracking-[0.14em] uppercase text-blue-400">{t.contact.locationLabel}</dt>
                <dd className="text-white text-base">{location}</dd>
              </div>
            </dl>

            <div className="rounded-md overflow-hidden border border-white/[0.08]">
              <div className="relative w-full aspect-video">
                <iframe
                  src={mapEmbed}
                  title="VM-paviljongen location on Google Maps"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn className="md:col-span-6" delay={0.1}>
            <div className="bg-white/[0.03] rounded-md border border-white/[0.08] p-6 md:p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                {t.contact.formTitle}
              </h3>
              <ContactForm key={formKey} onReset={() => setFormKey((k) => k + 1)} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
