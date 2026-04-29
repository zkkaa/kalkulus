"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Chart as ChartJS, ChartDataset } from "chart.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { SplitChars } from "@/components/ui/SplitChars";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────
type Mode = "barisan" | "deret";
type Jenis = "aritmetika" | "geometri";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function computeBarisan(jenis: Jenis, a: number, b: number, r: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) =>
    jenis === "aritmetika"
      ? parseFloat((a + i * b).toFixed(4))
      : parseFloat((a * Math.pow(r, i)).toFixed(4))
  );
}

function computeDeret(jenis: Jenis, a: number, b: number, r: number, n: number): number[] {
  const terms = computeBarisan(jenis, a, b, r, n);
  let sum = 0;
  return terms.map((t) => parseFloat((sum += t).toFixed(4)));
}

function computeValues(mode: Mode, jenis: Jenis, a: number, b: number, r: number, n: number) {
  if (mode === "barisan") return computeBarisan(jenis, a, b, r, n);
  return computeDeret(jenis, a, b, r, n);
}

function getFormula(mode: Mode, jenis: Jenis): string {
  if (mode === "barisan") {
    return jenis === "aritmetika" ? "Uₙ = a + (n−1)·b" : "Uₙ = a·rⁿ⁻¹";
  }
  return jenis === "aritmetika"
    ? "Sₙ = n/2 · (2a + (n−1)b)"
    : "Sₙ = a(rⁿ−1) / (r−1)";
}

function getSummary(mode: Mode, jenis: Jenis, a: number, b: number, r: number, n: number): string {
  const vals = computeValues(mode, jenis, a, b, r, n);
  const last = vals[vals.length - 1];
  if (mode === "barisan") return `Suku ke-${n}: ${last.toLocaleString("id-ID")}`;
  return `Jumlah ${n} suku: ${last.toLocaleString("id-ID")}`;
}

function seqPreview(vals: number[]): string {
  return vals
    .slice(0, 6)
    .map((v) => (Number.isInteger(v) ? v : v.toFixed(2)))
    .join(", ") + (vals.length > 6 ? " ..." : "");
}

// ─── Chart ────────────────────────────────────────────────────────────────────
function PlaygroundChart({
  mode,
  jenis,
  a,
  b,
  r,
  n,
}: {
  mode: Mode;
  jenis: Jenis;
  a: number;
  b: number;
  r: number;
  n: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);

  const barColor =
    jenis === "aritmetika" ? "rgba(16,185,129,0.6)" : "rgba(245,158,11,0.6)";
  const barBorder =
    jenis === "aritmetika" ? "rgba(16,185,129,0.9)" : "rgba(245,158,11,0.9)";
  const lineColor =
    jenis === "aritmetika" ? "#10B981" : "#F59E0B";

  useEffect(() => {
    if (typeof window === "undefined") return;
    import("chart.js/auto").then(({ default: Chart }) => {
      if (chartRef.current) chartRef.current.destroy();
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      chartRef.current = new Chart(ctx, {
        data: {
          labels: [],
          datasets: [
            {
              type: "bar",
              label: mode === "barisan" ? "Nilai Suku" : "Jumlah Parsial",
              data: [],
              backgroundColor: barColor,
              borderColor: barBorder,
              borderWidth: 1,
              borderRadius: 6,
              order: 2,
            },
            {
              type: "line",
              label: "Tren",
              data: [],
              borderColor: lineColor,
              backgroundColor: "transparent",
              pointRadius: 4,
              pointBackgroundColor: lineColor,
              pointBorderColor: "#fff",
              pointBorderWidth: 1.5,
              borderWidth: 2,
              tension: 0.4,
              fill: false,
              order: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 600, easing: "easeOutQuart" },
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(255,255,255,0.97)",
              titleColor: "#6B7280",
              bodyColor: "#111827",
              borderColor: "#E5E7EB",
              borderWidth: 1,
              padding: 10,
            },
          },
          scales: {
            x: {
              grid: { color: "rgba(0,0,0,0.04)" },
              ticks: {
                color: "rgba(0,0,0,0.35)",
                font: { family: "'JetBrains Mono', monospace", size: 9 },
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 12,
              },
              border: { color: "#E5E7EB" },
            },
            y: {
              grid: { color: "rgba(0,0,0,0.04)" },
              ticks: {
                color: "rgba(0,0,0,0.35)",
                font: { family: "'JetBrains Mono', monospace", size: 9 },
                maxTicksLimit: 6,
              },
              border: { color: "#E5E7EB" },
            },
          },
        },
      });

      updateChart();
    });

    return () => chartRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateChart = useCallback(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const vals = computeValues(mode, jenis, a, b, r, n);
    chart.data.labels = Array.from({ length: n }, (_, i) => `n=${i + 1}`);
    chart.data.datasets[0].data = vals;
    chart.data.datasets[1].data = vals;
    // update colors dynamically
    (chart.data.datasets[0] as ChartDataset<'bar'>).backgroundColor = barColor;
    (chart.data.datasets[0] as ChartDataset<'bar'>).borderColor = barBorder;
    (chart.data.datasets[1] as ChartDataset<'line'>).borderColor = lineColor;
    (chart.data.datasets[1] as ChartDataset<'line'>).pointBackgroundColor = lineColor;
    chart.update();
  }, [mode, jenis, a, b, r, n, barColor, barBorder, lineColor]);

  useEffect(() => {
    updateChart();
  }, [updateChart]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      role="img"
      aria-label="Visualisasi barisan atau deret"
    />
  );
}

