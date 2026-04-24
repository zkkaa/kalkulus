"use client";

import MathParticles from "@/components/ui/MathParticles";
import Navbar from "@/components/ui/Navbar";
import MateriHero from "@/components/materi/MateriHero";
import MateriGrid from "@/components/materi/MateriGrid";
import MateriFeature from "@/components/materi/MateriFeature";
import ScrollAnim from "@/components/common/ScrollAnim";
import { FooterCopyright } from "@/components/ui/Footer";

export default function MateriPage() {
  return (
    // bg-white sesuai landing, bukan bg-black
    <main className="relative min-h-screen bg-white text-gray-900">
      {/* Particles lebih subtle di bg terang */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <MathParticles count={20} opacity={0.04} />
      </div>

      <ScrollAnim>
        <Navbar />
        <MateriHero />
        <MateriFeature />
        <MateriGrid />
        <FooterCopyright />
      </ScrollAnim>
    </main>
  );
}