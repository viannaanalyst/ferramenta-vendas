import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTarget, FiHeart, FiDollarSign, FiStar, FiRefreshCw } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Reveal from '../Reveal'

const stages = [
  {
    id: 'atrair',
    label: 'Atrair',
    icon: FiTarget,
    title: 'Faça leads entrarem pela porta da frente.',
    description:
      'Atraia as pessoas certas, transforme interesse em leads e mantenha seu funil sempre cheio.',
    features: [
      'CRM com pipeline visual',
      'Funis e Landing Pages',
      'Formulários, Quizzes e Pesquisas',
      'Construtor de Websites',
      'Programação de Posts',
      'Captação via WhatsApp / Instagram DM',
      'Rastreamento de Chamadas',
      'QR Codes e cartão de visitas com IA',
    ],
  },
  {
    id: 'nutrir',
    label: 'Nutrir',
    icon: FiHeart,
    title: 'Construa relacionamentos que convertem.',
    description:
      'Tudo o que você precisa para fazer follow-up, manter relevância e construir confiança.',
    features: [
      'IA de Conversação 24/7',
      'Caixa única (SMS, WhatsApp, Instagram, Messenger)',
      'Automações e Workflows',
      'Sequências de E-mail Marketing',
      'Lembretes de agendamento',
      'Voicemail automático',
      'App mobile com vídeo-mensagens',
      'Snippets de texto reutilizáveis',
    ],
  },
  {
    id: 'vender',
    label: 'Vender',
    icon: FiDollarSign,
    title: 'Feche negócios com menos atrito.',
    description:
      'Remova fricção e transforme conversas em clientes pagantes — sem ferramenta extra.',
    features: [
      'Lead Scoring inteligente',
      'Propostas e Orçamentos',
      'Faturamento e cobrança recorrente',
      'Integração com gateways (Asaas, Stripe)',
      'Calendários pagos',
      'Order Forms com upsell e downsell',
      'Área de membros e cursos pagos',
      'Text-2-Pay (cobrança por SMS)',
    ],
  },
  {
    id: 'fidelizar',
    label: 'Fidelizar',
    icon: FiStar,
    title: 'Crie fãs, não apenas clientes.',
    description:
      'Tudo o que você precisa para transformar clientes felizes em avaliações, indicações e buzz.',
    features: [
      'Gestão de reputação',
      'Solicitação automática de reviews',
      'Programa de afiliados e indicações',
      'Widgets de review no site',
      'Captura de depoimentos em vídeo',
      'IA para responder reviews',
      'Comunidades privadas',
      'Programas de fidelidade',
    ],
  },
  {
    id: 'reativar',
    label: 'Reativar',
    icon: FiRefreshCw,
    title: 'Volte ao radar deles.',
    description:
      'Reengaje leads e clientes antigos com mensagens certeiras que geram vendas recorrentes.',
    features: [
      'Campanhas em massa (E-mail, SMS, WhatsApp)',
      'Listas inteligentes e segmentação',
      'Automação de aniversário',
      'Campanhas sazonais',
      'Templates de reativação validados',
      'Newsletters automatizadas',
      'IA para criação de conteúdo',
      'Programa de loyalty',
    ],
  },
]

const ROTATION_MS = 7000

const Features = () => {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const stage = stages[active]

  // Auto-rotate when section is in view and not paused
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % stages.length)
    }, ROTATION_MS)
    return () => clearInterval(id)
  }, [paused, active])

  const handleTabClick = (idx) => {
    setActive(idx)
    setPaused(true)
  }

  return (
    <section className="relative bg-white text-gray-900 overflow-hidden">
      <div className="relative container mx-auto px-6 py-20 md:py-32 max-w-6xl">
        <Reveal className="flex items-center gap-3 mb-12">
          <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-gray-400">
            02 — Como funciona
          </span>
          <span className="flex-1 h-px bg-gray-200" />
        </Reveal>

        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <Reveal as="h2" delay={0.1} className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] max-w-3xl text-gray-900">
            Uma plataforma. Todo o ciclo de{' '}
            <em className="text-gradient not-italic">vendas</em> coberto.
          </Reveal>
          <Reveal as="p" delay={0.2} className="text-gray-500 max-w-md text-lg">
            Da primeira impressão à recompra. Sem juntar 8 ferramentas
            diferentes, sem pagar 8 assinaturas separadas.
          </Reveal>
        </div>

        {/* Tab nav */}
        <div className="relative border-y border-gray-200 mb-10">
          <div className="flex overflow-x-auto scrollbar-hide">
            {stages.map((s, idx) => {
              const TabIcon = s.icon
              const isActive = idx === active
              return (
                <button
                  key={s.id}
                  onClick={() => handleTabClick(idx)}
                  className={`relative flex-1 min-w-[120px] flex flex-col items-center gap-2 py-5 px-4 transition-colors ${
                    isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  <span className="font-mono-tech text-xs uppercase tracking-[0.2em]">
                    0{idx + 1} {s.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-gray-100 overflow-hidden">
                      <motion.span
                        key={`${active}-${paused}`}
                        initial={{ width: '0%' }}
                        animate={{ width: paused ? '100%' : '100%' }}
                        transition={{
                          duration: paused ? 0.3 : ROTATION_MS / 1000,
                          ease: 'linear',
                        }}
                        className="block h-full bg-gradient-to-r from-roxo to-azul"
                      />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Active panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">
                Estágio 0{active + 1} · {stage.label}
              </div>
              <h3 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] mb-5 text-gray-900">
                {stage.title}
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                {stage.description}
              </p>
              <Link
                to="/checkout"
                className="inline-flex items-center gap-2 text-gray-900 font-semibold border-b-2 border-gray-900 pb-1 hover:gap-3 transition-all"
              >
                Quero esse fluxo
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
              {stage.features.map((feat) => (
                <div
                  key={feat}
                  className="bg-white p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-roxo to-azul flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">
                      {feat}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Features
