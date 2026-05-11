"use client"

import MathParticles from '@/components/ui/MathParticles'
import Navbar from '@/components/ui/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import { Footer } from '@/components/ui/Footer'
import Teamm from '@/components/landing/Teamm'
import ScrollAnim from '@/components/ui/ScrollAnim'
import Quotes from '@/components/landing/quotes'
import ContentSections from '@/components/landing/ContentSections'
import TeamIntro from '@/components/landing/TeamIntro'

export default function Home() {
  return (
    <main>
      
      <div className="fixed inset-0 pointer-events-none">
        <MathParticles count={30} opacity={0.15} />
      </div>
      <ScrollAnim >
        <Navbar />
        <HeroSection />
        <ContentSections />
        <Quotes />
        <TeamIntro />
        <Teamm />
        <Footer />
      </ScrollAnim>

    </main>
  )
}