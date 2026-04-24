"use client";

import MathParticles from "@/components/ui/MathParticles";
import Navbar from "@/components/ui/Navbar";
import MateriHero from "@/components/materi/MateriHero";
import MateriFilter from "@/components/materi/MateriFilter";
import MateriGrid from "@/components/materi/MateriGrid";
import MateriFeature from "@/components/materi/MateriFeature";
import ScrollAnim from "@/components/common/ScrollAnim";
import { Footer } from "@/components/ui/Footer";
import { useState } from "react";

export default function MateriPage() {
  const [activeFilter, setActiveFilter] = useState("semua");

  return (
    // bg-white sesuai landing, bukan bg-black
    <main className="relative min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Particles lebih subtle di bg terang */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <MathParticles count={20} opacity={0.04} />
      </div>

      <ScrollAnim>
        <Navbar />
        <MateriHero />
        <MateriFeature />
        <MateriFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <MateriGrid activeFilter={activeFilter} />
        <Footer />
      </ScrollAnim>
    </main>
  );
}