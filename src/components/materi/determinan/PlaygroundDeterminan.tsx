"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// ─── Math helpers ─────────────────────────────────────────────────────────────
function det2(m: number[][]): number {
  if (!m || m.length < 2 || !m[0] || !m[1]) return 0;
  return (m[0][0] ?? 0) * (m[1][1] ?? 0) - (m[0][1] ?? 0) * (m[1][0] ?? 0);
}

function isValid3x3(m: number[][]): boolean {
  return (
    Array.isArray(m) &&
    m.length === 3 &&
    m.every((row) => Array.isArray(row) && row.length === 3)
  );
}

function det3Sarrus(m: number[][]): number {
  if (!isValid3x3(m)) return 0;
  const a = m[0][0], b = m[0][1], c = m[0][2];
  const d = m[1][0], e = m[1][1], f = m[1][2];
  const g = m[2][0], h = m[2][1], i = m[2][2];
  return (a * e * i + b * f * g + c * d * h) - (c * e * g + a * f * h + b * d * i);
}

function det3Cofactor(m: number[][]): number {
  if (!isValid3x3(m)) return 0;
  const minor = (row: number, col: number) =>
    m.filter((_, r) => r !== row).map((r) => r.filter((_, c) => c !== col));
  return (
    m[0][0] * det2(minor(0, 0)) -
    m[0][1] * det2(minor(0, 1)) +
    m[0][2] * det2(minor(0, 2))
  );
}

// ─── Step generators ──────────────────────────────────────────────────────────
function getDet2Steps(m: number[][]): string[] {
  if (!m || m.length < 2) return [];
  const a = m[0][0] ?? 0, b = m[0][1] ?? 0;
  const c = m[1][0] ?? 0, d = m[1][1] ?? 0;
  return [
    "Rumus: det(A) = a1b2 - a2b1",
    `= (${a})(${d}) - (${b})(${c})`,
    `= ${a * d} - ${b * c}`,
    `= ${a * d - b * c}`,
  ];
}

function getSarrusSteps(m: number[][]): string[] {
  if (!isValid3x3(m)) return ["Matriks belum lengkap"];
  const a = m[0][0], b = m[0][1], c = m[0][2];
  const d = m[1][0], e = m[1][1], f = m[1][2];
  const g = m[2][0], h = m[2][1], i = m[2][2];
  const pos1 = a * e * i, pos2 = b * f * g, pos3 = c * d * h;
  const neg1 = c * e * g, neg2 = a * f * h, neg3 = b * d * i;
  const posSum = pos1 + pos2 + pos3;
  const negSum = neg1 + neg2 + neg3;
  return [
    "Perpanjang matriks dengan 2 kolom pertama",
    `Diagonal (+): (${a})(${e})(${i}) + (${b})(${f})(${g}) + (${c})(${d})(${h})`,
    `= ${pos1} + ${pos2} + ${pos3} = ${posSum}`,
    `Diagonal (-): (${c})(${e})(${g}) + (${a})(${f})(${h}) + (${b})(${d})(${i})`,
    `= ${neg1} + ${neg2} + ${neg3} = ${negSum}`,
    `det = ${posSum} - (${negSum}) = ${posSum - negSum}`,
  ];
}

function getCofactorSteps(m: number[][]): string[] {
  if (!isValid3x3(m)) return ["Matriks belum lengkap"];
  const minor = (row: number, col: number) =>
    m.filter((_, r) => r !== row).map((r) => r.filter((_, c) => c !== col));
  const M11 = det2(minor(0, 0));
  const M12 = det2(minor(0, 1));
  const M13 = det2(minor(0, 2));
  const C11 = M11, C12 = -M12, C13 = M13;
  const result = m[0][0] * C11 + m[0][1] * C12 + m[0][2] * C13;
  return [
    "Ekspansi baris pertama: a11*C11 + a12*C12 + a13*C13",
    `M11 = det([${m[1][1]} ${m[1][2]} / ${m[2][1]} ${m[2][2]}]) = ${M11}`,
    `M12 = det([${m[1][0]} ${m[1][2]} / ${m[2][0]} ${m[2][2]}]) = ${M12}`,
    `M13 = det([${m[1][0]} ${m[1][1]} / ${m[2][0]} ${m[2][1]}]) = ${M13}`,
    `C11=(+1)x${M11}=${C11},  C12=(-1)x${M12}=${C12},  C13=(+1)x${M13}=${C13}`,
    `det = ${m[0][0]}x${C11} + ${m[0][1]}x${C12} + ${m[0][2]}x${C13} = ${result}`,
  ];
}

// ─── Presets ──────────────────────────────────────────────────────────────────
const PRESETS_2: { label: string; m: number[][] }[] = [
  { label: "Contoh PDF 1: [3 7 / 5 2]", m: [[3,7],[5,2]] },
  { label: "Contoh PDF 2: [6 5 / 1 2]", m: [[6,5],[1,2]] },
  { label: "Identitas 2x2",              m: [[1,0],[0,1]] },
];

