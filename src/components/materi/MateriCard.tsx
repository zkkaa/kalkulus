"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";

type MateriCardProps = {
  materi: {
    level: string;
    slug: string;
    icon: ReactNode;
    title: string;
    description: string;
    formula?: string;
    duration: string;
    exercises: string;
  };
  index: number;
};

// Ikuti palet landing: indigo utama, aksen sesuai level
const LEVEL_CONFIG = {
  Dasar: {
    color: "#10B981",      // emerald-500
    bg: "#F0FDF4",
    border: "#A7F3D0",
    dot: "bg-emerald-400",
    badge: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  Menengah: {
    color: "#4F46E5",      // indigo-600 (warna utama landing)
    bg: "#EEF2FF",
    border: "#C7D2FE",
    dot: "bg-indigo-400",
    badge: "text-indigo-700 bg-indigo-50 border-indigo-200",
  },
  Ekspert: {
    color: "#F59E0B",      // amber — sama seperti sebelumnya
    bg: "#FFFBEB",
    border: "#FDE68A",
    dot: "bg-amber-400",
    badge: "text-amber-700 bg-amber-50 border-amber-200",
  },
} as const;

type Level = keyof typeof LEVEL_CONFIG;

export default function MateriCard({ materi, index }: MateriCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const cfg = LEVEL_CONFIG[materi.level as Level] || LEVEL_CONFIG.Dasar;

  // 3-D tilt on hover (sama seperti MateriCard di ContentSections)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    gsap.to(el, { rotateX: y, rotateY: x, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "800px" }}
    >
      <Link href={`/materi/${materi.slug}`}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-2xl overflow-hidden cursor-pointer group bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Top color accent bar */}
          <div
            className="h-1 w-full transition-all duration-300"
            style={{
              background: hovered
                ? `linear-gradient(90deg, ${cfg.color}, transparent)`
                : cfg.border,
              opacity: hovered ? 1 : 0.5,
            }}
          />

          <div className="p-6">
            {/* Icon + level badge */}
            <div className="flex items-start justify-between mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
              >
                {materi.icon}
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.badge}`}
              >
                {materi.level}
              </span>
            </div>

            {/* Title + description */}
            <h3
              className="text-gray-900 font-bold text-lg mb-2 group-hover:text-indigo-600 transition-colors duration-200"
              style={{ fontFamily: '"Georgia", serif' }}
            >
              {materi.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
              {materi.description}
            </p>

            {/* Formula preview */}
            {materi.formula && (
              <div
                className="mt-4 px-3 py-2 rounded-lg font-mono text-xs bg-gray-50 border border-gray-100"
                style={{ color: cfg.color }}
              >
                {materi.formula}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
              <div className="flex gap-5">
                <div>
                  <p className="text-gray-400 text-xs tracking-widest uppercase mb-0.5">Durasi</p>
                  <p className="text-gray-700 text-sm font-semibold">{materi.duration}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs tracking-widest uppercase mb-0.5">Soal</p>
                  <p className="text-gray-700 text-sm font-semibold">{materi.exercises}</p>
                </div>
              </div>

              <motion.div
                animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
                className="text-indigo-500 text-xl font-light"
              >
                →
              </motion.div>
            </div>
          </div>

          {/* Hover corner radial */}
          <div
            className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at top right, ${cfg.bg}, transparent 70%)`,
            }}
          />

          {/* Bottom slide indicator */}
          <div
            className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
            style={{ background: cfg.color }}
          />
        </div>
      </Link>
    </motion.div>
  );
}