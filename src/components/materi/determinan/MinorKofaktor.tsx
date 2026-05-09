"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// 3×3 matrix A from PDF example
const MATRIX_A = [[3,1,4],[2,5,6],[1,4,8]];
const MATRIX_LABELS = [["a₁₁","a₁₂","a₁₃"],["a₂₁","a₂₂","a₂₃"],["a₃₁","a₃₂","a₃₃"]];

function getMinor(matrix: number[][], row: number, col: number): number[][] {
  return matrix.filter((_, r) => r !== row).map((r) => r.filter((_, c) => c !== col));
}

function det2x2(m: number[][]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

function getCofactorSign(r: number, c: number): number {
  return Math.pow(-1, r + c);
}

// Sign pattern grid
const SIGN_GRID = [["+","−","+"],[" −","+","−"],["+"," −","+"]];

export default function MinorKofaktor() {
  const sectionRef  = useRef<HTMLElement>(null);
  const photoRef    = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<[number, number] | null>(null);

  const minor    = selected ? getMinor(MATRIX_A, selected[0], selected[1]) : null;
  const minorVal = minor ? det2x2(minor) : null;
  const cofSign  = selected ? getCofactorSign(selected[0], selected[1]) : null;
  const cofVal   = minorVal !== null && cofSign !== null ? cofSign * minorVal : null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ST = { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" };
      gsap.from(contentRef.current, { x: -60, opacity: 0, duration: 1,   ease: "power3.out", scrollTrigger: ST });
      gsap.from(photoRef.current,   { x:  80, opacity: 0, duration: 1,   ease: "power3.out", scrollTrigger: ST });
      gsap.from(".mk-cards .mk-card", { y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: ".mk-cards", start: "top 82%", toggleActions: "play none none reverse" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="minor-kofaktor" ref={sectionRef} className="relative bg-white px-28 py-28 overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top: content left, photo right */}
        <div className="flex items-center gap-16 mb-16">
          <div ref={contentRef} className="flex-1 min-w-0">
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Konsep Lanjut · 03</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 mb-6" style={{ fontFamily: '"Georgia", serif' }}>
              Minor &amp; <span className="text-violet-500 italic">Kofaktor</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl mb-6">
              Untuk matriks 3×3, kita perlu mengenal <strong className="text-gray-700">Minor (Mᵢⱼ)</strong> dan{" "}
              <strong className="text-gray-700">Kofaktor (Cᵢⱼ)</strong> sebagai bahan dasar ekspansi kofaktor.
            </p>

            {/* Definition cards */}
            <div className="mk-cards grid md:grid-cols-2 gap-4 mb-8">
              <div className="mk-card bg-sky-50 border border-sky-100 rounded-2xl p-5">
                <p className="text-xs font-semibold text-sky-600 uppercase tracking-widest mb-2">Minor — Mᵢⱼ</p>
                <p className="font-mono text-sm text-sky-800 font-bold mb-2">hapus baris i & kolom j</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Determinan submatriks 2×2 yang tersisa setelah baris ke-i dan kolom ke-j dihilangkan.
                </p>
              </div>
              <div className="mk-card bg-purple-50 border border-purple-100 rounded-2xl p-5">
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-2">Kofaktor — Cᵢⱼ</p>
                <p className="font-mono text-sm text-purple-800 font-bold mb-2">Cᵢⱼ = (−1)^(i+j) · Mᵢⱼ</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Jika i+j genap → positif. Jika i+j ganjil → negatif.
                </p>
              </div>
            </div>

            {/* Sign pattern */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-medium">Pola Tanda Kofaktor</p>
              <div className="grid grid-cols-3 gap-2 w-fit">
                {SIGN_GRID.flat().map((s, i) => (
                  <div key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-base font-black
                    ${s.trim()==='+' ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-rose-50 text-rose-500 border border-rose-200"}`}>
                    {s.trim()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Photo right */}
          <div ref={photoRef} className="shrink-0 hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-5 bg-transparent rounded-3xl -z-10" />
              <div className="relative w-96 h-115 rounded-2xl overflow-hidden">
                <Image src="/aulia.png" alt="Aulia Syakhira Raina Hakim" fill className="object-cover object-top" unoptimized />
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs font-semibold text-gray-700">Aulia Syakhira Raina Hakim</p>
                <p className="text-[10px] text-gray-400 italic">257006111021</p>
              </div>
              <div className="absolute -bottom-5 -left-8 bg-white border border-violet-100 shadow-sm rounded-xl px-3 py-2">
                <span className="font-mono text-xs text-violet-600">Cᵢⱼ = (−1)^(i+j)Mᵢⱼ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive matrix */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <p className="text-sm font-semibold text-gray-600 mb-2">Klik elemen matriks untuk lihat Minor & Kofaktornya</p>
          <p className="text-xs text-gray-400 mb-6">Matriks A dari contoh soal (slide 21)</p>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Matrix grid — clickable */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Matriks A (3×3) — klik selnya</p>
              <div className="grid grid-cols-3 gap-2 w-fit mb-4">
                {MATRIX_A.map((row, r) =>
                  row.map((val, c) => {
                    const isSel    = selected?.[0]===r && selected?.[1]===c;
                    const isDimRow = selected?.[0]===r;
                    const isDimCol = selected?.[1]===c;
                    return (
                      <motion.button
                        key={`${r}-${c}`}
                        onClick={() => setSelected(isSel ? null : [r,c])}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          backgroundColor: isSel ? "#7c3aed" : (isDimRow||isDimCol) && selected ? "#f3f4f6" : "#f9fafb",
                          color: isSel ? "#fff" : (isDimRow||isDimCol) && selected ? "#9ca3af" : "#1f2937",
                        }}
                        className="w-14 h-14 rounded-xl border-2 font-mono text-lg font-bold transition-colors"
                        style={{ borderColor: isSel ? "#7c3aed" : (isDimRow||isDimCol) && selected ? "#e5e7eb" : "#e5e7eb" }}
                      >
                        {val}
                      </motion.button>
                    );
                  })
                )}
              </div>
              {selected && (
                <p className="text-xs text-violet-500 font-mono">
                  Dipilih: {MATRIX_LABELS[selected[0]][selected[1]]} (baris {selected[0]+1}, kolom {selected[1]+1})
                </p>
              )}
            </div>

            {/* Result */}
            <div>
              <AnimatePresence mode="wait">
                {!selected ? (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center text-gray-300 text-sm py-10">
                    ← Klik elemen untuk melihat perhitungan
                  </motion.div>
                ) : (
                  <motion.div key={`${selected[0]}-${selected[1]}`}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex flex-col gap-4">

                    {/* Submatrix */}
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Submatriks (setelah hapus baris {selected[0]+1} & kolom {selected[1]+1})</p>
                      <div className="inline-flex px-4 py-3 relative">
                        <div className="absolute -left-1 top-0 bottom-0 w-2 border-l-2 border-t-2 border-b-2 border-gray-400 rounded-l" />
                        <div className="grid grid-cols-2 gap-2">
                          {minor!.map((row, r) => row.map((val, c) => (
                            <div key={`${r}-${c}`} className="w-12 h-12 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center font-mono text-base font-bold text-violet-700">{val}</div>
                          )))}
                        </div>
                        <div className="absolute -right-1 top-0 bottom-0 w-2 border-r-2 border-t-2 border-b-2 border-gray-400 rounded-r" />
                      </div>
                    </div>

                    {/* Minor */}
                    <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4">
                      <p className="text-xs text-sky-600 font-semibold uppercase tracking-widest mb-2">
                        Minor M{selected[0]+1}{selected[1]+1}
                      </p>
                      <p className="font-mono text-sm text-gray-700 mb-1">
                        = {minor![0][0]}×{minor![1][1]} − {minor![0][1]}×{minor![1][0]}
                      </p>
                      <p className="font-mono text-xl font-black text-sky-700">= {minorVal}</p>
                    </div>

                    {/* Kofaktor */}
                    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
                      <p className="text-xs text-purple-600 font-semibold uppercase tracking-widest mb-2">
                        Kofaktor C{selected[0]+1}{selected[1]+1}
                      </p>
                      <p className="font-mono text-sm text-gray-700 mb-1">
                        = (−1)^({selected[0]+1}+{selected[1]+1}) × {minorVal}
                      </p>
                      <p className="font-mono text-sm text-gray-700 mb-1">
                        = (−1)^{selected[0]+selected[1]+2} × {minorVal}
                      </p>
                      <p className="font-mono text-xl font-black text-purple-700">= {cofVal}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}