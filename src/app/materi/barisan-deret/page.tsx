"use client";

import HeroBarisDeret from "@/components/materi/barisan-deret/HeroBarisDeret";
import ApaItuBarisan from "@/components/materi/barisan-deret/ApaItuBarisan";
import JenisBarisan from "@/components/materi/barisan-deret/JenisBarisan";
import HorizontalExplorer from "@/components/materi/barisan-deret/HorizontalExplorer";
import ApaItuDeret from "@/components/materi/barisan-deret/ApaItuDeret";
import ContohSoal from "@/components/materi/barisan-deret/ContohSoal";
import PlaygroundVisualisasi from "@/components/materi/barisan-deret/PlaygroundVisualisasi";
import ProgressIndicator, { ProgressSection } from "@/components/ui/Progressindicator";

const SECTIONS: ProgressSection[] = [
  { id: "hero-section",        label: "Intro" },
  { id: "apa-barisan",         label: "Barisan" },
  { id: "jenis-barisan",       label: "Jenis Barisan" },
  { id: "horizontal-explorer", label: "Eksplorasi" },
  { id: "apa-deret",           label: "Deret" },
  { id: "contoh-soal",         label: "Contoh Soal" },
  { id: "playground",          label: "Playground" },
];

export default function BadasanDeretPage() {
  return (
    <main className="relative bg-white min-h-screen">
      <ProgressIndicator sections={SECTIONS} color="indigo" />
      <HeroBarisDeret />
      <ApaItuBarisan />
      <JenisBarisan />
      <HorizontalExplorer />
      <ApaItuDeret />
      <ContohSoal />
      <PlaygroundVisualisasi />
    </main>
  );
}