"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "hero-section", label: "Intro" },
  { id: "apa-barisan", label: "Barisan" },
  { id: "jenis-barisan", label: "Jenis Barisan" },
  { id: "horizontal-explorer", label: "Eksplorasi" },
  { id: "apa-deret", label: "Deret" },
  { id: "contoh-soal", label: "Contoh Soal" },
  { id: "playground", label: "Playground" },
];

export default function ProgressIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(pct, 100));

      SECTIONS.forEach((sec, i) => {
        const el = document.getElementById(sec.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom > 0) {
          setActiveIndex(i);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1.5 lg:flex">
      {/* Progress line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-200" />
      <div
        ref={barRef}
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-indigo-400 transition-all duration-300 origin-top"
        style={{ height: `${progress}%` }}
      />

      {SECTIONS.map((sec, i) => (
        <button
          key={sec.id}
          onClick={() => scrollTo(sec.id)}
          className="relative z-10 group flex items-center gap-2 cursor-pointer"
          title={sec.label}
        >
          <span className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-gray-500 whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-gray-100 shadow-sm">
            {sec.label}
          </span>
          <div
            className={`transition-all duration-300 rounded-full border ${
              i === activeIndex
                ? "w-3 h-3 bg-indigo-500 border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                : i < activeIndex
                ? "w-2 h-2 bg-indigo-300 border-indigo-300"
                : "w-2 h-2 bg-white border-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}