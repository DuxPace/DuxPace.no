import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import Navbar from "./components/Navbar";
import NewsCarousel from "./components/NewsCarousel";
import GlobeWrapper from "./components/GlobeWrapper";
import { members } from "./data/members";
import { siteContent as c } from "./data/content";

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute top-1/2 right-[10vw] -translate-y-1/2 w-[min(95vh,95vw)] h-[min(95vh,95vw)] pointer-events-none select-none">
        <GlobeWrapper />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black from-30% via-black/80 via-55% to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 w-full px-16 pt-32 pb-24">
        <p className="text-gray-500 text-sm mb-8 tracking-wide">{c.hero.eyebrow}</p>
        <h1 className="text-6xl md:text-7xl font-bold text-white leading-[1.05] mb-8 max-w-2xl">
          {c.hero.headline[0]}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            {c.hero.headline[1]}
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-10">
          {c.hero.subheading}
        </p>
        <div className="flex gap-4 items-center">
          <a href={c.hero.cta.href} className="bg-white text-black text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            {c.hero.cta.label}
          </a>
          <a href={c.hero.ctaSecondary.href} className="text-gray-400 hover:text-white text-sm transition-colors">
            {c.hero.ctaSecondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-5xl font-bold text-white leading-tight mb-8">
              {c.about.headline[0]}
              <br />
              {c.about.headline[1]}
            </h2>
            {c.about.body.map((p, i) => (
              <p key={i} className={`leading-relaxed ${i === 0 ? "text-gray-400 text-lg mb-6" : "text-gray-500"}`}>
                {p}
              </p>
            ))}
          </div>
          <div className="space-y-10 pt-2">
            {c.about.facts.map((fact) => (
              <div key={fact.label} className="border-l-2 border-white/10 pl-6">
                <p className="text-white font-medium mb-2">{fact.label}</p>
                <p className="text-gray-500 leading-relaxed text-sm">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-white mb-16">{c.team.headline}</h2>
        <div className="flex gap-8 flex-wrap">
          {members.map((member) => (
            <div key={member.name} className="group w-[220px]">
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105 grayscale-[20%]"
                />
              </div>
              <p className="text-white font-medium text-sm">{member.name}</p>
              <p className="text-gray-500 text-xs mt-0.5 mb-3">{member.role}</p>
              <div className="flex gap-3">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
                  <Linkedin size={14} />
                </a>
                <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-white transition-colors">
                  <Mail size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section id="news" className="py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <h2 className="text-5xl font-bold text-white">{c.news.headline}</h2>
          <p className="text-gray-500 text-sm">{c.news.subheading}</p>
        </div>
        <NewsCarousel />
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <h2 className="text-5xl font-bold text-white mb-6">{c.contact.headline}</h2>
            <p className="text-gray-400 leading-relaxed mb-8">{c.contact.body}</p>
            <div className="space-y-2 text-sm mb-8">
              <p className="text-gray-500">{c.contact.email}</p>
              <p className="text-gray-500">{c.contact.location}</p>
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10">
              <iframe
                src={c.contact.mapEmbed}
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
          <form action={`mailto:${c.contact.email}`} method="POST" encType="text/plain" className="space-y-4">
            <input type="text" name="name" placeholder="Name"
              className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors text-sm" />
            <input type="email" name="email" placeholder="Email"
              className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors text-sm" />
            <textarea name="message" placeholder="Message" rows={4}
              className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors resize-none text-sm" />
            <button type="submit"
              className="mt-4 text-sm font-medium text-black bg-white px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Send →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src={c.footer.logo} alt="DuxPace" width={20} height={20} className="rounded opacity-70" />
          <span className="text-gray-600 text-sm">{c.footer.copyright}</span>
        </div>
        <p className="text-gray-700 text-sm">{c.footer.location}</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
