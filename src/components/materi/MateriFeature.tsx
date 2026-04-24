"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Chart as ChartJS } from "chart.js";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import TextHeading from "@/components/ui/TextHeading";

gsap.registerPlugin(ScrollTrigger);

// ─── Chart colors (disesuaikan ke palet indigo landing) ──────────────────────
const C = {
  bar:         "rgba(79,70,229,0.65)",     // indigo-600
  barBorder:   "rgba(79,70,229,0.9)",
  partial:     "#10B981",                  // emerald — kontras di bg terang
  partialFill: "rgba(16,185,129,0.06)",
  sinf:        "rgba(0,0,0,0.25)",
  grid:        "rgba(0,0,0,0.05)",
  tick:        "rgba(0,0,0,0.35)",
};

const MONO = "'JetBrains Mono', monospace";

// ─── Helper ──────────────────────────────────────────────────────────────────
function getTerms(mode: string, a: number, r: number, N: number): number[] {
  if (mode === "geometri")
    return Array.from({ length: N }, (_, i) => parseFloat((a * Math.pow(r, i)).toFixed(6)));
  return Array.from({ length: N }, (_, i) => parseFloat((a + i * r).toFixed(6)));
}

function getPartialSums(terms: number[]): number[] {
  let s = 0;
  return terms.map((t) => parseFloat((s += t).toFixed(6)));
}

function getSInf(mode: string, a: number, r: number): number | null {
  if (mode === "geometri" && r < 1) return parseFloat((a / (1 - r)).toFixed(4));
  return null;
}

function seqPreview(terms: number[]): string {
  return terms.slice(0, 5).map((t) => t.toFixed(2)).join(", ") + " …";
}

// ─── Chart Canvas ─────────────────────────────────────────────────────────────
function SeriesChart({ mode, a, r, N }: { mode: string; a: number; r: number; N: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef  = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    import("chart.js/auto").then(({ default: Chart }) => {
      if (chartRef.current) chartRef.current.destroy();
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      chartRef.current = new Chart(ctx, {
        data: {
          labels:   [],
          datasets: [
            {
              type: "bar",
              label: "Suku aₙ",
              data: [],
              backgroundColor: C.bar,
              borderColor: C.barBorder,
              borderWidth: 1,
              borderRadius: 4,
              order: 2,
              yAxisID: "y",
            },
            {
              type: "line",
              label: "Jumlah Parsial Sₙ",
              data: [],
              borderColor: C.partial,
              backgroundColor: C.partialFill,
              fill: false,
              tension: 0.35,
              pointRadius: 4,
              pointBackgroundColor: C.partial,
              pointBorderColor: "#fff",
              pointBorderWidth: 1.5,
              borderWidth: 2,
              order: 1,
              yAxisID: "y2",
            },
            {
              type: "line",
              label: "S∞",
              data: [],
              borderColor: C.sinf,
              borderDash: [6, 4],
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false,
              order: 0,
              yAxisID: "y2",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 500, easing: "easeOutQuart" },
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(255,255,255,0.95)",
              titleColor: "#6B7280",
              bodyColor: "#111827",
              borderColor: "#E5E7EB",
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: (c) => {
                  if (c.datasetIndex === 0) return ` aₙ = ${c.parsed.y?.toFixed(4) ?? '0'}`;
                  if (c.datasetIndex === 1) return ` Sₙ = ${c.parsed.y?.toFixed(4) ?? '0'}`;
                  if (c.datasetIndex === 2) return ` S∞ = ${c.parsed.y?.toFixed(4) ?? '0'}`;
                  return "";
                },
              },
            },
          },
          scales: {
            x: {
              grid: { color: C.grid },
              ticks: { color: C.tick, font: { family: MONO, size: 9 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 10 },
              border: { color: "#E5E7EB" },
            },
            y: {
              position: "left",
              grid: { color: C.grid },
              ticks: { color: "rgba(79,70,229,0.7)", font: { family: MONO, size: 9 }, maxTicksLimit: 6, callback: (v) => (v as number).toFixed(2) },
              border: { color: "#E5E7EB" },
              title: { display: true, text: "aₙ (suku)", color: "rgba(79,70,229,0.45)", font: { family: MONO, size: 9 } },
            },
            y2: {
              position: "right",
              grid: { drawOnChartArea: false },
              ticks: { color: "#10B981", font: { family: MONO, size: 9 }, maxTicksLimit: 6, callback: (v) => (v as number).toFixed(2) },
              border: { color: "#E5E7EB" },
              title: { display: true, text: "Sₙ (parsial)", color: "rgba(16,185,129,0.5)", font: { family: MONO, size: 9 } },
            },
          },
        },
      });

      updateChart(chartRef.current, mode, a, r, N);
    });

    return () => chartRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chartRef.current) updateChart(chartRef.current, mode, a, r, N);
  }, [mode, a, r, N]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      role="img"
      aria-label="Visualisasi barisan dan deret"
    />
  );
}

