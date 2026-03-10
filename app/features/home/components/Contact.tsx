"use client";

import { useActionState, useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "../../../shared/components/animations/ScrollReveal";
import { DramaticButton, DramaticCard } from "../../../shared/components/ui/HoverEffects";
import { useLanguage } from "../../../shared/providers/LanguageProvider";
import { siteConfig } from "../../../lib/data/content";
import { sendContactEmail } from "../../../actions/contact";
import { motion } from "framer-motion";

function ContactForm() {
  const { t } = useLanguage();
  const [state, action, pending] = useActionState(sendContactEmail, null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  
  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

  if (state?.success) {
    return (
      <motion.div 
        className="pt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <p className="text-white text-lg font-medium">Message sent!</p>
        </div>
        <p className="text-gray-500 text-sm">We&apos;ll be in touch soon.</p>
      </motion.div>
    );
  }

  return (
    <form action={action} className="space-y-8">
      <Stagger staggerDelay={0.1} baseDelay={0}>
        <StaggerItem>
          <div className="group">
            <label htmlFor="contact-name" className="block text-[10px] text-blue-400 font-mono tracking-[0.2em] uppercase mb-2">
              {t.contact.namePlaceholder}
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder={t.contact.namePlaceholder}
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] transition-all duration-300 text-sm pointer-events-auto"
            />
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="group">
            <label htmlFor="contact-email" className="block text-[10px] text-blue-400 font-mono tracking-[0.2em] uppercase mb-2">
              {t.contact.emailPlaceholder}
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder={t.contact.emailPlaceholder}
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] transition-all duration-300 text-sm pointer-events-auto"
            />
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="group">
            <label htmlFor="contact-message" className="block text-[10px] text-blue-400 font-mono tracking-[0.2em] uppercase mb-2">
              {t.contact.messagePlaceholder}
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder={t.contact.messagePlaceholder}
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] transition-all duration-300 resize-none text-sm pointer-events-auto"
            />
          </div>
        </StaggerItem>

        {state?.error && (
          <motion.p 
            className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {state.error}
          </motion.p>
        )}

        {isFormValid && (
          <StaggerItem>
            <DramaticButton
              variant="primary"
              size="lg"
              className="w-full rounded-lg"
            >
              {pending ? "Sending..." : t.contact.send}
            </DramaticButton>
          </StaggerItem>
        )}
      </Stagger>
    </form>
  );
}

export default function Contact() {
  const { t, lang } = useLanguage();
  const { email, location, mapEmbed } = siteConfig.contact;

  return (
    <section id="contact" className="py-28 md:py-40 border-t border-white/[0.07] relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left column - Info */}
          <FadeIn direction="up" delay={0}>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {t.contact.headline}
              </h2>

              <FadeIn direction="up" delay={0.1}>
                <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md">
                  {t.contact.body}
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <div className="space-y-4 mb-10">
                  <DramaticCard
                    className="p-4 bg-white/[0.02] rounded-lg border border-white/5 flex items-center gap-4"
                    glowColor="rgba(59, 130, 246, 0.1)"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-400 font-mono tracking-wider uppercase">Email</p>
                      <p className="text-white text-sm">{email}</p>
                    </div>
                  </DramaticCard>

                  <DramaticCard
                    className="p-4 bg-white/[0.02] rounded-lg border border-white/5 flex items-center gap-4"
                    glowColor="rgba(59, 130, 246, 0.1)"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-400 font-mono tracking-wider uppercase">Location</p>
                      <p className="text-white text-sm">{location}</p>
                    </div>
                  </DramaticCard>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.3}>
                <DramaticCard
                  className="rounded-xl overflow-hidden border border-white/5"
                  glowColor="rgba(59, 130, 246, 0.15)"
                >
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
                      className="absolute inset-0"
                    />
                  </div>
                </DramaticCard>
              </FadeIn>
            </div>
          </FadeIn>

          {/* Right column - Form */}
          <FadeIn direction="up" delay={0.2}>
            <div className="p-8 bg-white/[0.02] rounded-2xl border border-white/5 relative z-10">
              <h3 className="text-xl font-bold text-white mb-6">
                {lang === "no" ? "Send oss en melding" : "Send us a message"}
              </h3>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