const PRESETS_3: { label: string; m: number[][] }[] = [
  { label: "Sarrus PDF: [-2 4 -5 / 1 3 0 / -1 4 -8]", m: [[-2,4,-5],[1,3,0],[-1,4,-8]] },
  { label: "Identitas 3x3",                             m: [[1,0,0],[0,1,0],[0,0,1]] },
  { label: "Singular det=0",                            m: [[1,2,3],[4,5,6],[7,8,9]] },
];

// ─── Matrix Input ─────────────────────────────────────────────────────────────
function MatrixInput({
  matrix,
  size,
  onChange,
}: {
  matrix: number[][];
  size: 2 | 3;
  onChange: (r: number, c: number, val: number) => void;
}) {
  const rows = Array.from({ length: size }, (_, r) => r);
  const cols = Array.from({ length: size }, (_, c) => c);

  return (
    <div className="relative inline-flex items-center px-5">
      <div className="absolute left-0 top-0 bottom-0 w-3 border-l-[3px] border-t-[3px] border-b-[3px] border-gray-400 rounded-l-sm" />
      <div
        className="grid gap-2 py-2"
        style={{ gridTemplateColumns: `repeat(${size}, 56px)` }}
      >
        {rows.map((r) =>
          cols.map((c) => (
            <input
              key={`${r}-${c}`}
              type="number"
              value={matrix[r]?.[c] ?? 0}
              onChange={(e) => onChange(r, c, parseFloat(e.target.value) || 0)}
              className="w-14 h-14 rounded-xl text-center font-mono text-base font-bold
                text-violet-800 bg-violet-50 border-2 border-violet-200
                focus:border-violet-500 focus:outline-none focus:bg-white
                transition-colors duration-200"
            />
          ))
        )}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-3 border-r-[3px] border-t-[3px] border-b-[3px] border-gray-400 rounded-r-sm" />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PlaygroundDeterminan() {
  const sectionRef = useRef<HTMLElement>(null);

  const [size,   setSize]   = useState<2 | 3>(2);
  const [method, setMethod] = useState<"sarrus" | "cofactor">("sarrus");
  const [matrix, setMatrix] = useState<number[][]>([[3,7],[5,2]]);

  // Change size AND matrix together — no useEffect race condition
  const handleSizeChange = (newSize: 2 | 3) => {
    setSize(newSize);
    setMethod("sarrus");
    if (newSize === 2) {
      setMatrix([[1,0],[0,1]]);
    } else {
      setMatrix([[1,0,0],[0,1,0],[0,0,1]]);
    }
  };

  const updateCell = (r: number, c: number, val: number) => {
    setMatrix((prev) => {
      const next = prev.map((row) => [...row]);
      if (next[r]) next[r][c] = val;
      return next;
    });
  };

  // Guard before computing — ensures matrix dimensions match size
  const matrixReady =
    size === 2
      ? matrix.length === 2 && matrix.every((r) => r.length === 2)
      : isValid3x3(matrix);

  let det = 0;
  let steps: string[] = [];

  if (matrixReady) {
    if (size === 2) {
      det   = det2(matrix);
      steps = getDet2Steps(matrix);
    } else if (method === "sarrus") {
      det   = det3Sarrus(matrix);
      steps = getSarrusSteps(matrix);
    } else {
      det   = det3Cofactor(matrix);
      steps = getCofactorSteps(matrix);
    }
  }

  const isInvertible = det !== 0;
  const presets      = size === 2 ? PRESETS_2 : PRESETS_3;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pgd-heading", {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse",
        },
      });
      gsap.from(".pgd-panel", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".pgd-grid", start: "top 82%", toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="playground"
      ref={sectionRef}
      className="relative bg-white px-28 py-28 overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-80 bg-violet-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div className="pgd-heading mb-14">
          <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
            Interaktif · 06
          </span>
          <h2
            className="mt-3 text-4xl md:text-5xl font-black text-gray-900"
            style={{ fontFamily: '"Georgia", serif' }}
          >
            Playground{" "}
            <span className="text-violet-500 italic">Determinan</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl leading-relaxed">
            Input angka langsung ke dalam sel matriks. Hasil determinan dan
            langkah perhitungannya muncul otomatis di sebelah kanan.
          </p>
        </div>

        <div className="pgd-grid grid lg:grid-cols-[380px_1fr] gap-8 items-start">

          {/* ── LEFT ──────────────────────────────────────────────────────── */}
          <div className="pgd-panel flex flex-col gap-5">

            {/* Size toggle */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">
                Ukuran Matriks
              </p>
              <div className="flex rounded-xl overflow-hidden border border-gray-200">
                {([2, 3] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSizeChange(s)}
                    className="flex-1 py-3 text-sm font-semibold transition-all duration-200"
                    style={
                      size === s
                        ? { background: "#7c3aed", color: "#fff" }
                        : { background: "transparent", color: "#6B7280" }
                    }
                  >
                    {s}x{s}
                  </button>
                ))}
              </div>
            </div>

            {/* Method toggle (3x3 only) */}
            {size === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-5"
              >
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">
                  Metode
                </p>
                <div className="flex rounded-xl overflow-hidden border border-gray-200">
                  {(["sarrus", "cofactor"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className="flex-1 py-3 text-xs font-semibold transition-all duration-200"
                      style={
                        method === m
                          ? { background: "#7c3aed", color: "#fff" }
                          : { background: "transparent", color: "#6B7280" }
                      }
                    >
                      {m === "sarrus" ? "Sarrus" : "Kofaktor"}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Matrix input */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-4">
                Input Matriks
              </p>
              <div className="flex justify-center py-2">
                {matrixReady && (
                  <MatrixInput matrix={matrix} size={size} onChange={updateCell} />
                )}
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-4 font-mono">
                klik sel lalu ketik angka
              </p>
            </div>

            {/* Presets */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">
                Preset Contoh
              </p>
              <div className="flex flex-col gap-2">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setMatrix(p.m)}
                    className="text-left text-xs px-3 py-2.5 rounded-xl border border-gray-200
                      text-gray-600 hover:border-violet-200 hover:bg-violet-50
                      hover:text-violet-700 transition-all duration-200 font-mono"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT ─────────────────────────────────────────────────────── */}
          <div className="pgd-panel flex flex-col gap-5">

            {/* Result */}
            <motion.div
              key={`${det}-${size}-${method}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className={`rounded-3xl p-8 border ${
                !matrixReady
                  ? "bg-gray-50 border-gray-200"
                  : isInvertible
                  ? "bg-violet-50 border-violet-200"
                  : "bg-rose-50 border-rose-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{
                      color: !matrixReady ? "#9ca3af" : isInvertible ? "#7c3aed" : "#e11d48",
                    }}
                  >
                    Hasil Determinan
                  </p>
                  <p
                    className="text-6xl font-black font-mono"
                    style={{
                      color: !matrixReady ? "#9ca3af" : isInvertible ? "#7c3aed" : "#e11d48",
                    }}
                  >
                    {matrixReady ? det : "--"}
                  </p>
                </div>
                {matrixReady && (
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      isInvertible
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {isInvertible ? "Invertible" : "Singular"}
                  </div>
                )}
              </div>
              {matrixReady && (
                <p
                  className="text-sm mt-4"
                  style={{ color: isInvertible ? "#6d28d9" : "#be123c" }}
                >
                  {isInvertible
                    ? `det(A) = ${det} tidak sama dengan 0. Matriks memiliki invers dan sistem persamaan memiliki solusi tunggal.`
                    : "det(A) = 0. Matriks singular, tidak memiliki invers, sistem mungkin tidak punya solusi unik."}
                </p>
              )}
            </motion.div>

            {/* Method label */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                Metode:
              </span>
              <span className="text-sm font-semibold text-violet-700">
                {size === 2
                  ? "Rumus Langsung (2x2)"
                  : method === "sarrus"
                  ? "Metode Sarrus (3x3)"
                  : "Ekspansi Kofaktor (3x3)"}
              </span>
            </div>

            {/* Steps */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">Langkah Perhitungan</p>
                <span className="text-xs font-mono text-gray-400">{steps.length} langkah</span>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <AnimatePresence mode="wait">
                  {steps.map((step, i) => (
                    <motion.div
                      key={`${size}-${method}-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      className="flex gap-3 items-start"
                    >
                      <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="font-mono text-sm text-gray-700 leading-relaxed">{step}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Ukuran",     val: `${size}x${size}` },
                { label: "det(A)",     val: matrixReady ? String(det) : "--" },
                { label: "Invertible", val: matrixReady ? (isInvertible ? "Ya" : "Tidak") : "--" },
              ].map((info) => (
                <div
                  key={info.label}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-center"
                >
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                    {info.label}
                  </p>
                  <p className="font-mono text-base font-bold text-gray-800">{info.val}</p>
                </div>
              ))}
            </div>

            {/* Cramer hint */}
            {size === 2 && matrixReady && isInvertible && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5"
              >
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                  Aplikasi Metode Cramer
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Untuk sistem{" "}
                  <span className="font-mono">a1x + b1y + d1 = 0</span>{" "}
                  dengan matriks koefisien ini, berlaku{" "}
                  <span className="font-mono text-indigo-700">
                    x/D1 = -y/D2 = 1/{det}
                  </span>.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}