function updateChart(chart: ChartJS, mode: string, a: number, r: number, N: number) {
  const terms    = getTerms(mode, a, r, N);
  const partials = getPartialSums(terms);
  const sInf     = getSInf(mode, a, r);

  chart.data.labels             = Array.from({ length: N }, (_, i) => `n=${i + 1}`);
  chart.data.datasets[0].data   = terms;
  chart.data.datasets[1].data   = partials;
  chart.data.datasets[2].data   = sInf !== null ? Array(N).fill(sInf) : [];
  chart.update();
}

// ─── Mode Toggle ─────────────────────────────────────────────────────────────
function ModeToggle({ mode, onChange }: { mode: string; onChange: (m: string) => void }) {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      {["geometri", "aritmatika"].map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className="text-[9px] font-mono px-3 py-1.5 rounded-full border transition-all duration-200 capitalize tracking-wide"
          style={
            mode === m
              ? { background: "#4F46E5", borderColor: "#4F46E5", color: "#fff", fontWeight: 700 }
              : { background: "transparent", borderColor: "#4F46E5", color: "#4F46E5" }
          }
        >
          {m}
        </button>
      ))}
    </div>
  );
}

// ─── N Pill Selector ─────────────────────────────────────────────────────────
function NPills({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1.5 flex-wrap mt-1.5">
      {[6, 10, 15, 20].map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className="text-sm font-mono px-2.5 py-1 rounded-full border transition-all duration-150"
          style={
            value === n
              ? { background: "rgba(79,70,229,0.08)", borderColor: "rgba(79,70,229,0.3)", color: "#4F46E5" }
              : { background: "transparent", borderColor: "#E5E7EB", color: "#9CA3AF" }
          }
        >
          {n}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MateriFeature() {
  const sectionRef = useRef(null);

  const [mode, setMode] = useState("geometri");
  const [a, setA]       = useState(1);
  const [r, setR]       = useState(0.5);
  const [N, setN]       = useState(10);

  const handleModeChange = useCallback((m: string) => {
    setMode(m);
    setR(m === "geometri" ? 0.5 : 2);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      }
    );
  }, []);

  const sInf   = getSInf(mode, a, r);
  const terms  = getTerms(mode, a, r, N);

  const liveLabel =
    sInf !== null
      ? `S∞ = ${sInf.toFixed(2)}`
      : mode === "aritmatika"
      ? `S${N} = ${getPartialSums(terms).at(-1)?.toFixed(2)}`
      : "Divergen ∞";

  const hintText =
    sInf !== null
      ? "✓ Konvergen — semua suku menjumlah ke S∞"
      : mode === "aritmatika"
      ? `Sₙ = n/2 · (2·${a} + (n-1)·${r.toFixed(1)})`
      : "✕ Divergen — r ≥ 1";

  const hintColor =
    sInf !== null ? "#10B981"
    : mode === "aritmatika" ? "#4F46E5"
    : "#EF4444";

  return (
    <section ref={sectionRef} className="relative z-10 rounded-4xl mx-10 px-4 md:px-10 lg:px-20 py-16 bg-indigo-50">
      {/* ── Section label (sama dengan ContentSections) ───────────────── */}
      <div className="mb-10">
        <TextHeading
          subtitle="Modul Unggulan"
          title="Barisan & Deret"
          titleItalic
          subtitleSize="sm"
          animateOnScroll
        />
      </div>

      <div
        className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
        style={{ background: "#fff" }}
      >

        {/* ── Kiri: Chart (bg putih bersih) ─────────────────────────────── */}
        <div className="relative min-h-90 bg-gray-50 overflow-hidden border-r border-gray-100">
          <SeriesChart mode={mode} a={a} r={r} N={N} />

          {/* Edge fades — lebih subtle di bg terang */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-y-0 left-0 w-6 bg-linier-to-r from-gray-50 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-6 bg-linier-to-l from-gray-50 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-6 bg-linier-to-b from-gray-50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-linier-to-t from-gray-50 to-transparent" />
          </div>

          {/* Formula chips */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
            <span className="text-[9px] font-mono text-indigo-500 bg-indigo-50 border border-indigo-200 px-2 py-1 rounded-md">
              {mode === "geometri" ? "aₙ = a · rⁿ⁻¹" : "aₙ = a + (n−1)d"}
            </span>
            <span className="text-[9px] font-mono text-indigo-500 bg-indigo-50 border border-indigo-200 px-2 py-1 rounded-md">
              {mode === "geometri" ? "S∞ = a / (1 − r)" : "Sₙ = n/2 · (2a + (n−1)d)"}
            </span>
          </div>

          {/* Live sum */}
          <div className="absolute top-3 right-3 text-right pointer-events-none z-10">
            <p className="text-[9px] font-mono text-gray-400 tracking-widest">JUMLAH TAK HINGGA</p>
            <p className="text-sm font-mono font-bold text-indigo-600">{liveLabel}</p>
          </div>

          {/* Legend */}
          <div className="absolute top-16 right-3 flex flex-col gap-1 pointer-events-none z-10">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: C.bar }} />
              <span className="text-[8px] font-mono text-gray-400">suku aₙ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-0.5" style={{ background: C.partial }} />
              <span className="text-[8px] font-mono text-gray-400">jumlah parsial</span>
            </div>
          </div>

          <ModeToggle mode={mode} onChange={handleModeChange} />
        </div>

        {/* ── Kanan: Content ─────────────────────────────────────────────── */}
        <div className="p-8 md:p-10 flex flex-col justify-between gap-6 bg-white">
          <div>

            {/* Judul */}
            <h2
              className="text-4xl md:text-[42px] font-black text-gray-900 leading-none mb-3"
              style={{ fontFamily: '"Georgia", serif', letterSpacing: "-1px" }}
            >
              Barisan & Deret
            </h2>

            {/* Deskripsi */}
            <p className="text-gray-500 text-[13px] leading-relaxed max-w-120 mb-3">
              Amati bagaimana suku-suku barisan membentuk jumlah parsial yang perlahan
              mendekati limit konvergensi —&nbsp;<em className="text-indigo-500">S∞</em>.
              Ubah parameter untuk melihat perubahan secara langsung.
            </p>

            {/* Sequence preview */}
            <p className="font-mono text-xl text-indigo-400">{seqPreview(terms)}</p>
          </div>

          <div className="flex flex-col gap-4">

            {/* Controls */}
            <div className="rounded-xl p-3.5 flex flex-col gap-3 bg-gray-50 border border-gray-100">
              {/* Slider a */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[9px] font-mono text-gray-400 tracking-widest">SUKU PERTAMA (a)</span>
                  <span className="text-[9px] font-mono text-indigo-600 font-bold">{a.toFixed(1)}</span>
                </div>
                <input
                  type="range" min="1" max="10" step="0.5" value={a}
                  onChange={(e) => setA(parseFloat(e.target.value))}
                  className="w-full cursor-pointer"
                  style={{ accentColor: "#4F46E5" }}
                />
              </div>

              {/* Slider r / d */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[9px] font-mono text-gray-400 tracking-widest">
                    {mode === "geometri" ? "RASIO (r)" : "BEDA (d)"}
                  </span>
                  <span className="text-[9px] font-mono text-indigo-600 font-bold">
                    {mode === "geometri" ? r.toFixed(2) : r.toFixed(1)}
                  </span>
                </div>
                {mode === "geometri" ? (
                  <input
                    type="range" min="5" max="95" step="1"
                    value={Math.round(r * 100)}
                    onChange={(e) => setR(parseFloat(e.target.value) / 100)}
                    className="w-full cursor-pointer"
                    style={{ accentColor: "#4F46E5" }}
                  />
                ) : (
                  <input
                    type="range" min="1" max="20" step="1" value={r}
                    onChange={(e) => setR(parseFloat(e.target.value))}
                    className="w-full cursor-pointer"
                    style={{ accentColor: "#4F46E5" }}
                  />
                )}
                <p className="text-[9px] font-mono mt-1.5" style={{ color: hintColor }}>{hintText}</p>
              </div>

              {/* N pills */}
              <div className="mt-8">
                <span className="text-sm font-mono text-gray-400 tracking-widest">JUMLAH SUKU</span>
                <NPills value={N} onChange={setN} />
              </div>
            </div>

            {/* CTA — AnimatedButton variant sigma mirip landing */}
            <Link href="/materi/barisan-deret">
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between px-6 py-3.5 rounded-xl font-bold text-white text-sm tracking-wide"
                style={{ background: "#4F46E5", fontFamily: '"Georgia", serif' }}
              >
                <span>Mulai Belajar</span>
                <span className="text-base">→</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}