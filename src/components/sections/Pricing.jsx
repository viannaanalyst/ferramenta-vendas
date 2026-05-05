import { motion } from 'framer-motion'
import { FiCheck, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Reveal from '../Reveal'

const CHECKOUT_URL = '/checkout'

const features = [
  'Usuários e contatos ilimitados',
  'CRM, funis, sites e automações sem limite',
  'WhatsApp via QR Code + automações',
  'Programação de posts em todas as redes',
  'Modelos de e-mail marketing prontos',
  'Automações de Instagram (estilo ManyChat)',
  'Sequências de follow-up validadas',
  'Geladeira 30, 60 e 90 dias',
  'Curso com +40 aulas',
  'Suporte no WhatsApp · domingo a domingo',
]

const Pricing = () => {
  return (
    <section id="planos" className="relative bg-gray-50 text-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 py-20 md:py-32 max-w-5xl">
        <Reveal className="flex items-center gap-3 mb-12">
          <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-gray-400">
            04 — Plano único
          </span>
          <span className="flex-1 h-px bg-gray-200" />
        </Reveal>

        <div className="text-center mb-14">
          <Reveal as="h2" delay={0.1} className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] max-w-3xl mx-auto">
            Sem confusão.{' '}
            <em className="text-gradient not-italic">Um plano</em>, tudo
            incluso.
          </Reveal>
          <Reveal as="p" delay={0.2} className="text-gray-500 text-lg mt-6 max-w-xl mx-auto">
            Sem fidelidade, sem upsell escondido, sem "fale com vendas".
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Glow */}
          <div
            aria-hidden
            className="absolute -inset-4 bg-gradient-to-r from-roxo/20 to-azul/20 blur-3xl rounded-3xl"
          />

          <div className="relative rounded-2xl border border-ink/10 bg-ink text-bone p-1">
            <div className="rounded-[inherit] p-10 md:p-12 relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 bg-mesh-dark opacity-50"
              />

              <div className="relative grid md:grid-cols-2 gap-12">
                {/* Left: price */}
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-bone/50 mb-3">
                    Plano Ilimitado
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-bone/30 text-2xl line-through">
                      R$ 497
                    </span>
                    <span className="font-mono-tech text-[10px] text-emerald-400 uppercase tracking-[0.2em]">
                      −70%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display text-7xl md:text-8xl text-gradient leading-none">
                      R$149
                    </span>
                  </div>
                  <div className="font-mono-tech text-xs uppercase tracking-[0.2em] text-bone/40 mb-8">
                    /mês · cancelável a qualquer momento
                  </div>

                  <Link
                    to={CHECKOUT_URL}
                    className="group w-full inline-flex items-center justify-center gap-3 bg-bone text-ink px-7 py-4 rounded-full font-semibold text-base shadow-[0_20px_60px_-15px_rgba(245,244,240,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(245,244,240,0.8)] transition-shadow"
                  >
                    Quero o plano ilimitado
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>

                  <div className="mt-5 flex items-center justify-center gap-4 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-bone/40">
                    <span>Sem fidelidade</span>
                    <span className="w-1 h-1 rounded-full bg-bone/30" />
                    <span>Setup em 5min</span>
                  </div>
                </div>

                {/* Right: features */}
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-bone/50 mb-5">
                    Tudo que está incluso
                  </div>
                  <ul className="space-y-3">
                    {features.map((f, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-start gap-3 text-bone/85 text-sm"
                      >
                        <span className="mt-1 w-4 h-4 rounded-full bg-gradient-roxo-azul flex items-center justify-center flex-shrink-0">
                          <FiCheck className="w-2.5 h-2.5 text-bone" />
                        </span>
                        <span>{f}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
