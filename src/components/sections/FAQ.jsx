import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus } from 'react-icons/fi'
import Reveal from '../Reveal'

const faqs = [
  {
    question: 'Eu preciso pagar por updates?',
    answer:
      'Nunca. Lançamos updates frequentes — novos templates, funis, automações e estratégias — e você recebe tudo grátis dentro do seu plano.',
  },
  {
    question: 'Posso cancelar quando quiser?',
    answer:
      'Sim. Sem fidelidade, sem multa, sem burocracia. Cancele com um clique direto no painel.',
  },
  {
    question: 'Vocês têm API oficial do Facebook/Meta?',
    answer:
      'Sim. Integração oficial com a API do Facebook/Meta — Instagram, Messenger e Ads — com conexão estável e dentro das diretrizes da plataforma.',
  },
  {
    question: 'Tem IA pra atender clientes?',
    answer:
      'Sim. Agente de IA que atende no WhatsApp, Instagram e Facebook 24/7. Responde dúvidas, qualifica leads e passa para sua equipe quando preciso.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative bg-white text-gray-900 overflow-hidden">
      <div className="relative container mx-auto px-6 py-20 md:py-28 max-w-4xl">
        <Reveal className="flex items-center gap-3 mb-12">
          <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-gray-400">
            05 — Dúvidas
          </span>
          <span className="flex-1 h-px bg-gray-200" />
        </Reveal>

        <Reveal as="h2" delay={0.1} className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] mb-14 max-w-3xl text-gray-900">
          Quer comprar, mas{' '}
          <em className="text-gradient not-italic">ficou na dúvida</em>?
        </Reveal>

        <div className="border-y border-gray-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <Reveal key={idx} delay={0.05 * idx} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-display text-xl md:text-2xl text-gray-900 group-hover:text-gradient transition-colors">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"
                  >
                    <FiPlus className="w-4 h-4 text-gray-400" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-16 text-gray-500 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
