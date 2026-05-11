"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────
const LATIHAN = [
  {
    id: 1,
    slug:       "barisan-deret",
    title:      "Barisan & Deret",
    subtitle:   "Kalkulus Lanjut · Pertemuan 4",
    desc:       "Uji pemahamanmu tentang pola barisan, rumus suku ke-n, jumlah deret aritmetika, geometri, hingga konvergensi deret tak hingga.",
    icon:       "∑",
    totalSoal:  10,
    tags:       ["Barisan Aritmetika", "Barisan Geometri", "Deret", "Konvergen"],
    color: {
      primary:  "#4F46E5",
      hover:    "#4338CA",
      light:    "#EEF2FF",
      border:   "#C7D2FE",
      glow:     "rgba(99,102,241,0.12)",
      badge:    "bg-indigo-50 text-indigo-600 border-indigo-100",
      diff:     "#F59E0B",  // amber for medium
      diffBg:   "bg-amber-50 text-amber-600 border-amber-100",
    },
    soalPreview: [
      { q: "Suku ke-15 dari barisan −15, −11, −7, −3, ...?", a: "U₁₅ = 41" },
      { q: "Jumlah deret geometri 3 + 6 + 12 + ... + 96?",   a: "S₆ = 189" },
      { q: "S∞ dari barisan 1, ½, ¼, ⅛, ...?",               a: "S∞ = 2" },
    ],
  },
  {
    id: 2,
    slug:       "determinan",
    title:      "Determinan",
    subtitle:   "Kalkulus Lanjut · Pertemuan 7",
    desc:       "Kuasai perhitungan determinan matriks 2×2 dan 3×3 dengan berbagai metode, serta terapannya dalam sistem persamaan linear.",
    icon:       "|A|",
    totalSoal:  10,
    tags:       ["Determinan 2×2", "Metode Sarrus", "Kofaktor", "Cramer"],
    color: {
      primary:  "#7C3AED",
      hover:    "#6D28D9",
      light:    "#F5F3FF",
      border:   "#DDD6FE",
      glow:     "rgba(124,58,237,0.12)",
      badge:    "bg-violet-50 text-violet-600 border-violet-100",
      diff:     "#EF4444",  // red for hard
      diffBg:   "bg-red-50 text-red-600 border-red-100",
    },
    soalPreview: [
      { q: "Hitung det(A) dari matriks [3 7 / 5 2]",              a: "det = −29" },
      { q: "Determinan 3×3 metode Sarrus: B = [−2 4 −5 / ...]",   a: "det = 45" },
      { q: "Pecahkan SPL: 5x + 2y + 19 = 0, 3x + 4y + 17 = 0",   a: "x=−3, y=−2" },
    ],
  },
];


// ─── Preview soal carousel ────────────────────────────────────────────────────
function SoalPreview({ previews, color }: {
  previews: { q: string; a: string }[];
  color: { primary: string; light: string; border: string };
}) {
  const [active, setActive] = useState(0);

  return (
    <div
      className="rounded-2xl p-5 border overflow-hidden"
      style={{ background: color.light, borderColor: color.border }}
    >
      <p className="text-[10px] font-mono font-bold uppercase tracking-widest mb-3"
        style={{ color: color.primary }}>
        Preview Soal
      </p>

      <div className="min-h-15">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-sm text-gray-700 leading-relaxed mb-2 font-medium">
              {previews[active].q}
            </p>
            <p className="text-xs font-mono font-bold" style={{ color: color.primary }}>
              → {previews[active].a}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot nav */}
      <div className="flex gap-1.5 mt-4">
        {previews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? color.primary : color.border,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function LatihanCard({ item, index }: { item: (typeof LATIHAN)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 25 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0); mouseY.set(0); setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        animate={{
          boxShadow: hovered
            ? `0 40px 80px ${item.color.glow}, 0 8px 20px rgba(0,0,0,0.06)`
            : "0 2px 12px rgba(0,0,0,0.06)",
        }}
        transition={{ duration: 0.3 }}
        className="relative rounded-3xl bg-white border border-gray-100 overflow-hidden"
      >
        {/* Animated top bar */}
        <motion.div
          className="h-1.5 w-full"
          animate={{
            background: hovered
              ? `linear-gradient(90deg, ${item.color.primary}, ${item.color.primary}70)`
              : "#F3F4F6",
          }}
          transition={{ duration: 0.4 }}
        />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-7">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: hovered ? -8 : 0, scale: hovered ? 1.08 : 1 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl border-2 shrink-0"
                style={{
                  background: item.color.light,
                  borderColor: item.color.border,
                  color: item.color.primary,
                  fontFamily: '"Georgia", serif',
                }}
              >
                {item.icon}
              </motion.div>

              <div>
                <p className="text-[10px] font-mono text-gray-400 mb-0.5">{item.subtitle}</p>
                <h3
                  className="text-2xl font-black text-gray-900"
                  style={{ fontFamily: '"Georgia", serif' }}
                >
                  {item.title}
                </h3>
              </div>
            </div>

          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-6">{item.desc}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs px-3 py-1 rounded-full border font-medium ${item.color.badge}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Soal preview carousel */}
          <div className="mb-7">
            <SoalPreview previews={item.soalPreview} color={item.color} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="flex items-center gap-6">
              <div>
                <p
                  className="text-2xl font-black"
                  style={{ color: item.color.primary, fontFamily: '"Georgia", serif' }}
                >
                  {item.totalSoal}
                </p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Soal</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p
                  className="text-2xl font-black text-emerald-500"
                  style={{ fontFamily: '"Georgia", serif' }}
                >
                  ✓
                </p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Pembahasan</p>
              </div>
            </div>

            <Link href={`/latihan/${item.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold text-white cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${item.color.primary}, ${item.color.hover})`,
                  fontFamily: '"Georgia", serif',
                }}
              >
                Mulai
                <motion.span animate={{ x: hovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
                  →
                </motion.span>
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Hover radial glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: `radial-gradient(circle at 30% 20%, ${item.color.glow}, transparent 65%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function MenuLatihan() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ml-label", {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="menu-latihan"
      ref={sectionRef}
      className="relative bg-white px-28 py-24 overflow-hidden"
    >
      {/* Soft center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.04), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section label */}
        <div className="ml-label mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-indigo-200 to-transparent" />
            <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase px-4">
              Pilih Topik Latihan
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-indigo-200 to-transparent" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900 text-center"
            style={{ fontFamily: '"Georgia", serif' }}
          >
            Mau latihan{" "}
            <span className="text-indigo-500 italic">materi apa?</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {LATIHAN.map((item, i) => (
            <LatihanCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}