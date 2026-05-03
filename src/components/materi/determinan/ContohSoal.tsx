"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const SOAL = [
  {
    id: 1,
    jenis: "Determinan 2×2",
    soal: "Hitung determinan matriks A = [3 7 / 5 2]",
    color: "violet",
    steps: [
      { label: "Identifikasi elemen", content: "a₁=3, b₁=7, a₂=5, b₂=2" },
      { label: "Rumus", content: "det(A) = a₁b₂ − a₂b₁" },
      { label: "Substitusi", content: "= (3 × 2) − (7 × 5)" },
      { label: "Hitung", content: "= 6 − 35 = −29" },
    ],
    answer: "det(A) = −29",
    note: "det ≠ 0 → Matriks invertible",
  },
  {
    id: 2,
    jenis: "Determinan 3×3 (Sarrus)",
    soal: "Hitung determinan B = [−2  4  −5 / 1  3  0 / −1  4  −8]",
    color: "amber",
    steps: [
      { label: "Tulis matriks", content: "B = [−2  4  −5]\n    [ 1  3   0]\n    [−1  4  −8]" },
      { label: "Perpanjang 2 kolom pertama", content: "[−2  4  −5 | −2  4]\n[ 1  3   0 |  1  3]\n[−1  4  −8 | −1  4]" },
      { label: "Diagonal positif (+)", content: "(−2)(3)(−8) + (4)(0)(−1) + (−5)(1)(4)\n= 48 + 0 + (−20) = 28" },
      { label: "Diagonal negatif (−)", content: "(−5)(3)(−1) + (−2)(0)(4) + (4)(1)(−8)\n= 15 + 0 + (−32) = −17" },
      { label: "det = positif − negatif", content: "det(B) = 28 − (−17) = 28 + 17 = 45" },
    ],
    answer: "det(B) = 45",
    note: "Sesuai contoh soal di materi Sarrus",
  },
];

const COLOR: Record<string, { badge: string; stepBg: string; stepNum: string; answer: string; btn: string; progress: string }> = {
  violet: {
    badge:    "bg-violet-50 text-violet-600 border-violet-100",
    stepBg:   "bg-violet-50 border-violet-100",
    stepNum:  "bg-violet-500",
    answer:   "bg-violet-50 border-violet-200 text-violet-700",
    btn:      "bg-violet-500 hover:bg-violet-600",
    progress: "bg-violet-400",
  },
  amber: {
    badge:    "bg-amber-50 text-amber-600 border-amber-100",
    stepBg:   "bg-amber-50 border-amber-100",
    stepNum:  "bg-amber-500",
    answer:   "bg-amber-50 border-amber-200 text-amber-700",
    btn:      "bg-amber-500 hover:bg-amber-600",
    progress: "bg-amber-400",
  },
};

function SoalCard({ soal }: { soal: (typeof SOAL)[0] }) {
  const [revealed, setRevealed] = useState(0);
  const [done, setDone]         = useState(false);
  const c = COLOR[soal.color];

  const next  = () => { if (revealed < soal.steps.length) setRevealed(p => p + 1); else setDone(true); };
  const reset = () => { setRevealed(0); setDone(false); };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${c.badge}`}>{soal.jenis}</span>
        <span className="text-xs text-gray-400 font-mono">Soal {soal.id}/2</span>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Pertanyaan</p>
        <pre className="font-mono text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{soal.soal}</pre>
      </div>

      <div className="h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <motion.div className={`h-full rounded-full ${c.progress}`}
          animate={{ width: `${(revealed / soal.steps.length) * 100}%` }} transition={{ duration: 0.4 }} />
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <AnimatePresence>
          {soal.steps.slice(0, revealed).map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`flex items-start gap-3 rounded-xl p-4 border ${c.stepBg}`}>
              <div className={`w-6 h-6 rounded-full ${c.stepNum} text-white text-xs flex items-center justify-center shrink-0 font-bold`}>{i+1}</div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">{step.label}</p>
                <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{step.content}</pre>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {done && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl px-6 py-4 border font-mono font-black text-center mb-4 ${c.answer}`}>
            ✓ {soal.answer}
            {soal.note && <p className="text-xs font-normal mt-1 opacity-70">{soal.note}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        {!done ? (
          <button onClick={next}
            className={`flex-1 py-3 rounded-xl text-white text-sm font-semibold transition-colors duration-200 ${c.btn}`}>
            {revealed === 0 ? "Mulai Pembahasan →" : revealed < soal.steps.length ? `Langkah ${revealed+1} →` : "Lihat Jawaban ✓"}
          </button>
        ) : (
          <button onClick={reset}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 text-sm font-semibold hover:bg-gray-200 transition-colors duration-200">
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
      gsap.from(".cs-heading", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.from(".cs-card", { y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".cs-grid", start: "top 82%", toggleActions: "play none none reverse" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contoh-soal" ref={sectionRef} className="relative bg-white px-28 py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="cs-heading mb-14">
          <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Latihan · 05</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900" style={{ fontFamily: '"Georgia", serif' }}>
            Contoh <span className="text-violet-500 italic">Soal</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl leading-relaxed">
            Dua soal berbeda — satu determinan 2×2, satu lagi 3×3 metode Sarrus. Klik untuk reveal langkah per langkah.
          </p>
        </div>
        <div className="cs-grid grid md:grid-cols-2 gap-8">
          {SOAL.map((s) => <div key={s.id} className="cs-card"><SoalCard soal={s} /></div>)}
        </div>
      </div>
    </section>
  );
}