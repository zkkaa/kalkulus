"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Panel data ─────────────────────────────────────────────────────────── */
const PANELS = [
  {
    type: "intro",
    bg: "bg-violet-600",
    title: "3 Cara Menghitung Determinan",
    desc: "Scroll ke kanan untuk menjelajahi setiap metode. Setiap metode punya keunggulan tersendiri tergantung ukuran matriksnya.",
  },
  {
    type: "method",
    label: "Metode 1",
    title: "Determinan 2×2",
    subtitle: "Rumus langsung — paling sederhana",
    formula: "det(A) = a₁b₂ − a₂b₁",
    desc: "Untuk matriks 2×2, cukup kalikan diagonal utama lalu kurangi diagonal silang. Cepat dan mudah!",
    color: "emerald",
    visual: "2x2",
  },
  {
    type: "method",
    label: "Metode 2",
    title: "Metode Sarrus",
    subtitle: "Pola diagonal menyilang — khusus 3×3",
    formula: "det = aei+bfg+cdh − (ceg+afh+bdi)",
    desc: "Perpanjang matriks 3×3 dengan mengulang 2 kolom pertama, lalu kalikan sepanjang garis diagonal.",
    color: "amber",
    visual: "sarrus",
  },
  {
    type: "method",
    label: "Metode 3a",
    title: "Minor Mᵢⱼ",
    subtitle: "Bagian dari Ekspansi Kofaktor",
    formula: "Mᵢⱼ = det(submatriks tanpa baris i & kolom j)",
    desc: "Hapus baris ke-i dan kolom ke-j dari matriks, lalu hitung determinan dari sisa 2×2 yang terbentuk.",
    color: "sky",
    visual: "minor",
  },
  {
    type: "method",
    label: "Metode 3b",
    title: "Kofaktor Cᵢⱼ",
    subtitle: "Minor dengan tanda",
    formula: "Cᵢⱼ = (−1)^(i+j) · Mᵢⱼ",
    desc: "Kofaktor adalah minor yang diberi tanda positif atau negatif mengikuti pola papan catur (+−+/−+−/+−+).",
    color: "purple",
    visual: "cofactor",
  },
  {
    type: "method",
    label: "Metode 3c",
    title: "Ekspansi Baris / Kolom",
    subtitle: "Menggabungkan semua kofaktor",
    formula: "|A| = a₁₁C₁₁ + a₁₂C₁₂ + a₁₃C₁₃",
    desc: "Pilih satu baris atau kolom, kalikan tiap elemen dengan kofaktornya, lalu jumlahkan semua hasilnya.",
    color: "violet",
    visual: "expansion",
  },
  {
    type: "outro",
    bg: "bg-gray-900",
    title: "Mana yang Dipakai?",
    items: [
      { size: "2×2", method: "Rumus langsung", color: "text-emerald-400" },
      { size: "3×3", method: "Sarrus atau Kofaktor", color: "text-amber-400" },
      { size: "n×n", method: "Ekspansi Kofaktor", color: "text-violet-400" },
    ],
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
  amber:   { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   badge: "bg-amber-100 text-amber-700"   },
  sky:     { bg: "bg-sky-50",     border: "border-sky-200",     text: "text-sky-700",     badge: "bg-sky-100 text-sky-700"       },
  purple:  { bg: "bg-purple-50",  border: "border-purple-200",  text: "text-purple-700",  badge: "bg-purple-100 text-purple-700" },
  violet:  { bg: "bg-violet-50",  border: "border-violet-200",  text: "text-violet-700",  badge: "bg-violet-100 text-violet-700" },
};

/* ─── Visual sub-components ─────────────────────────────────────────────── */
function Visual2x2() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-cols-2 gap-2">
        {[["a","emerald"],["b","rose"],["c","rose"],["d","emerald"]].map(([v,c],i) => (
          <div key={i} className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono font-black text-lg
            ${c==="emerald" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-rose-50 text-rose-500 border border-rose-200"}`}>{v}</div>
        ))}
      </div>
      <p className="font-mono text-xs text-gray-500">ad − bc</p>
    </div>
  );
}

function VisualSarrus() {
  const cells = [["a","b","c"],["d","e","f"],["g","h","i"]];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-cols-3 gap-1.5">
        {cells.flat().map((v, i) => (
          <div key={i} className="w-9 h-9 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center font-mono text-xs font-bold text-amber-700">{v}</div>
        ))}
      </div>
      <p className="font-mono text-[10px] text-gray-500 text-center">aei+bfg+cdh−(ceg+afh+bdi)</p>
    </div>
  );
}

