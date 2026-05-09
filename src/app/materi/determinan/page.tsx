"use client";

import ApaItuDeterminan from "@/components/materi/determinan/ApaItuDeterminan";
import HeroDeterminan from "@/components/materi/determinan/Herodeterminan";
import DeterminanOrde2 from "@/components/materi/determinan/DeterminanOrde2";
import HorizontalMetode from "@/components/materi/determinan/HorizontalMetode";
import MinorKofaktor from "@/components/materi/determinan/MinorKofaktor";
import MetodeCramer from "@/components/materi/determinan/MetodeCramer";
import ContohSoal from "@/components/materi/determinan/ContohSoal";
import PlaygroundDeterminan from "@/components/materi/determinan/PlaygroundDeterminan";
import ProgressIndicator, { ProgressSection } from "@/components/ui/Progressindicator";
import BackButton from "@/components/ui/Backbutton";

const SECTIONS: ProgressSection[] = [
  { id: "hero-determinan",   label: "Intro" },
  { id: "apa-determinan",    label: "Apa itu Determinan?" },
  { id: "orde-2",            label: "Determinan 2×2" },
  { id: "horizontal-metode", label: "Eksplorasi Metode" },
  { id: "minor-kofaktor",    label: "Minor & Kofaktor" },
  { id: "cramer",            label: "Metode Cramer" },
  { id: "contoh-soal",       label: "Contoh Soal" },
  { id: "playground",        label: "Playground" },
];

<ProgressIndicator sections={SECTIONS} color="violet" />

export default function DeterminanPage() {
  return (
    <main className="relative bg-white min-h-screen">
      <BackButton href="/materi" label="Materi" variant="light" />
      <ProgressIndicator sections={SECTIONS} color="violet" />
      <HeroDeterminan />
      <ApaItuDeterminan />
      <DeterminanOrde2 />
      <HorizontalMetode />
      <MinorKofaktor />
      <MetodeCramer />
      <ContohSoal />
      <PlaygroundDeterminan />
    </main>
  );
}