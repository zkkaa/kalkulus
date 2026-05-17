"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface MateriItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: string;
  tags: string[];
  color: {
    primary: string;
    hover: string;
    light: string;
    border: string;
    glow: string;
    badge: string;
  };
  soalPreview: { q: string; a: string }[];
  subTopics: string[];
}

// ─── Shared MATERI_DATA ───────────────────────────────────────────────────────
export const MATERI_DATA: MateriItem[] = [
  {
    id: 1,
    slug: "barisan-deret",
    title: "Barisan & Deret",
    subtitle: "Kalkulus Lanjut · Pertemuan 4",
    desc: "Pelajari pola barisan aritmetika dan geometri, rumus suku ke-n, jumlah deret hingga tak hingga, serta uji konvergensinya secara mendalam.",
    icon: "∑",
    tags: ["Barisan Aritmetika", "Barisan Geometri", "Deret", "Konvergensi"],
    color: {
      primary: "#4F46E5",
      hover: "#4338CA",
      light: "#EEF2FF",
      border: "#C7D2FE",
      glow: "rgba(99,102,241,0.12)",
      badge: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    soalPreview: [
      { q: "Suku ke-15 dari barisan −15, −11, −7, −3, ...?", a: "U₁₅ = 41" },
      { q: "Jumlah deret geometri 3 + 6 + 12 + ... + 96?", a: "S₆ = 189" },
      { q: "S∞ dari barisan 1, ½, ¼, ⅛, ...?", a: "S∞ = 2" },
    ],
    subTopics: [
      "Barisan Aritmetika",
      "Barisan Geometri",
      "Deret Aritmetika",
      "Deret Geometri",
      "Deret Tak Hingga",
      "Konvergensi",
    ],
  },
  {
    id: 2,
    slug: "determinan",
    title: "Determinan",
    subtitle: "Kalkulus Lanjut · Pertemuan 7",
    desc: "Kuasai perhitungan determinan matriks 2×2 dan 3×3 dengan berbagai metode, serta terapannya dalam penyelesaian sistem persamaan linear.",
    icon: "|A|",
    tags: ["Determinan 2×2", "Metode Sarrus", "Kofaktor", "Aturan Cramer"],
    color: {
      primary: "#7C3AED",
      hover: "#6D28D9",
      light: "#F5F3FF",
      border: "#DDD6FE",
      glow: "rgba(124,58,237,0.12)",
      badge: "bg-violet-50 text-violet-600 border-violet-100",
    },
    soalPreview: [
      { q: "Hitung det(A) dari matriks [3 7 / 5 2]", a: "det = −29" },
      { q: "Determinan 3×3 metode Sarrus: B = [−2 4 −5 / ...]", a: "det = 45" },
      { q: "Pecahkan SPL: 5x + 2y + 19 = 0, 3x + 4y + 17 = 0", a: "x=−3, y=−2" },
    ],
    subTopics: [
      "Determinan 2×2",
      "Determinan 3×3",
      "Metode Sarrus",
      "Ekspansi Kofaktor",
      "Aturan Cramer",
    ],
  },
];

// ─── SoalPreview ──────────────────────────────────────────────────────────────
function SoalPreview({
  previews,
  color,
}: {
  previews: { q: string; a: string }[];
  color: { primary: string; light: string; border: string };
}) {
  const [active, setActive] = useState(0);

  return (
    <div
      className="rounded-2xl p-4 border overflow-hidden"
      style={{ background: color.light, borderColor: color.border }}
    >
      <p
        className="text-[10px] font-mono font-bold uppercase tracking-widest mb-3"
        style={{ color: color.primary }}
      >
        Preview Materi
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

      <div className="flex gap-1.5 mt-3">
        {previews.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault(); // prevent Link navigation on click
              setActive(i);
            }}
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

// ─── MateriCard ───────────────────────────────────────────────────────────────
/**
 * `withLink` — bungkus card dengan <Link href="/materi/[slug]">.
 *   true  → dipakai di MenuMateri (halaman /materi)
 *   false → dipakai di ContentSection (landing page), tanpa navigasi
 */
export function MateriCard({
  item,
  index,
  withLink = false,
}: {
  item: MateriItem;
  index: number;
  withLink?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 25,
  });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const cardContent = (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      animate={{
        boxShadow: hovered
          ? `0 30px 60px ${item.color.glow}, 0 8px 20px rgba(0,0,0,0.06)`
          : "0 2px 12px rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.3 }}
      className="relative rounded-3xl bg-white border border-gray-100 overflow-hidden h-full"
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

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <motion.div
            animate={{ rotate: hovered ? -8 : 0, scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl border-2 shrink-0"
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
              className="text-xl font-black text-gray-900"
              style={{ fontFamily: '"Georgia", serif' }}
            >
              {item.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{item.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2.5 py-1 rounded-full border font-medium ${item.color.badge}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Soal Preview */}
        <div className="mb-5">
          <SoalPreview previews={item.soalPreview} color={item.color} />
        </div>

        {/* Arrow (shown when withLink=true to hint navigability) */}
        {withLink && (
          <div className="flex items-center justify-end pt-2 border-t border-gray-100">
            <motion.div
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
              className="text-xl font-light"
              style={{ color: item.color.primary }}
            >
              →
            </motion.div>
          </div>
        )}
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

      {/* Bottom slide indicator (visible when withLink) */}
      {withLink && (
        <div
          className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          style={{ background: item.color.primary }}
        />
      )}
    </motion.div>
  );

  const wrapper = (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
      className={withLink ? "group" : ""}
    >
      {cardContent}
    </motion.div>
  );

  if (withLink) {
    return <Link href={`/materi/${item.slug}`}>{wrapper}</Link>;
  }

  return wrapper;
}