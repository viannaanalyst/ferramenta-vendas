import { useState } from 'react'
import TopBanner from './components/sections/TopBanner'
import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import Centralize from './components/sections/Centralize'
import Comparison from './components/sections/Comparison'
import HowItWorks from './components/sections/HowItWorks'
import Pricing from './components/sections/Pricing'
import FAQ from './components/sections/FAQ'
import Footer from './components/sections/Footer'
import UpsellModal from './components/UpsellModal'

function App() {
  const [showUpsellModal, setShowUpsellModal] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <main className="pt-12">
        <Hero />
        <Features />
        <Centralize />
        <Comparison />
        <HowItWorks />
        <Pricing onOpenCheckout={() => setShowUpsellModal(true)} />
        <FAQ />
      </main>
      <Footer />
      <UpsellModal 
        isOpen={showUpsellModal} 
        onClose={() => setShowUpsellModal(false)} 
      />
    </div>
  )
}

export default App
