import TopBanner from '../components/sections/TopBanner'
import Hero from '../components/sections/Hero'
import Stats from '../components/sections/Stats'
import Features from '../components/sections/Features'
import Comparison from '../components/sections/Comparison'
import Pricing from '../components/sections/Pricing'
import FAQ from '../components/sections/FAQ'
import Footer from '../components/sections/Footer'

const Landing = () => {
  return (
    <div className="min-h-screen bg-ink">
      <TopBanner />
      <main className="pt-12">
        <Hero />
        <Stats />
        <Features />
        <Comparison />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default Landing
