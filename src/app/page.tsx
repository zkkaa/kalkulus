"use client"

import MathParticles from '@/components/ui/MathParticles'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import { Footer } from '@/components/landing/Footer'
// import Quote from '@/components/landing/Quote'
import Teamm from '@/components/landing/Teamm'
import ScrollAnim from '@/components/common/ScrollAnim'
import Quotes from '@/components/landing/quotes'
import ContentSections from '@/components/landing/ContentSections'
import TeamIntro from '@/components/landing/TeamIntro'

export default function Home() {
  return (

    <main>

      {/* <div className="fixed inset-0 pointer-events-none z-0">
        <MathParticles count={40} opacity={0.045} />
      </div> */}

      <ScrollAnim >
        <Navbar />
        {/* <HeroSection />
        <ContentSections />
        <Quotes />
        <Teamm />
        <Footer /> */}
        <TeamIntro />
      </ScrollAnim>

    </main>
  )
}