// ─── Toggle Button ────────────────────────────────────────────────────────────
function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  colorActive = "#4F46E5",
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  colorActive?: string;
}) {
  return (
    <div className="flex rounded-xl overflow-hidden border border-gray-200">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="flex-1 py-2.5 text-xs font-semibold transition-all duration-200"
          style={
            value === opt.value
              ? { background: colorActive, color: "#fff" }
              : { background: "transparent", color: "#6B7280" }
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Slider ───────────────────────────────────────────────────────────────────
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  color = "#4F46E5",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display?: string;
  color?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{label}</span>
        <span className="text-[10px] font-mono font-bold" style={{ color }}>
          {display ?? value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full cursor-pointer h-1 rounded-full appearance-none"
        style={{ accentColor: color }}
      />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PlaygroundVisualisasi() {
  const sectionRef = useRef<HTMLElement>(null);

  const [mode, setMode] = useState<Mode>("barisan");
  const [jenis, setJenis] = useState<Jenis>("aritmetika");
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [r, setR] = useState(2);
  const [n, setN] = useState(10);

  const accentColor = jenis === "aritmetika" ? "#10B981" : "#F59E0B";
  const vals = computeValues(mode, jenis, a, b, r, n);
  const summary = getSummary(mode, jenis, a, b, r, n);
  const formula = getFormula(mode, jenis);
  const preview = seqPreview(vals);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pg-heading", {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.from(".pg-panel", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".pg-grid", start: "top 82%", toggleActions: "play none none reverse" },
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
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-80 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="pg-heading mb-14">
          <h2 className="leading-[1.05] tracking-tight text-gray-900 select-none mb-2" style={{ fontFamily: '"Georgia", serif' }}>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-semibold ">
              <SplitChars
                text="Playground"
                animateOn="immediate"
                delay={0.20}
                duration={0.7}
                stagger={0.022}
              />
              <span className="text-indigo-500 italic ml-4">
                <SplitChars
                  text="Visualisasi"
                  animateOn="immediate"
                  delay={0.30}
                  duration={0.7}
                  stagger={0.022}
                />
              </span>
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl leading-relaxed">
            Ubah parameter sesukamu dan lihat bagaimana barisan atau deret berubah secara real-time.
          </p>
        </div>

        {/* Main grid */}
        <div className="pg-grid grid lg:grid-cols-[400px_1fr] gap-8 items-start">

          {/* LEFT: Controls */}
          <div className="pg-panel flex flex-col gap-5">

            {/* Mode toggle */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">Pilih Mode</p>
              <ToggleGroup<Mode>
                options={[
                  { value: "barisan", label: "Barisan" },
                  { value: "deret", label: "Deret" },
                ]}
                value={mode}
                onChange={setMode}
              />
            </div>

            {/* Jenis toggle */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-3">Pilih Jenis</p>
              <ToggleGroup<Jenis>
                options={[
                  { value: "aritmetika", label: "Aritmetika" },
                  { value: "geometri", label: "Geometri" },
                ]}
                value={jenis}
                onChange={setJenis}
                colorActive={accentColor}
              />
            </div>

            {/* Sliders */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col gap-5">
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Parameter</p>

              <Slider
                label="Suku Pertama (a)"
                value={a}
                min={1}
                max={20}
                step={1}
                onChange={setA}
                color={accentColor}
              />

              {jenis === "aritmetika" ? (
                <Slider
                  label="Beda (b)"
                  value={b}
                  min={1}
                  max={20}
                  step={1}
                  onChange={setB}
                  color={accentColor}
                />
              ) : (
                <Slider
                  label="Rasio (r)"
                  value={r}
                  min={2}
                  max={5}
                  step={1}
                  onChange={setR}
                  color={accentColor}
                />
              )}

              <Slider
                label="Jumlah Suku (n)"
                value={n}
                min={3}
                max={15}
                step={1}
                onChange={setN}
                color={accentColor}
              />
            </div>

            {/* Formula & Summary */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
              <div>
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Rumus</p>
                <p className="font-mono text-sm font-bold text-indigo-600">{formula}</p>
              </div>
              <div className="h-px bg-gray-200" />
              <div>
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Preview Nilai</p>
                <p className="font-mono text-sm text-gray-600">{preview}</p>
              </div>
              <div className="h-px bg-gray-200" />
              <div>
                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Hasil</p>
                <motion.p
                  key={summary}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg font-black font-mono"
                  style={{ color: accentColor }}
                >
                  {summary}
                </motion.p>
              </div>
            </div>
          </div>

          {/* RIGHT: Chart */}
          <div className="pg-panel flex flex-col gap-4">
            {/* Chart header */}
            <div
              className="rounded-2xl p-4 flex items-center justify-between"
              style={{ background: accentColor + "15", border: `1px solid ${accentColor}30` }}
            >
              <div>
                <p className="text-xs font-semibold capitalize" style={{ color: accentColor }}>
                  {mode === "barisan" ? "Barisan" : "Deret"} {jenis}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 font-mono">
                  {jenis === "aritmetika" ? `a=${a}, b=${b}` : `a=${a}, r=${r}`}, n={n}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ background: accentColor + "99" }} />
                  <span className="text-[10px] text-gray-400">{mode === "barisan" ? "suku" : "jumlah parsial"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-0.5 rounded" style={{ background: accentColor }} />
                  <span className="text-[10px] text-gray-400">tren</span>
                </div>
              </div>
            </div>

            {/* Chart area */}
            <div
              className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
              style={{ height: 380 }}
            >
              <div className="w-full h-full p-4 relative">
                <PlaygroundChart
                  mode={mode}
                  jenis={jenis}
                  a={a}
                  b={b}
                  r={r}
                  n={n}
                />
              </div>
            </div>

            {/* N pills quick select */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mr-1">N cepat:</span>
              {[5, 8, 10, 12, 15].map((val) => (
                <button
                  key={val}
                  onClick={() => setN(val)}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border transition-all duration-150"
                  style={
                    n === val
                      ? { background: accentColor + "15", borderColor: accentColor + "60", color: accentColor }
                      : { background: "transparent", borderColor: "#E5E7EB", color: "#9CA3AF" }
                  }
                >
                  {val}
                </button>
              ))}
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { label: "Suku pertama", val: `a = ${a}` },
                {
                  label: jenis === "aritmetika" ? "Beda" : "Rasio",
                  val: jenis === "aritmetika" ? `b = ${b}` : `r = ${r}`,
                },
                { label: "Suku terakhir", val: `${vals[vals.length - 1]?.toLocaleString("id-ID") ?? "-"}` },
              ].map((info) => (
                <div key={info.label} className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">{info.label}</p>
                  <p className="font-mono text-sm font-bold text-gray-800">{info.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}