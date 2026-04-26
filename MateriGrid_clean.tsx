"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MateriCard from "./MateriCard";

export const MATERI_DATA = [
  {
    id: 1,
    slug: "limit",
    title: "Limit",
    description: "Pondasi utama kalkulus. Memahami perilaku fungsi saat mendekati titik tertentu.",
    icon: "8",
    level: "Dasar",
    category: "dasar",
    duration: "30 Menit",
    exercises: "10 Soal",
    formula: "lim(x?a) f(x) = L",
    popular: true,
  },
  {
    id: 2,
    slug: "turunan",
    title: "Turunan",
    description: "Pelajari laju perubahan sesaat dan bagaimana fungsi bergerak secara dinamis.",
    icon: "?",
    level: "Menengah",
    category: "menengah",
    duration: "120 Menit",
    exercises: "15 Soal",
    formula: "f'(x) = lim(h?0) [f(x+h)-f(x)]/h",
    popular: true,
  },
  {
    id: 3,
    slug: "integral",
    title: "Integral",
    description: "Akumulasi area dan konsep antiturunan. Dasar dari kalkulus integral volume kompleks.",
    icon: "?",
    level: "Menengah",
    category: "menengah",
    duration: "45 Menit",
    exercises: "12 Soal",
    formula: "? f(x) dx = F(x) + C",
    popular: true,
  },
  {
    id: 4,
    slug: "turunan-tingkat-tinggi",
    title: "Turunan Tingkat Tinggi",
    description: "Eksplorasi turunan kedua, ketiga dan hubungannya dengan konveksitas kurva.",
    icon: "d",
    level: "Ekspert",
    category: "lanjut",
    duration: "60 Menit",
    exercises: "10 Soal",
    formula: "f''(x) = dy/dx",
    popular: false,
  },
  {
    id: 5,
    slug: "integral-tertentu",
    title: "Integral Tertentu",
    description: "Hitung luas di bawah kurva menggunakan teorema dasar kalkulus Riemann.",
    icon: "?",
    level: "Ekspert",
    category: "lanjut",
    duration: "75 Menit",
    exercises: "14 Soal",
    formula: "??? f(x) dx = F(b) - F(a)",
    popular: false,
  },
  {
    id: 6,
    slug: "barisan-deret",
    title: "Barisan & Deret",
    description: "Konvergensi dan divergensi deret tak hingga, deret Taylor, dan McLaurin.",
    icon: "?",
    level: "Ekspert",
    category: "lanjut",
    duration: "90 Menit",
    exercises: "12 Soal",
    formula: "???1^8 a?",
    popular: false,
  },
  {
    id: 7,
    slug: "fungsi-aljabar",
    title: "Fungsi Aljabar",
    description: "Manipulasi simbolik dan persamaan linear serta kuadrat dalam pemodelan data.",
    icon: "",
    level: "Dasar",
    category: "dasar",
    duration: "60 Menit",
    exercises: "10 Soal",
    formula: "f(x) = ax + bx + c",
    popular: false,
  },
  {
    id: 8,
    slug: "fungsi-trigonometri",
    title: "Fungsi Trigonometri",
    description: "Sinus, cosinus, tangen dan turunan/integral fungsi trigonometri.",
    icon: "?",
    level: "Menengah",
    category: "menengah",
    duration: "50 Menit",
    exercises: "10 Soal",
    formula: "d/dx[sin(x)] = cos(x)",
    popular: false,
  },
];

const PRO_TIPS = [
  {
    id: 1,
    tip: "Selesaikan modul Limit sebelum memulai Turunan untuk pemahaman konseptual yang lebih kokoh.",
    from: "Limit",
    to: "Turunan",
  },
  {
    id: 2,
    tip: "Pelajari Turunan terlebih dahulu sebelum masuk ke materi Integral untuk fondasi yang kuat.",
    from: "Turunan",
    to: "Integral",
  },
];

export default function MateriGrid({ activeFilter }: { activeFilter: string }) {
  const filtered = useMemo(() => {
    if (activeFilter === "semua") return MATERI_DATA;
    if (activeFilter === "terpopuler") return MATERI_DATA.filter((m) => m.popular);
    return MATERI_DATA.filter((m) => m.category === activeFilter);
  }, [activeFilter]);

  const tip = PRO_TIPS[0];

  return (
    <section className="relative z-10 px-8 md:px-20 pb-24 pt-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((m, i) => (
            <MateriCard key={m.id} materi={m} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 text-slate-500 font-mono text-sm"
        >
          Tidak ada modul untuk filter ini.
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 flex flex-col md:flex-row items-start gap-4 px-6 py-5 rounded-3xl border border-slate-200 bg-slate-50"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-sm bg-emerald-100 text-emerald-700">
          ?
        </div>
        <div>
          <p className="text-xs font-mono text-emerald-600 tracking-widest mb-1">PRO TIP  LABORATORIUM</p>
          <p className="text-slate-700 text-sm leading-relaxed">{tip.tip}</p>
        </div>
      </motion.div>
    </section>
  );
}
