"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// From PDF: 5x + 2y + 19 = 0 / 3x + 4y + 17 = 0  → x=-3, y=-2
const STEPS = [
  {
    title: "Tulis Sistem Persamaan",
    content: "5x + 2y + 19 = 0\n3x + 4y + 17 = 0",
    note: "Identifikasi: a₁=5, b₁=2, d₁=19 · a₂=3, b₂=4, d₂=17",
    color: "violet",
  },
  {
    title: "Hitung Δ₀ (hilangkan konstanta)",
    content: "Δ₀ = |5  2|\n     |3  4|\n\n= 5·4 − 2·3 = 20 − 6 = 14",
    note: "Δ₀ adalah determinan dari koefisien x dan y saja",
    color: "indigo",
  },
  {
    title: "Hitung Δ₁ (hilangkan kolom x)",
    content: "Δ₁ = |2  19|\n     |4  17|\n\n= 2·17 − 19·4 = 34 − 76 = −42",
    note: "Ganti kolom x dengan konstanta d₁ dan d₂",
    color: "sky",
  },
  {
    title: "Hitung Δ₂ (hilangkan kolom y)",
    content: "Δ₂ = |5  19|\n     |3  17|\n\n= 5·17 − 19·3 = 85 − 57 = 28",
    note: "Ganti kolom y dengan konstanta d₁ dan d₂",
    color: "emerald",
  },
  {
    title: "Terapkan Rumus Cramer",
    content: "x/Δ₁ = −y/Δ₂ = 1/Δ₀\n\nx = Δ₁/Δ₀ = −42/14 = −3\ny = −Δ₂/Δ₀ = −28/14 = −2",
    note: "Solusi: x = −3, y = −2",
    color: "violet",
  },
];

const COLOR_STEP: Record<string, string> = {
  violet:  "bg-violet-50  border-violet-100  text-violet-700",
  indigo:  "bg-indigo-50  border-indigo-100  text-indigo-700",
  sky:     "bg-sky-50     border-sky-100     text-sky-700",
  emerald: "bg-emerald-50 border-emerald-100 text-emerald-700",
};

const BULLET_COLOR: Record<string, string> = {
  violet: "bg-violet-500", indigo: "bg-indigo-500", sky: "bg-sky-500", emerald: "bg-emerald-500",
};

export default function MetodeCramer() {
  const sectionRef  = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(0);
  const [done, setDone]         = useState(false);

  const next = () => {
    if (revealed < STEPS.length) setRevealed(revealed + 1);
    else setDone(true);
  };
  const reset = () => { setRevealed(0); setDone(false); };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cramer-heading", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.from(".cramer-formula", { y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".cramer-formula", start: "top 85%", toggleActions: "play none none reverse" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="cramer" ref={sectionRef} className="relative bg-white px-28 py-28 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="cramer-heading mb-14">
          <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Aplikasi · 04</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900" style={{ fontFamily: '"Georgia", serif' }}>
            Metode <span className="text-violet-500 italic">Cramer</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl leading-relaxed">
            Determinan digunakan untuk memecahkan sistem persamaan linear (SPL). Kuncinya adalah
            rumus <span className="font-mono text-violet-600">x/Δ₁ = −y/Δ₂ = 1/Δ₀</span>.
          </p>
        </div>

        {/* Formula summary */}
        <div className="cramer-formula grid md:grid-cols-3 gap-4 mb-14">
          {[
            { sym: "Δ₀", label: "Determinan koefisien", formula: "|a₁ b₁ / a₂ b₂|", color: "violet" },
            { sym: "Δ₁", label: "Hilangkan kolom x", formula: "|b₁ d₁ / b₂ d₂|", color: "sky" },
            { sym: "Δ₂", label: "Hilangkan kolom y", formula: "|a₁ d₁ / a₂ d₂|", color: "emerald" },
          ].map((d) => (
            <div key={d.sym} className={`rounded-2xl p-5 border ${COLOR_STEP[d.color]}`}>
              <p className="text-2xl font-mono font-black mb-1">{d.sym}</p>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-70">{d.label}</p>
              <p className="font-mono text-sm">{d.formula}</p>
            </div>
          ))}
        </div>

        {/* Step-by-step interactive */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-semibold text-gray-800">Contoh Soal: Pecahkan dengan Metode Cramer</p>
              <p className="text-sm text-gray-500 font-mono mt-1">5x + 2y + 19 = 0 · 3x + 4y + 17 = 0</p>
            </div>
            <span className="text-xs text-gray-400 font-mono">{revealed}/{STEPS.length} langkah</span>
          </div>

          {/* Progress */}
          <div className="h-1.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
            <motion.div className="h-full bg-violet-500 rounded-full"
              animate={{ width: `${(revealed / STEPS.length) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-3 mb-6">
            <AnimatePresence>
              {STEPS.slice(0, revealed).map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className={`flex gap-4 rounded-2xl p-5 border ${COLOR_STEP[step.color]}`}>
                  <div className={`w-7 h-7 rounded-full ${BULLET_COLOR[step.color]} text-white text-xs flex items-center justify-center shrink-0 font-bold mt-0.5`}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-2">{step.title}</p>
                    <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">{step.content}</pre>
                    <p className="text-xs mt-2 opacity-60">{step.note}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Answer */}
          <AnimatePresence>
            {done && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center mb-6">
                <p className="text-xs text-violet-500 uppercase tracking-widest mb-2">Solusi</p>
                <p className="font-mono text-2xl font-black text-violet-700">x = −3, y = −2</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            {!done ? (
              <button onClick={next}
                className="flex-1 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold transition-colors duration-200">
                {revealed === 0 ? "Mulai Pembahasan →"
                  : revealed < STEPS.length ? `Langkah ${revealed + 1} →`
                  : "Lihat Jawaban ✓"}
              </button>
            ) : (
              <button onClick={reset}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200 transition-colors duration-200">
                Ulangi dari awal
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}