"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

function SplitChars({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden">
          {word.split("").map((ch, ci) => (
            <span key={ci} className="char inline-block">{ch}</span>
          ))}
          {wi < text.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

const SHORT = `Determinan adalah nilai skalar yang diekstrak dari matriks persegi dan menjadi kunci dalam aljabar linear. Materi ini krusial karena menjadi fondasi untuk memecahkan sistem persamaan linear, menentukan apakah suatu matriks memiliki invers, dan menganalisis transformasi geometri.`;

const FULL  = `${SHORT} Di dunia nyata, determinan digunakan dalam kriptografi untuk enkripsi data, dalam grafis komputer untuk transformasi 3D, dalam ekonomi untuk analisis input-output Leontief, hingga dalam engineering untuk analisis stabilitas sistem dinamik. Bahkan algoritma machine learning seperti PCA (Principal Component Analysis) menggunakan konsep determinan untuk reduksi dimensi data.`;

const CHIPS = ["🔐 Kriptografi", "🎮 Grafis 3D", "📈 Ekonomi Leontief", "⚙️ Stabilitas sistem", "🤖 PCA / Machine Learning"];

export default function HeroDeterminan() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const chars = titleRef.current?.querySelectorAll(".char");
      if (chars) tl.from(Array.from(chars), { y: "110%", opacity: 0, duration: 0.65, stagger: 0.02 });
      tl.from(".hd-badge",  { y: -20, opacity: 0, duration: 0.5 }, "-=0.4");
      tl.from(".hd-line",   { scaleX: 0, transformOrigin: "left", duration: 1, ease: "expo.out" }, "-=0.3");
      tl.from(".hd-desc",   { y: 20,  opacity: 0, duration: 0.6 }, "-=0.5");
      tl.from(".hd-chips",  { y: 16,  opacity: 0, duration: 0.5 }, "-=0.3");
      tl.from(".hd-photo",  { x: 60,  opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");
      tl.from(".hd-hint",   { opacity: 0, duration: 0.6 }, "-=0.2");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-determinan"
      ref={sectionRef}
      className="relative min-h-screen bg-white flex flex-col justify-center px-28 pt-28 pb-20 overflow-hidden"
    >
      {/* grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(#7c3aed 1px,transparent 1px),linear-gradient(90deg,#7c3aed 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
      {/* glow */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-violet-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="relative z-10 flex items-center gap-16 max-w-7xl">
        {/* LEFT */}
        <div className="flex-1 min-w-0">
          <div className="hd-badge flex items-center gap-2 mb-8">
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Kalkulus Lanjut · Pertemuan 7</span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          </div>

          <div ref={titleRef}>
            <h1 className="leading-[1.05] tracking-tight text-gray-900 select-none mb-6" style={{ fontFamily: '"Georgia", serif' }}>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-black">
                <SplitChars text="Kenapa kita harus" />
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-black mt-1">
                <SplitChars text="belajar" />
                <span className="text-violet-500 italic ml-4"><SplitChars text="Determinan?" /></span>
              </span>
            </h1>
          </div>

          <div className="hd-line h-px bg-linear-to-r from-violet-300 via-violet-100 to-transparent mb-8 w-full" />

          <div className="hd-desc max-w-2xl mb-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={expanded ? "full" : "short"}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-500 text-base md:text-lg leading-relaxed"
              >
                {expanded ? FULL : SHORT}
              </motion.p>
            </AnimatePresence>
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-sm font-semibold text-violet-500 hover:text-violet-700 transition-colors duration-200 flex items-center gap-1"
            >
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>↓</motion.span>
              {expanded ? "Sembunyikan" : "Selengkapnya"}
            </button>
          </div>

          <div className="hd-chips flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <span key={c} className="text-sm px-4 py-1.5 rounded-full border border-violet-100 bg-violet-50 text-violet-600 font-medium">{c}</span>
            ))}
          </div>

          <div className="hd-hint mt-14 flex items-center gap-3">
            <div className="flex gap-1">
              {[0,1,2].map((i) => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300"
                  animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.22 }} />
              ))}
            </div>
            <span className="text-gray-400 text-xs tracking-widest uppercase font-medium">Scroll untuk mulai belajar</span>
          </div>
        </div>

        {/* RIGHT: photo */}
        <div className="hd-photo shrink-0 hidden lg:block">
          <div className="relative">
            <div className="absolute -inset-4 bg-violet-50 rounded-3xl -z-10" />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-violet-100 rounded-2xl -z-10" />
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden">
              <Image src="/gift/plenger2.webp" alt="Wildan Nurohim" fill className="object-cover object-top" unoptimized />
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs font-semibold text-gray-700">Wildan Nurohim</p>
              <p className="text-[10px] text-gray-400 italic">257006111026</p>
            </div>
            {/* floating badges */}
            <div className="absolute -top-4 -left-6 bg-white border border-violet-100 rounded-xl px-3 py-2 shadow-sm">
              <span className="font-mono text-xs text-violet-600">det(A) = ad − bc</span>
            </div>
            <div className="absolute -bottom-4 -right-6 bg-white border border-violet-100 rounded-xl px-3 py-2 shadow-sm">
              <span className="font-mono text-xs text-violet-600">|A| ≠ 0 → invertible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}