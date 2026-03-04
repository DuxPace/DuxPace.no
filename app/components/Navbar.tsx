"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteContent } from "../data/content";

const { sections, logo } = siteContent.nav;

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
        <a href="#home" className="flex items-center">
          <Image
            src={logo}
            alt="DuxPace"
            width={160}
            height={48}
            className="h-10 w-auto"
          />
        </a>
        <div className="flex gap-8 ml-auto">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm capitalize transition-colors ${
                active === id
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-200"
              }`}
            >
              {id}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
