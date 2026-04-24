"use client";

import { motion, AnimatePresence } from "framer-motion";
import MateriCard from "./MateriCard";
import TextHeading from "@/components/ui/TextHeading";

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

export default function MateriGrid() {
  const items = MATERI_DATA;

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
          {items.map((m, i) => (
            <MateriCard key={m.id} materi={m} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 text-gray-400 text-sm"
          style={{ fontFamily: '"Georgia", serif' }}
        >
          Tidak ada modul tersedia.
        </motion.div>
      )}
    </section>
  );
}