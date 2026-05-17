"use client";

// ─── Ganti import lama dengan shared component ────────────────────────────────
import { MateriCard, MATERI_DATA } from "@/components/ui/MateriCard";

import { motion, AnimatePresence } from "framer-motion";
import TextHeading from "@/components/ui/TextHeading";

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
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {MATERI_DATA.map((m, i) => (
            // withLink=true karena di halaman /materi card harus bisa diklik ke detail
            <MateriCard key={m.id} item={m} index={i} withLink={true} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}