"use client";

import { motion } from "framer-motion";

type MateriFilterProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const FILTERS = [
  { id: "semua", label: "Semua Modul" },
  { id: "dasar", label: "Dasar" },
  { id: "menengah", label: "Menengah" },
  { id: "lanjut", label: "Lanjut" },
  { id: "terpopuler", label: "Terpopuler" },
];

export default function MateriFilter({ activeFilter, setActiveFilter }: MateriFilterProps) {
  return (
    <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-12 pb-4 bg-white">
      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div className="w-full h-px bg-gray-100 mb-10" />

      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-widest text-gray-400 uppercase"
        >
          Modul Pembelajaran
        </motion.h2>
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          href="#"
          className="text-indigo-400 hover:text-indigo-600 text-sm font-medium transition-colors duration-200"
        >
          Lihat semua →
        </motion.a>
      </div>

      {/* ── Filter chips ──────────────────────────────────────────────────── */}
      <div className="flex gap-2.5 flex-wrap">
        {FILTERS.map((f, i) => (
          <motion.button
            key={f.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            onClick={() => setActiveFilter(f.id)}
            className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={
              activeFilter === f.id
                ? {
                    background: "#4F46E5",
                    color: "#fff",
                    boxShadow: "0 2px 12px rgba(79,70,229,0.25)",
                  }
                : {
                    background: "transparent",
                    color: "#9CA3AF",
                    border: "1px solid #E5E7EB",
                  }
            }
          >
            {f.label}
          </motion.button>
        ))}
      </div>
    </section>
  );
}