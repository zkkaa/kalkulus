"use client";

import GameHero from "@/components/games/GameHero";
import GameTicker from "@/components/games/GameTicker";
import GameWhy from "@/components/games/GameWhy";
import GameShowcase from "@/components/games/GameShowCase";
import GameCTA from "@/components/games/GameCTA";
import Navbar from "@/components/ui/Navbar";
import ScrollAnim from "@/components/ui/ScrollAnim";
import { FooterCopyright } from "@/components/ui/Footer";

export default function GamePage() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <ScrollAnim>
        <Navbar />
        <GameHero />
        <GameTicker />
        <GameWhy />
        <GameShowcase />
        <GameCTA />
        <FooterCopyright />
      </ScrollAnim>
    </main>
  );
}