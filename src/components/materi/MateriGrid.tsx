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
  {
    id: 4,
    slug: "turunan-tingkat-tinggi",
    title: "Turunan Tingkat Tinggi",
    description: "Eksplorasi turunan kedua, ketiga dan hubungannya dengan konveksitas kurva.",
    icon: "d²",
    level: "Ekspert",
    category: "lanjut",
    duration: "60 Menit",
    exercises: "10 Soal",
    formula: "f''(x) = d²y/dx²",
    popular: false,
  },
  {
    id: 5,
    slug: "integral-tertentu",
    title: "Integral Tertentu",
    description: "Hitung luas di bawah kurva menggunakan teorema dasar kalkulus Riemann.",
    icon: "∫",
    level: "Ekspert",
    category: "lanjut",
    duration: "75 Menit",
    exercises: "14 Soal",
    formula: "∫ₐᵇ f(x) dx = F(b) - F(a)",
    popular: false,
  },
  {
    id: 6,
    slug: "barisan-deret",
    title: "Barisan & Deret",
    description: "Konvergensi dan divergensi deret tak hingga, deret Taylor, dan McLaurin.",
    icon: "Σ",
    level: "Ekspert",
    category: "lanjut",
    duration: "90 Menit",
    exercises: "12 Soal",
    formula: "Σ aₙ (n=1 to ∞)",
    popular: false,
  },
  {
    id: 7,
    slug: "fungsi-aljabar",
    title: "Fungsi Aljabar",
    description: "Manipulasi simbolik dan persamaan linear serta kuadrat dalam pemodelan data.",
    icon: "f",
    level: "Dasar",
    category: "dasar",
    duration: "60 Menit",
    exercises: "10 Soal",
    formula: "f(x) = ax² + bx + c",
    popular: false,
  },
  {
    id: 8,
    slug: "fungsi-trigonometri",
    title: "Fungsi Trigonometri",
    description: "Sinus, cosinus, tangen dan turunan/integral fungsi trigonometri.",
    icon: "sin",
    level: "Menengah",
    category: "menengah",
    duration: "50 Menit",
    exercises: "10 Soal",
    formula: "d/dx[sin(x)] = cos(x)",
    popular: false,
  },
];

export default function MateriGrid({ activeFilter }: { activeFilter: string }) {
  const filtered = useMemo(() => {
    if (activeFilter === "semua") return MATERI_DATA;
    if (activeFilter === "terpopuler") return MATERI_DATA.filter((m) => m.popular);
    return MATERI_DATA.filter((m) => m.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="relative z-10 px-6 md:px-16 lg:px-24 pb-24 pt-6 bg-white">
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
          className="text-center py-24 text-gray-400 text-sm"
          style={{ fontFamily: '"Georgia", serif' }}
        >
          Tidak ada modul untuk filter ini.
        </motion.div>
      )}
    </section>
  );
}