function VisualMinor() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-cols-3 gap-1.5">
        {[0,1,2,3,4,5,6,7,8].map((i) => {
          const isDim = i === 0 || i === 1 || i === 2 || i === 3 || i === 6;
          return (
            <div key={i} className={`w-9 h-9 rounded-md flex items-center justify-center font-mono text-xs font-bold
              ${isDim ? "bg-gray-100 text-gray-400 opacity-40" : "bg-sky-50 border border-sky-200 text-sky-700"}`}>
              {isDim ? "×" : "■"}
            </div>
          );
        })}
      </div>
      <p className="font-mono text-[10px] text-gray-500">hilangkan baris & kolom</p>
    </div>
  );
}

function VisualCofactor() {
  const signs = [["+","−","+"],[" −","+","−"],["+"," −","+"]];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-cols-3 gap-1.5">
        {signs.flat().map((s, i) => (
          <div key={i} className={`w-9 h-9 rounded-md flex items-center justify-center font-mono text-sm font-black
            ${s.trim()==='+' ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-rose-50 text-rose-500 border border-rose-200"}`}>
            {s.trim()}
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] text-gray-500">pola tanda kofaktor</p>
    </div>
  );
}

function VisualExpansion() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2 items-center">
        {["a₁₁","C₁₁","+","a₁₂","C₁₂","+","a₁₃","C₁₃"].map((v, i) => (
          <span key={i} className={`font-mono text-xs font-bold ${v==="+" ? "text-gray-400" : i%2===0 ? "text-violet-600" : "text-gray-600"}`}>{v}</span>
        ))}
      </div>
      <p className="font-mono text-[10px] text-gray-500">ekspansi baris pertama</p>
    </div>
  );
}

const VISUAL_MAP: Record<string, React.FC> = {
  "2x2": Visual2x2, sarrus: VisualSarrus, minor: VisualMinor,
  cofactor: VisualCofactor, expansion: VisualExpansion,
};

/* ─── Main ────────────────────────────────────────────────────────────────── */
export default function HorizontalMetode() {
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section   = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const totalWidth = container.scrollWidth - window.innerWidth;
      gsap.to(container, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth * 1.5}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="horizontal-metode" ref={sectionRef} className="relative overflow-hidden bg-white" style={{ height: "100vh" }}>
      <div ref={containerRef} className="flex h-full items-stretch" style={{ width: "fit-content" }}>

        {PANELS.map((panel, idx) => {
          /* Intro panel */
          if (panel.type === "intro") {
            return (
              <div key={idx} className={`shrink-0 w-[40vw] h-full flex flex-col justify-center px-16 ${panel.bg}`}>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6" style={{ fontFamily: '"Georgia", serif' }}>{panel.title}</h2>
                <p className="text-violet-200 text-base leading-relaxed max-w-xs">{panel.desc}</p>
                <div className="mt-10 flex items-center gap-3 text-violet-300">
                  <div className="flex gap-1.5">
                    {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" style={{ animationDelay: `${i*0.3}s` }} />)}
                  </div>
                  <span className="text-xs tracking-widest uppercase">scroll terus →</span>
                </div>
              </div>
            );
          }

          /* Outro panel */
          if (panel.type === "outro") {
            return (
              <div key={idx} className={`shrink-0 w-[40vw] h-full flex flex-col justify-center px-16 ${panel.bg}`}>
                <h2 className="text-3xl font-black text-white mb-8" style={{ fontFamily: '"Georgia", serif' }}>{panel.title}</h2>
                <div className="flex flex-col gap-5">
                  {panel.items!.map((item) => (
                    <div key={item.size} className="flex items-center gap-4">
                      <span className="font-mono text-white font-bold w-12">{item.size}</span>
                      <div className="flex-1 h-px bg-gray-700" />
                      <span className={`font-mono text-sm font-semibold ${item.color}`}>{item.method}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          /* Method panels */
          const p = panel;
          const c = COLOR_MAP[p.color ?? "violet"];
          const VisualComp = VISUAL_MAP[p.visual ?? ""];

          return (
            <div key={idx} className={`shrink-0 w-[32vw] h-full flex flex-col justify-center px-10 border-r border-gray-100 bg-white`}>
              <div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${c.badge} mb-4 inline-block`}>{p.label}</span>
                <h3 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: '"Georgia", serif' }}>{p.title}</h3>
                <p className="text-xs text-gray-400 mb-5">{p.subtitle}</p>

                {/* Visual */}
                {VisualComp && (
                  <div className={`rounded-2xl p-5 mb-5 border ${c.bg} ${c.border} flex justify-center`}>
                    <VisualComp />
                  </div>
                )}

                {/* Formula */}
                <div className={`font-mono text-sm font-bold px-4 py-3 rounded-xl border ${c.bg} ${c.border} ${c.text} mb-4`}>
                  {p.formula}
                </div>

                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}