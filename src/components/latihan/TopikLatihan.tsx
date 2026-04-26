"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import TextHeading from "@/components/ui/TextHeading";

// DATA ───────────────────────────────────────────── //

export const MATERI_DATA = [
  {
    id: 1,
    slug: "turunan",
    title: "Quiz Turunan",
    description:
      "Kuasai konsep dasar turunan, aturan rantai, hingga aplikasi turunan dalam kehidupan sehari-hari.",
    icon: "∞",
    level: "EASY",
    progress: 40,
    totalSoal: 10,
    doneSoal: 4,
    status: "lanjut",
  },
  {
    id: 2,
    slug: "integral",
    title: "Quiz Integral",
    description:
      "Menghitung luas daerah di bawah kurva, teknik substitusi, dan integral parsial yang menantang.",
    icon: "∂",
    level: "HARD",
    progress: 0,
    totalSoal: 10,
    doneSoal: 0,
    status: "mulai",
  },
  {
    id: 3,
    slug: "limit",
    title: "Quiz Limit",
    description:
      "Analisis perilaku fungsi saat mendekati titik tertentu. Termasuk limit tak hingga dan L'Hopital.",
    icon: "∫",
    level: "MEDIUM",
    progress: 100,
    totalSoal: 10,
    doneSoal: 10,
    status: "selesai",
  },
];

// STYLE ───────────────────────────────────────────── 

const CARD_STYLE = {
  color: "#4F46E5",
  bg: "#EEF2FF",
  border: "#C7D2FE",
};

type MateriItem = (typeof MATERI_DATA)[number];

// HELPER ───────────────────────────────────────────── 

function getLevelColor(level: string) {
  if (level === "EASY") {
    return "bg-green-100 text-green-600";
  }

  if (level === "MEDIUM") {
    return "bg-yellow-100 text-yellow-600";
  }

  return "bg-red-100 text-red-600";
}

function getButton(materi: MateriItem) {
  if (materi.status === "selesai") {
    return {
      text: "Quiz Selesai",
      style: "bg-green-100 text-green-600",
    };
  }

  if (materi.status === "mulai") {
    return {
      text: "Mulai Sekarang",
      style: "bg-gray-200 text-gray-500",
    };
  }

  return {
    text: "Lanjutkan Quiz",
    style: "bg-gray-100 text-gray-700",
  };
}

  // CARD ───────────────────────────────────────────── 

function MateriCard({
  materi,
  index,
}: {
  materi: MateriItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const cfg = CARD_STYLE;
  const btn = getButton(materi);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width - 0.5) * 8;

    const y =
      ((e.clientY - rect.top) / rect.height - 0.5) * -8;

    gsap.to(el, {
      rotateX: y,
      rotateY: x,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;

    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
    });

    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{ perspective: "1000px" }}
    >
      <Link href={`/materi/${materi.slug}`}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5 cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Top Bar */}
          <div
            className="h-1 w-full rounded-full mb-5"
            style={{
              background: hovered
                ? cfg.color
                : cfg.border,
            }}
          />

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                color: cfg.color,
              }}
            >
              {materi.icon}
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${getLevelColor(
                materi.level
              )}`}
            >
              {materi.level}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {materi.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
            {materi.description}
          </p>

          {/* Progress */}
          <div className="text-xs text-gray-500 mb-2">
            Progress Belajar

            <span className="float-right font-medium text-green-600">
              {materi.doneSoal}/{materi.totalSoal} Soal
            </span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full mb-5">
            <div
              className="h-2 bg-green-500 rounded-full"
              style={{
                width: `${materi.progress}%`,
              }}
            />
          </div>

          {/* Button */}
          <button
            className={`w-full py-3 rounded-xl text-sm font-semibold transition ${btn.style}`}
          >
            {btn.text}
          </button>
        </div>
      </Link>
    </motion.div>
  );
}

export default function MenuMateri() {
  return (
    <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-52 pb-24 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <TextHeading
            subtitle="Pilih Topik Latihan" title="Selesaikan modul untuk membuka lencana spesial" subtitleSize="xl" titleSize="sm"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MATERI_DATA.map((materi, index) => (
            <MateriCard
              key={materi.id}
              materi={materi}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}