import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { HowItWorks } from '@/components/how-it-works'
import { FeaturesSection } from '@/components/features-section'
import { FAQ } from '@/components/faq'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <FAQ />
      <Footer />
    </main>
  )
}
