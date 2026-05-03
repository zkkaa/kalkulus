"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const EXAMPLES = [
  { label: "Contoh 1", matrix: [[3,7],[5,2]], answer: 3*2 - 7*5 },
  { label: "Contoh 2", matrix: [[6,5],[1,2]], answer: 6*2 - 5*1 },
  { label: "Contoh 3", matrix: [[2,1],[4,-3]], answer: 2*(-3) - 1*4 },
];

function MatrixViz({ matrix, highlight }: { matrix: number[][]; highlight: boolean }) {
  const [[a,b],[c,d]] = matrix;
  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="relative px-4">
        <div className="absolute -left-1 top-0 bottom-0 w-2 border-l-2 border-t-2 border-b-2 border-gray-400 rounded-l" />
        <div className="grid grid-cols-2 gap-3 py-2">
          {[
            { val: a, diag: true  },
            { val: b, diag: false },
            { val: c, diag: false },
            { val: d, diag: true  },
          ].map((cell, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: highlight
                  ? cell.diag ? "rgb(236,253,245)" : "rgb(255,241,242)"
                  : "rgb(249,250,251)",
                borderColor: highlight
                  ? cell.diag ? "rgb(167,243,208)" : "rgb(254,205,211)"
                  : "rgb(229,231,235)",
              }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 rounded-xl border-2 flex items-center justify-center font-mono text-xl font-bold text-gray-800"
            >
              {cell.val}
            </motion.div>
          ))}
        </div>
        <div className="absolute -right-1 top-0 bottom-0 w-2 border-r-2 border-t-2 border-b-2 border-gray-400 rounded-r" />

        {/* Diagonal lines */}
        {highlight && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 120 120">
            <motion.line x1="20" y1="20" x2="100" y2="100"
              stroke="#10B981" strokeWidth="2.5" opacity="0.7"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
            <motion.line x1="100" y1="20" x2="20" y2="100"
              stroke="#F43F5E" strokeWidth="2.5" opacity="0.7"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
          </svg>
        )}
      </div>
    </div>
  );
}

export default function DeterminanOrde2() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeEx, setActiveEx] = useState(0);
  const [showDiag, setShowDiag] = useState(false);

  const ex = EXAMPLES[activeEx];
  const [[a,b],[c,d]] = ex.matrix;

  useEffect(() => {
    const t = setTimeout(() => setShowDiag(true), 300);
    return () => clearTimeout(t);
  }, [activeEx]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".o2-heading", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.from(".o2-formula", { y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".o2-formula", start: "top 85%", toggleActions: "play none none reverse" } });
      gsap.from(".o2-card", { y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".o2-cards", start: "top 82%", toggleActions: "play none none reverse" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="orde-2" ref={sectionRef} className="relative bg-white px-28 py-28 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="o2-heading mb-16">
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900" style={{ fontFamily: '"Georgia", serif' }}>
            Determinan <span className="text-violet-500 italic">Orde 2 (2×2)</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-2xl leading-relaxed">
            Determinan matriks 2×2 dihitung dengan mengalikan diagonal utama lalu dikurangi perkalian diagonal silang.
          </p>
        </div>

        {/* Formula box */}
        <div className="o2-formula mb-16 bg-violet-50 border border-violet-100 rounded-3xl p-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs text-violet-500 font-semibold uppercase tracking-widest mb-4">Rumus</p>
              <p className="text-3xl font-mono font-black text-violet-700 mb-6">det(A) = a₁b₂ − a₂b₁</p>
              <div className="flex flex-col gap-3">
                {[
                  ["a₁, b₁", "Baris pertama matriks",  "text-emerald-600"],
                  ["a₂, b₂", "Baris kedua matriks",    "text-emerald-600"],
                  ["a₁b₂",   "Diagonal utama (+)",      "text-emerald-600"],
                  ["a₂b₁",   "Diagonal silang (−)",     "text-rose-500"],
                ].map(([sym, desc, col]) => (
                  <div key={sym} className="flex items-center gap-3">
                    <span className={`font-mono text-sm font-bold w-16 ${col}`}>{sym}</span>
                    <span className="text-sm text-gray-500">= {desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* General matrix visual */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative inline-flex flex-col px-6 py-4">
                <div className="absolute -left-1 top-0 bottom-0 w-2 border-l-2 border-t-2 border-b-2 border-violet-400 rounded-l" />
                <div className="grid grid-cols-2 gap-4">
                  {[["a₁","emerald"],["b₁","rose"],["a₂","rose"],["b₂","emerald"]].map(([v,c],i) => (
                    <div key={i} className={`w-16 h-16 rounded-xl flex items-center justify-center font-mono text-2xl font-black
                      ${c === "emerald" ? "text-emerald-600 bg-emerald-50 border-2 border-emerald-200" : "text-rose-500 bg-rose-50 border-2 border-rose-200"}`}>
                      {v}
                    </div>
                  ))}
                </div>
                <div className="absolute -right-1 top-0 bottom-0 w-2 border-r-2 border-t-2 border-b-2 border-violet-400 rounded-r" />
                {/* diagonals */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 140 120">
                  <line x1="25" y1="25" x2="115" y2="95" stroke="#10B981" strokeWidth="2" opacity="0.5" strokeDasharray="4 3"/>
                  <line x1="115" y1="25" x2="25" y2="95" stroke="#F43F5E" strokeWidth="2" opacity="0.5" strokeDasharray="4 3"/>
                </svg>
              </div>
              <p className="font-mono text-sm text-gray-500">
                <span className="text-emerald-600 font-bold">a₁b₂</span>
                {" "} − {" "}
                <span className="text-rose-500 font-bold">a₂b₁</span>
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="o2-cards">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Contoh Interaktif</p>
          <div className="flex gap-3 mb-8">
            {EXAMPLES.map((e, i) => (
              <button key={i} onClick={() => setActiveEx(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  i === activeEx ? "bg-violet-500 text-white border-violet-500" : "bg-white text-gray-600 border-gray-200 hover:border-violet-200"}`}>
                {e.label}
              </button>
            ))}
          </div>

          <div className="o2-card bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Matrix */}
              <div className="flex flex-col items-center gap-4">
                <MatrixViz matrix={ex.matrix} highlight={showDiag} />
                <div className="text-center mt-2">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Matriks A</p>
                </div>
              </div>

              {/* Calculation */}
              <div className="flex flex-col gap-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">Perhitungan</p>
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <p className="font-mono text-base text-gray-700 mb-2">det(A) = a₁b₂ − a₂b₁</p>
                  <p className="font-mono text-base text-gray-700 mb-2">
                    = <span className="text-emerald-600">({a} × {d})</span>{" "}
                    − <span className="text-rose-500">({b} × {c})</span>
                  </p>
                  <p className="font-mono text-base text-gray-700 mb-2">
                    = <span className="text-emerald-600">{a*d}</span>{" "}
                    − <span className="text-rose-500">{b*c >= 0 ? b*c : `(${b*c})`}</span>
                  </p>
                  <motion.p
                    key={ex.answer}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-mono text-2xl font-black text-violet-600 mt-3"
                  >
                    = {ex.answer}
                  </motion.p>
                </div>
                <div className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  ex.answer !== 0
                    ? "bg-emerald-50 border border-emerald-100 text-emerald-700"
                    : "bg-rose-50 border border-rose-100 text-rose-700"}`}>
                  {ex.answer !== 0
                    ? "✓ det ≠ 0 → Matriks invertible (punya invers)"
                    : "✗ det = 0 → Matriks singular (tidak punya invers)"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}