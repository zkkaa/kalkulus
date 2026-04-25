"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import TextHeading from "@/components/ui/TextHeading";

// ─── Data ────────────────────────────────────────────────────────────────────
export const MATERI_DATA = [
  {
    id: 1,
    slug: "limit",
    title: "Limit",
    description: "Pondasi utama kalkulus. Memahami perilaku fungsi saat mendekati titik tertentu.",
    icon: "∞",
    level: "Dasar",
    category: "dasar",
    duration: "30 Menit",
    exercises: "10 Soal",
    formula: "lim(x→a) f(x) = L",
    popular: true,
  },
  {
    id: 2,
    slug: "turunan",
    title: "Turunan",
    description: "Pelajari laju perubahan sesaat dan bagaimana fungsi bergerak secara dinamis.",
    icon: "∂",
    level: "Menengah",
    category: "menengah",
    duration: "120 Menit",
    exercises: "15 Soal",
    formula: "f'(x) = lim(h→0) [f(x+h)-f(x)]/h",
    popular: true,
  },
  {
    id: 3,
    slug: "integral",
    title: "Integral",
    description: "Akumulasi area dan konsep antiturunan. Dasar dari kalkulus integral volume kompleks.",
    icon: "∫",
    level: "Menengah",
    category: "menengah",
    duration: "45 Menit",
    exercises: "12 Soal",
    formula: "∫ f(x) dx = F(x) + C",
    popular: true,
  },
];

// ─── Card Style ───────────────────────────────────────────────────────────────
const CARD_STYLE = {
  color: "#4F46E5",
  bg: "#EEF2FF",
  border: "#C7D2FE",
};

// ─── MateriCard (inline) ──────────────────────────────────────────────────────
type MateriItem = (typeof MATERI_DATA)[number];

function MateriCard({ materi, index }: { materi: MateriItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const cfg = CARD_STYLE;

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
            {/* Icon */}
            <div className="mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
              >
                {materi.icon}
              </div>
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

// ─── MenuMateri ───────────────────────────────────────────────────────────────
export default function MenuMateri() {
  return (
    <section className="relative z-10 px-6 md:px-16 lg:px-24 pb-24 pt-32 bg-white">
      <div className="mb-10">
        <TextHeading subtitle="Modul" title="Pembelajaran" subtitleSize="sm" titleSize="xl" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {MATERI_DATA.map((m, i) => (
            <MateriCard key={m.id} materi={m} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}