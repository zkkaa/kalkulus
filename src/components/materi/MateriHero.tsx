"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ─── Helper: pecah teks jadi span per karakter (sama seperti HeroSection) ─────
function SplitText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden">
          {word.split("").map((char, ci) => (
            <span key={ci} className="char inline-block" aria-hidden="true">
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="inline-block" aria-hidden="true">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}

export default function MateriHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const decorLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Badge slide down
      tl.from(badgeRef.current, { y: -30, opacity: 0, duration: 0.6 });

      // Line 1 chars stagger
      if (line1Ref.current) {
        const chars1 = line1Ref.current.querySelectorAll(".char");
        tl.from(chars1, { y: "110%", opacity: 0, duration: 0.55, stagger: 0.028 }, "-=0.15");
      }

      // Line 2 chars stagger
      if (line2Ref.current) {
        const chars2 = line2Ref.current.querySelectorAll(".char");
        tl.from(chars2, { y: "110%", opacity: 0, duration: 0.55, stagger: 0.025 }, "-=0.4");
      }

      // Decorative line expand
      tl.from(decorLineRef.current, { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "expo.out" }, "-=0.3");

      // Desc and meta
      tl.from(descRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.6");
      tl.from(metaRef.current, { y: 16, opacity: 0, duration: 0.6 }, "-=0.4");
      tl.from(scrollHintRef.current, { opacity: 0, duration: 0.8 }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 min-h-[80vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-28 pb-16 bg-white overflow-hidden"
    >
      {/* ── Background decoration (sama seperti TeamIntro) ──────────────── */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-5xl">
        {/* ── Badge (mirip HeroSection) ──────────────────────────────────── */}
        <div ref={badgeRef} className="flex items-center gap-2 mb-8">
          <div className="flex items-center justify-center">
            <Image src="/logo.png" alt="Sigma" width={24} height={24} unoptimized />
          </div>
          <span className="text-base tracking-wide font-medium text-gray-700" style={{ fontFamily: '"Georgia", serif' }}>
            𝖘𝖎𝖌𝖒𝖆
          </span>
          <span className="mx-2 text-gray-300">·</span>
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
            Kalkulus Lanjut
          </span>
        </div>

        {/* ── Judul (gaya persis HeroSection) ───────────────────────────── */}
        <h1
          className="leading-[1.05] tracking-tight text-gray-900 select-none mb-6"
          style={{ fontFamily: '"Georgia", serif' }}
        >
          <span className="block text-4xl md:text-6xl lg:text-7xl font-black">
            <span ref={line1Ref}>
              <SplitText text="Eksplorasi Modul" />
            </span>
          </span>
          <span className="block text-4xl md:text-6xl lg:text-7xl font-black mt-1">
            <span ref={line2Ref} className="text-indigo-500">
              <SplitText text="Pembelajaran." />
            </span>
          </span>
        </h1>

        {/* ── Garis dekoratif ───────────────────────────────────────────── */}
        <div
          ref={decorLineRef}
          className="h-px bg-linier-to-r from-indigo-300 via-indigo-100 to-transparent mb-8"
          style={{ transformOrigin: "left" }}
        />

        {/* ── Deskripsi ─────────────────────────────────────────────────── */}
        <p
          ref={descRef}
          className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed mb-8"
        >
          Dari limit hingga barisan & deret — kuasai konsep kalkulus satu per satu
          dengan pendekatan visual kinetik yang interaktif.
        </p>

        {/* ── Scroll hint ───────────────────────────────────────────────── */}
        <div ref={scrollHintRef} className="mt-14 flex items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-gray-300"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.22 }}
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs tracking-widest uppercase font-medium">
            Scroll untuk menjelajah
          </span>
        </div>
      </div>
    </section>
  );
}