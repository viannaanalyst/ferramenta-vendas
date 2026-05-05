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
    <section className="relative overflow-hidden bg-ink text-bone grain">
      {/* Mesh gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-mesh-dark opacity-90"
      />
      {/* Glow accents */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-roxo/30 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-azul/25 blur-[140px]"
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 max-w-6xl">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="h-px w-8 bg-bone/30" />
          <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-bone/60">
            CRM · Automação · IA
          </span>
          <span className="h-px w-8 bg-bone/30" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-center max-w-5xl mx-auto"
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
          className="text-center text-bone/70 text-lg md:text-xl max-w-2xl mx-auto mt-8 leading-relaxed"
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
            className="group relative inline-flex items-center gap-3 bg-bone text-ink px-7 py-4 rounded-full font-semibold text-base shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_60px_-15px_rgba(106,17,203,0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_25px_80px_-15px_rgba(37,116,252,0.8)] transition-shadow"
          >
            Assinar agora
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#planos"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-full text-bone/70 hover:text-bone transition-colors font-medium"
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
          className="mt-16 flex items-center justify-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-bone/40"
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
    <div className="relative rounded-2xl border border-bone/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl overflow-hidden shadow-[0_50px_120px_-20px_rgba(106,17,203,0.4)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-bone/10 bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-bone/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-bone/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-bone/15" />
        <div className="ml-4 px-3 py-1 rounded-md bg-bone/[0.04] border border-bone/10">
          <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-bone/40">
            app.inovaweb.com.br/leads
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[180px_1fr] min-h-[480px]">
        {/* Sidebar */}
        <aside className="border-r border-bone/10 p-4 bg-white/[0.01]">
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-roxo-azul flex items-center justify-center">
              <span className="font-display text-bone text-sm">i</span>
            </div>
            <span className="font-display text-bone text-base">InovaWeb</span>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs ${
                    item.active
                      ? 'bg-gradient-to-r from-roxo/30 to-azul/20 text-bone border border-bone/10'
                      : 'text-bone/50'
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
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-bone/40 mb-1">
                CRM · Pipeline de vendas
              </div>
              <h4 className="font-display text-bone text-2xl">Leads</h4>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg border border-bone/10 bg-white/[0.02] p-0.5">
                <button className="px-2.5 py-1 rounded-md bg-white/[0.06] font-mono-tech text-[9px] uppercase tracking-[0.18em] text-bone">
                  Kanban
                </button>
                <button className="px-2.5 py-1 font-mono-tech text-[9px] uppercase tracking-[0.18em] text-bone/40">
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
                className="rounded-xl border border-bone/10 bg-white/[0.02] p-2.5 flex flex-col"
              >
                {/* col header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${col.dot}`}
                    />
                    <span className="font-mono-tech text-[9px] uppercase tracking-[0.18em] text-bone/70">
                      {col.title}
                    </span>
                    <span className="font-mono-tech text-[9px] text-bone/40">
                      {col.count}
                    </span>
                  </div>
                </div>
                <div className="font-mono-tech text-[9px] text-bone/30 px-1 mb-2">
                  {col.total}
                </div>

                {/* cards */}
                <div className="space-y-2">
                  {col.cards.map((c, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-bone/10 bg-ink/40 hover:bg-white/[0.04] transition-colors cursor-grab"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-roxo to-azul flex items-center justify-center text-bone text-[8px] font-semibold flex-shrink-0">
                          {c.name
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <div className="text-bone text-[11px] font-medium truncate">
                          {c.name}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-[8.5px] uppercase tracking-[0.15em] text-bone/40">
                          {c.source}
                        </span>
                        <span
                          className={`font-mono-tech text-[9px] font-semibold ${
                            c.score >= 90
                              ? 'text-emerald-400'
                              : c.score >= 70
                                ? 'text-bone/70'
                                : 'text-bone/40'
                          }`}
                        >
                          {c.score}
                        </span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-bone/5 text-bone/85 text-[11px] font-semibold">
                        {c.value}
                      </div>
                    </div>
                  ))}
                  {/* Add card placeholder */}
                  <button className="w-full py-2 rounded-lg border border-dashed border-bone/10 font-mono-tech text-[9px] uppercase tracking-[0.18em] text-bone/30 hover:text-bone/60 hover:border-bone/30 transition-colors">
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
