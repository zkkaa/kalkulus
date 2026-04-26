"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "2x", label: "Lebih cepat paham" },
  { value: "5+", label: "Topik kalkulus" },
  { value: "1v1", label: "Mode duel" },
  { value: "∞", label: "Sesi bermain" },
];

export default function GameWhy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current!.children, {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Stats
      gsap.from(statsRef.current!.querySelectorAll(".stat-item"), {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-white px-10 md:px-24 lg:px-36 py-20 md:py-24 z-10 relative">
      {/* ── Header ──────────────────────────────────────────── */}
      <div ref={headerRef} className="mb-14">
        <p className="text-[10px] tracking-[0.16em] uppercase text-indigo-500 font-medium mb-3">
          Kenapa game?
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold leading-[1.1] text-gray-900 mb-4 max-w-xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Kenapa belajar sambil{" "}
          <em className="italic text-indigo-500">bermain</em>
          <br />
          bisa membuatmu lebih mudah paham?
        </h2>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-lg">
          Otak menyerap informasi jauh lebih efektif ketika ada elemen
          kompetisi dan kesenangan. Game ini dirancang agar kamu tanpa sadar
          mengulang konsep kalkulus berkali-kali.
        </p>
      </div>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 sm:grid-cols-4 border border-gray-100 rounded-2xl overflow-hidden"
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            className={`stat-item flex flex-col items-center justify-center py-7 px-4
              ${i < STATS.length - 1 ? "border-r border-gray-100" : ""}`}
          >
            <span
              className="text-3xl font-bold text-gray-900 mb-1"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {s.value}
            </span>
            <span className="text-[11px] text-gray-400 tracking-wide text-center">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

