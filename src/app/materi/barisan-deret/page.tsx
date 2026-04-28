"use client";

import HeroBarisDeret from "@/components/materi/barisan-deret/HeroBarisDeret";
import ApaItuBarisan from "@/components/materi/barisan-deret/ApaItuBarisan";
import JenisBarisan from "@/components/materi/barisan-deret/JenisBarisan";
import HorizontalExplorer from "@/components/materi/barisan-deret/HorizontalExplorer";
import ApaItuDeret from "@/components/materi/barisan-deret/ApaItuDeret";
import ContohSoal from "@/components/materi/barisan-deret/ContohSoal";
import PlaygroundVisualisasi from "@/components/materi/barisan-deret/PlaygroundVisualisasi";
import ProgressIndicator from "@/components/materi/barisan-deret/ProgressIndicator";

export default function BadasanDeretPage() {
  return (
    <main className="relative bg-white min-h-screen">
      <ProgressIndicator />
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