import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiTrendingUp,
  FiUser,
  FiMessageCircle,
  FiCalendar,
  FiHome,
  FiPieChart,
  FiZap,
} from 'react-icons/fi'

const CHECKOUT_URL = '/checkout'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white text-gray-900">
      {/* Glow accents */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-roxo/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-azul/10 blur-[140px]"
      />

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 max-w-6xl">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="h-px w-8 bg-gray-300" />
          <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-gray-400">
            CRM · Automação · IA
          </span>
          <span className="h-px w-8 bg-bone/30" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-center max-w-5xl mx-auto text-gray-900"
        >
          A plataforma operacional que transforma{' '}
          <em className="text-gradient not-italic">leads em clientes</em>{' '}
          enquanto você dorme.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-center text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mt-8 leading-relaxed"
        >
          Funis, e-mail marketing, CRM, automações e Inteligência Artificial
          em uma só ferramenta. Pensada para escalar vendas sem ferramentas soltas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link
            to={CHECKOUT_URL}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-roxo to-azul text-white px-7 py-4 rounded-full font-semibold text-base shadow-[0_20px_60px_-15px_rgba(106,17,203,0.4)] hover:shadow-[0_25px_80px_-15px_rgba(37,116,252,0.6)] transition-shadow"
          >
            Assinar agora
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#planos"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-full text-gray-500 hover:text-gray-900 transition-colors font-medium"
          >
            Ver planos
            <span className="font-mono-tech text-xs">↓</span>
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-gray-400"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Plataforma ativa · Setup em minutos · Sem fidelidade
        </motion.div>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  )
}

const DashboardMockup = () => {
  const sidebarItems = [
    { icon: FiHome, label: 'Dashboard' },
    { icon: FiUser, label: 'Leads', active: true },
    { icon: FiTrendingUp, label: 'Pipeline' },
    { icon: FiMessageCircle, label: 'Conversas' },
    { icon: FiCalendar, label: 'Agenda' },
    { icon: FiPieChart, label: 'Relatórios' },
    { icon: FiZap, label: 'Automações' },
  ]

  const columns = [
    {
      title: 'Novos',
      count: 24,
      total: 'R$ 5.6k',
      dot: 'bg-azul',
      cards: [
        { name: 'Marina Costa', source: 'Instagram', value: 'R$ 2.400', score: 92 },
        { name: 'Rafael Souza', source: 'Google Ads', value: 'R$ 3.200', score: 64 },
      ],
    },
    {
      title: 'Contato',
      count: 18,
      total: 'R$ 12.1k',
      dot: 'bg-roxo',
      cards: [
        { name: 'Bruno Lopes', source: 'WhatsApp', value: 'R$ 4.900', score: 78 },
        { name: 'Patrícia Reis', source: 'E-mail', value: 'R$ 7.200', score: 81 },
      ],
    },
    {
      title: 'Negociação',
      count: 12,
      total: 'R$ 21.0k',
      dot: 'bg-amber-400',
      cards: [
        { name: 'Carla Mendes', source: 'E-mail', value: 'R$ 8.700', score: 88 },
        { name: 'Diego Santos', source: 'Indicação', value: 'R$ 12.300', score: 95 },
      ],
    },
    {
      title: 'Fechados',
      count: 8,
      total: 'R$ 14.3k',
      dot: 'bg-emerald-400',
      cards: [
        { name: 'Larissa Pinto', source: 'Funil', value: 'R$ 5.600', score: 100 },
        { name: 'Tiago Almeida', source: 'WhatsApp', value: 'R$ 8.700', score: 100 },
      ],
    },
  ]

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-[0_50px_120px_-20px_rgba(106,17,203,0.15)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
        <div className="ml-4 px-3 py-1 rounded-md bg-gray-100 border border-gray-200">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-gray-400">
            app.inovaweb.com.br/leads
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[180px_1fr] min-h-[480px]">
        {/* Sidebar */}
        <aside className="border-r border-gray-100 p-4 bg-gray-50">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-roxo-azul flex items-center justify-center">
              <span className="font-display text-white text-sm">i</span>
            </div>
            <span className="font-display text-gray-800 text-base">InovaWeb</span>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs ${
                    item.active
                      ? 'bg-gradient-to-r from-roxo/10 to-azul/10 text-roxo border border-roxo/20 font-semibold'
                      : 'text-gray-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </nav>
        </aside>

        {/* Main */}
        <div className="p-6">
          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                CRM · Pipeline de vendas
              </div>
              <h4 className="font-display text-gray-900 text-2xl">Leads</h4>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5">
                <button className="px-2.5 py-1 rounded-md bg-white shadow-sm font-mono-tech text-[9px] uppercase tracking-[0.18em] text-gray-700 border border-gray-200">
                  Kanban
                </button>
                <button className="px-2.5 py-1 font-mono-tech text-[9px] uppercase tracking-[0.18em] text-gray-400">
                  Lista
                </button>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-gradient-roxo-azul font-mono-tech text-[10px] uppercase tracking-[0.18em] text-bone">
                + Lead
              </button>
            </div>
          </div>

          {/* Kanban board */}
          <div className="grid grid-cols-4 gap-3">
            {columns.map((col) => (
              <div
                key={col.title}
                className="rounded-xl border border-gray-100 bg-gray-50 p-2.5 flex flex-col"
              >
                {/* col header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${col.dot}`}
                    />
                    <span className="font-mono-tech text-[9px] uppercase tracking-[0.18em] text-gray-600">
                      {col.title}
                    </span>
                    <span className="font-mono-tech text-[9px] text-gray-400">
                      {col.count}
                    </span>
                  </div>
                </div>
                <div className="font-mono-tech text-[9px] text-gray-400 px-1 mb-2">
                  {col.total}
                </div>

                {/* cards */}
                <div className="space-y-2">
                  {col.cards.map((c, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-grab shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-roxo to-azul flex items-center justify-center text-bone text-[8px] font-semibold flex-shrink-0">
                          {c.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <div className="text-gray-800 text-[11px] font-medium truncate">
                          {c.name}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-[8.5px] uppercase tracking-[0.15em] text-gray-400">
                          {c.source}
                        </span>
                        <span
                          className={`font-mono-tech text-[9px] font-semibold ${
                            c.score >= 90
                              ? 'text-emerald-500'
                              : c.score >= 70
                                ? 'text-gray-500'
                                : 'text-gray-400'
                          }`}
                        >
                          {c.score}
                        </span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100 text-gray-700 text-[11px] font-semibold">
                        {c.value}
                      </div>
                    </div>
                  ))}
                  {/* Add card placeholder */}
                  <button className="w-full py-2 rounded-lg border border-dashed border-gray-200 font-mono-tech text-[9px] uppercase tracking-[0.18em] text-gray-300 hover:text-gray-500 hover:border-gray-300 transition-colors">
                    + Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
