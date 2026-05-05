import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Reveal from '../Reveal'

const stats = [
  {
    parts: [{ type: 'count', from: 0, to: 40, prefix: '+' }],
    label: 'Aulas no curso completo',
    note: 'do zero ao avançado',
  },
  {
    parts: [
      { type: 'count', from: 0, to: 24 },
      { type: 'static', value: '/' },
      { type: 'count', from: 0, to: 7 },
    ],
    label: 'Suporte por WhatsApp',
    note: 'domingo a domingo',
  },
  {
    parts: [{ type: 'count', from: 0, to: 5, suffix: 'min' }],
    label: 'Setup completo',
    note: 'automações já prontas',
  },
  {
    parts: [{ type: 'static', value: '∞' }],
    label: 'Contatos & Usuários',
    note: 'sem limite, sem upsell',
  },
]

const Counter = ({ from, to, duration = 1.6 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const range = to - from
    let raf

    const tick = (now) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + range * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, from, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  )
}

const StatValue = ({ parts }) => (
  <span className="font-display text-[clamp(3.5rem,7vw,6rem)] leading-none text-gradient inline-flex items-baseline">
    {parts.map((p, i) => {
      if (p.type === 'static') return <span key={i}>{p.value}</span>
      return (
        <span key={i}>
          {p.prefix}
          <Counter from={p.from} to={p.to} />
          {p.suffix}
        </span>
      )
    })}
  </span>
)

const Stats = () => {
  return (
    <section className="relative bg-ink text-bone overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark opacity-40" aria-hidden />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/20 to-transparent"
      />

      <div className="relative container mx-auto px-6 py-20 md:py-28 max-w-6xl">
        <Reveal className="flex items-center gap-3 mb-12">
          <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-bone/50">
            01 — Por dentro da plataforma
          </span>
          <span className="flex-1 h-px bg-bone/15" />
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-bone/10 border border-bone/10 rounded-2xl overflow-hidden">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-ink p-8 md:p-10 group hover:bg-white/[0.02] transition-colors"
            >
              <StatValue parts={stat.parts} />
              <div className="mt-4 text-bone font-medium">{stat.label}</div>
              <div className="mt-2 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-bone/40">
                {stat.note}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
