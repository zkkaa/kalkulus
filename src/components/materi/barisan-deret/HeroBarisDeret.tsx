"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { SplitChars } from "@/components/ui/SplitChars";

gsap.registerPlugin(ScrollTrigger);

const FULL_DESC = `Belajar barisan dan deret di kalkulus lanjut sangat krusial karena materi ini menjembatani matematika teoretis dengan aplikasi praktis, terutama dalam menangani fungsi-fungsi kompleks, aproksimasi nilai, dan pemodelan dinamis. Selain itu, barisan dan deret juga sering digunakan di dunia nyata — mulai dari perhitungan bunga majemuk di perbankan, kompresi sinyal digital dalam telekomunikasi, pemodelan populasi dalam biologi, hingga algoritma machine learning yang membutuhkan konvergensi deret tak hingga.`;

const SHORT_DESC = `Belajar barisan dan deret di kalkulus lanjut sangat krusial karena materi ini menjembatani matematika teoretis dengan aplikasi praktis, terutama dalam menangani fungsi-fungsi kompleks, aproksimasi nilai, dan pemodelan dinamis.`;

export default function HeroBarisDeret() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // SplitChars animates its own chars — we handle the rest here
      tl.from(".hero-divider",   { scaleX: 0, transformOrigin: "left", duration: 0.8, delay: 0.6 });
      tl.from(".hero-desc",      { y: 20, opacity: 0, duration: 0.6 }, "-=0.3");
      tl.from(".hero-scroll-hint", { opacity: 0, duration: 0.6 }, "-=0.2");
      tl.from(".hero-photo",     { x: 60, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.8");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative min-h-screen bg-white flex flex-col justify-center px-28 pt-28 pb-20 overflow-hidden"
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Soft indigo glow top right */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-indigo-50 rounded-full blur-3xl opacity-70 pointer-events-none" />

      <div className="relative z-10 flex items-center gap-16 max-w-7xl">
        {/* ── LEFT: text content ── */}
        <div className="flex-1 min-w-0">

          {/* Title — each line uses SplitChars with immediate mode */}
          <h1
            className="leading-[1.05] tracking-tight text-gray-900 select-none mb-6"
            style={{ fontFamily: '"Georgia", serif' }}
          >
            <span className="block text-5xl md:text-6xl lg:text-7xl font-black text-gray-900">
              <SplitChars
                text="Kenapa kita harus"
                animateOn="immediate"
                delay={0}
                duration={0.7}
                stagger={0.022}
              />
            </span>

            <span className="block text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mt-1">
              <SplitChars
                text="belajar"
                animateOn="immediate"
                delay={0.20}
                duration={0.7}
                stagger={0.022}
              />
              <span className="text-indigo-500 italic ml-4">
                <SplitChars
                  text="Barisan"
                  animateOn="immediate"
                  delay={0.30}
                  duration={0.7}
                  stagger={0.022}
                />
              </span>
            </span>

            <span className="block text-5xl md:text-6xl lg:text-7xl font-black text-indigo-500 italic mt-1">
              <SplitChars
                text="& Deret?"
                animateOn="immediate"
                delay={0.40}
                duration={0.7}
                stagger={0.022}
              />
            </span>
          </h1>

          {/* Decorative divider */}
          <div className="hero-divider h-px bg-linear-to-r from-indigo-300 via-indigo-100 to-transparent mb-8 w-full" />

          {/* Description with expand/collapse */}
          <div className="hero-desc max-w-2xl mb-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={expanded ? "full" : "short"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-500 text-base md:text-lg leading-relaxed"
              >
                {expanded ? FULL_DESC : SHORT_DESC}
              </motion.p>
            </AnimatePresence>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-sm font-semibold text-indigo-500 hover:text-indigo-700 transition-colors duration-200 flex items-center gap-1 cursor-pointer"
            >
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ↓
              </motion.span>
              {expanded ? "Sembunyikan" : "Selengkapnya"}
            </button>
          </div>

          {/* Scroll hint */}
          <div className="hero-scroll-hint mt-14 flex items-center gap-3">
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
              Scroll untuk mulai belajar
            </span>
          </div>
        </div>

        {/* ── RIGHT: photo ── */}
        <div className="hero-photo shrink-0 relative hidden lg:block">
          {/* Decorative shapes behind photo */}
          <div className="absolute -inset-4 bg-indigo-50 rounded-3xl -z-10" />
          <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-indigo-100 rounded-2xl -z-10" />

          <div className="relative w-64 h-80 rounded-2xl overflow-hidden">
            <Image
              src="/gift/plenger2.webp"
              alt="Muhammad Azka – pose bertanya"
              fill
              className="object-cover object-top"
              unoptimized
            />
          </div>

          {/* Name label */}
          <div className="mt-3 text-center">
            <p className="text-xs font-semibold text-gray-700">
              Muhammad Azka Fakhri Fairuz
            </p>
            <p className="text-[10px] text-gray-400 italic">
              Lead Project · 257006111019
            </p>
          </div>

          {/* Floating formula badges */}
          <div className="absolute -top-4 -left-6 bg-white border border-indigo-100 rounded-xl px-3 py-2 shadow-sm">
            <span className="font-mono text-xs text-indigo-600">aₙ = a·rⁿ⁻¹</span>
          </div>
          <div className="absolute -bottom-4 -right-6 bg-white border border-indigo-100 rounded-xl px-3 py-2 shadow-sm">
            <span className="font-mono text-xs text-indigo-600">S∞ = a/(1−r)</span>
          </div>
        </div>
      </div>
    </section>
  );
}