"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const sections = ["home", "about", "news", "contact"] as const;

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
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
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-1 flex items-center gap-8">
        <a href="#home" className="flex items-center gap-3">
          <Image
            src="/logo-wide.jpeg"
            alt="DuxPace"
            width={200}
            height={64}
            className="h-18 w-auto"
          />
        </a>
        <div className="flex gap-8 ml-auto">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`capitalize transition-colors ${
                active === id
                  ? "text-purple-400"
                  : "text-gray-300 hover:text-white"
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
