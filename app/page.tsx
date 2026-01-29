import Image from "next/image";
import Navbar from "./Navbar";
import NewsCarousel from "./NewsCarousel";
import { members } from "./data/members";

function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
        <div className="flex flex-col gap-6">
          <p className="text-gray-400 text-2xl">Welcome to</p>
          <Image
            src="/logo-wide-3.jpeg"
            alt="DuxPace"
            width={1000}
            height={1000}
            className="w-full max-w-lg rounded-lg"
            priority
          />
          <p className="text-gray-400 text-lg max-w-md mt-4">
            AI-powered satellite image analysis for a better understanding of
            our world.
          </p>
        </div>
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
            alt="Satellite view of Earth"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12">About</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              DuxPace is a startup that leverages artificial intelligence to
              analyze satellite imagery. Our technology provides actionable
              insights from space-based observations, helping organizations make
              data-driven decisions about our planet.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              We are based at{" "}
              <strong className="text-white">
                Grunderbrakka, NTNU Trondheim
              </strong>
              , Norway &mdash; at the heart of one of Scandinavia&apos;s leading
              technology and research environments.
            </p>
          </div>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80"
              alt="Satellite orbiting Earth"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              Our Mission
            </h3>
            <p className="text-gray-400">
              To make satellite image analysis accessible and actionable through
              AI, enabling better decisions for environmental monitoring, urban
              planning, and resource management.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              Our Technology
            </h3>
            <p className="text-gray-400">
              Advanced machine learning models trained on satellite data to
              detect patterns, changes, and anomalies invisible to the human
              eye.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-16 mb-8">Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member.name}
              className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-white/10">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-purple-400 text-sm mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section id="news" className="py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12">News</h2>
        <NewsCarousel />
      </div>
    </section>
  );
}


function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1782.5!2d10.4017!3d63.4195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x466d31904f5b0e5b%3A0x0!2sNTNU%20Trondheim!5e0!3m2!1sen!2sno!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Location
              </h3>
              <p className="text-gray-400">
                Grunderbrakka
                <br />
                NTNU, Trondheim
                <br />
                Norway
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-400">planet@duxpace.no</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6">
              Get in Touch
            </h3>
            <form
              action="mailto:planet@duxpace.no"
              method="POST"
              encType="text/plain"
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-square.jpeg"
            alt="DuxPace"
            width={24}
            height={24}
            className="rounded"
          />
          <span className="text-gray-400 text-sm">
            &copy; 2026 DuxPace. All rights reserved.
          </span>
        </div>
        <p className="text-gray-500 text-sm">
          Grunderbrakka, NTNU Trondheim, Norway
        </p>
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
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
