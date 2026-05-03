"use client";

import MathParticles from "@/components/ui/MathParticles";
import Navbar from "@/components/ui/Navbar";
import MateriHero from "@/components/materi/MateriHero";
import MenuMateri from "@/components/materi/MenuMateri";
import MateriFeature from "@/components/materi/MateriFeature";
import ScrollAnim from "@/components/ui/ScrollAnim";
import { FooterCopyright } from "@/components/ui/Footer";

export default function MateriPage() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <div className="fixed inset-0 pointer-events-none z-0">
        <MathParticles count={20} opacity={0.04} />
      </div>

      <ScrollAnim>
        <Navbar />
        <MateriHero />
        <MateriFeature />
        <MenuMateri />
        <FooterCopyright />
      </ScrollAnim>
    </main>
  );
}