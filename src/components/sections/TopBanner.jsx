import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TopBanner = () => {
  const [days, setDays] = useState([])

  useEffect(() => {
    const formatDate = (date) =>
      date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })

    const today = new Date()
    const lastDays = []
    for (let i = 2; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      lastDays.push(formatDate(d))
    }
    setDays(lastDays)
  }, [])

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur-md text-bone border-b border-bone/15 py-2.5 px-4"
    >
      <div className="container mx-auto flex items-center justify-center gap-3 text-center">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <p className="font-mono-tech text-[11px] md:text-xs uppercase tracking-[0.18em] text-bone/80">
          {days.join(' · ')} ·{' '}
          <span className="text-gradient font-bold">70% off vitalício</span>{' '}
          aplicado
        </p>
      </div>
    </motion.div>
  )
}

export default TopBanner
