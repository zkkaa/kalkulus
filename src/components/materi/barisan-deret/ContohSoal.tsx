"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const SOAL = [
  {
    id: 1,
    jenis: "Barisan Aritmetika",
    soal: "Tentukan suku ke-15 dari barisan: −15, −11, −7, −3, ...",
    color: "emerald",
    steps: [
      { label: "Identifikasi", content: "a = −15, b = −11 − (−15) = 4" },
      { label: "Rumus", content: "Uₙ = a + (n−1)·b" },
      { label: "Substitusi", content: "U₁₅ = −15 + (15−1)·4" },
      { label: "Hitung", content: "U₁₅ = −15 + 56 = 41" },
    ],
    answer: "U₁₅ = 41",
  },
  {
    id: 2,
    jenis: "Deret Geometri",
    soal: "Hitunglah nilai deret: 3 + 6 + 12 + ... + 96",
    color: "amber",
    steps: [
      { label: "Identifikasi", content: "a = 3, r = 6/3 = 2, Uₙ = 96" },
      { label: "Cari n", content: "3·2^(n-1) = 96 → 2^(n-1) = 32 → n = 6" },
      { label: "Rumus", content: "Sₙ = a(rⁿ − 1) / (r − 1)" },
      { label: "Hitung", content: "S₆ = 3(2⁶ − 1) / (2 − 1) = 3·63 = 189" },
    ],
    answer: "S₆ = 189",
  },
];

const COLOR = {
  emerald: {
    badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
    stepBg: "bg-emerald-50 border-emerald-100",
    stepNum: "bg-emerald-500",
    answer: "bg-emerald-50 border-emerald-200 text-emerald-700",
    btn: "bg-emerald-500 hover:bg-emerald-600",
    progress: "bg-emerald-400",
  },
  amber: {
    badge: "bg-amber-50 text-amber-600 border-amber-100",
    stepBg: "bg-amber-50 border-amber-100",
    stepNum: "bg-amber-500",
    answer: "bg-amber-50 border-amber-200 text-amber-700",
    btn: "bg-amber-500 hover:bg-amber-600",
    progress: "bg-amber-400",
  },
};

function SoalCard({ soal }: { soal: (typeof SOAL)[0] }) {
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [done, setDone] = useState(false);
  const c = COLOR[soal.color as keyof typeof COLOR];

  const reveal = () => {
    if (revealedSteps < soal.steps.length) {
      setRevealedSteps((prev) => prev + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setRevealedSteps(0);
    setDone(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${c.badge}`}>
          {soal.jenis}
        </span>
        <span className="text-xs text-gray-400 font-mono">Soal {soal.id}/2</span>
      </div>

      {/* Soal */}
      <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Pertanyaan</p>
        <p className="text-gray-800 font-medium leading-relaxed">{soal.soal}</p>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${c.progress}`}
          animate={{ width: `${(revealedSteps / soal.steps.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3 mb-6">
        <AnimatePresence>
          {soal.steps.slice(0, revealedSteps).map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className={`flex items-start gap-3 rounded-xl p-4 border ${c.stepBg}`}
            >
              <div className={`w-6 h-6 rounded-full ${c.stepNum} text-white text-xs flex items-center justify-center shrink-0 font-bold`}>
                {i + 1}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">{step.label}</p>
                <p className="font-mono text-sm text-gray-800">{step.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Answer (shown when all steps revealed) */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl px-6 py-4 border font-mono text-lg font-black text-center mb-6 ${c.answer}`}
          >
            ✓ {soal.answer}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex gap-3">
        {!done ? (
          <button
            onClick={reveal}
            className={`flex-1 py-3 rounded-xl text-white text-sm font-semibold transition-colors duration-200 ${c.btn}`}
          >
            {revealedSteps === 0
              ? "Mulai Pembahasan →"
              : revealedSteps < soal.steps.length
              ? `Langkah ${revealedSteps + 1} →`
              : "Lihat Jawaban ✓"}
          </button>
        ) : (
          <button
            onClick={reset}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            Ulangi
          </button>
        )}
      </div>
    </div>
  );
}

export default function ContohSoal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contoh-heading", {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.from(".soal-card-wrap", {
        y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".soal-cards-grid", start: "top 82%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contoh-soal"
      ref={sectionRef}
      className="relative bg-white px-28 py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="contoh-heading mb-14">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
            Latihan · 04
          </span>
          <h2
            className="mt-3 text-4xl md:text-5xl font-black text-gray-900"
            style={{ fontFamily: '"Georgia", serif' }}
          >
            Contoh{" "}
            <span className="text-indigo-500 italic">Soal</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl leading-relaxed">
            Klik &quot;Mulai Pembahasan&quot; dan ikuti tiap langkah penyelesaiannya satu per satu.
          </p>
        </div>

        <div className="soal-cards-grid grid md:grid-cols-2 gap-8">
          {SOAL.map((s) => (
            <div key={s.id} className="soal-card-wrap">
              <SoalCard soal={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}