import { motion } from 'framer-motion'
import { FiCheck, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Reveal from '../Reveal'
import {
  SiHubspot,
  SiSalesforce,
  SiClickup,
  SiWix,
  SiWebflow,
  SiTypeform,
  SiMailchimp,
  SiTwilio,
  SiGooglecalendar,
  SiZapier,
  SiMake,
  SiN8N,
  SiGoogleanalytics,
  SiHotjar,
  SiDiscord,
  SiSlack,
} from 'react-icons/si'

const Logo = ({ Icon, color, name }) =>
  Icon ? (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/[0.04] border border-bone/10"
      title={name}
    >
      <Icon className="w-3.5 h-3.5" style={{ color }} />
    </span>
  ) : (
    <span
      className="inline-flex items-center px-2.5 h-7 rounded-md bg-white/[0.04] border border-bone/10 font-mono-tech text-[10px] uppercase tracking-[0.15em] text-bone/60"
      title={name}
    >
      {name}
    </span>
  )

const comparisonData = [
  {
    functionality: 'CRM e Pipeline',
    logos: [
      { Icon: SiHubspot, color: '#FF7A59', name: 'HubSpot' },
      { Icon: SiSalesforce, color: '#00A1E0', name: 'Salesforce' },
    ],
    cost: 500,
  },
  {
    functionality: 'Funil de vendas',
    logos: [
      { Icon: SiClickup, color: '#7B68EE', name: 'ClickUp' },
      { Icon: null, name: 'ClickFunnels' },
      { Icon: null, name: 'Leadpages' },
    ],
    cost: 1500,
  },
  {
    functionality: 'Construtor de site',
    logos: [
      { Icon: SiWix, color: '#0C6EFC', name: 'Wix' },
      { Icon: SiWebflow, color: '#4353FF', name: 'Webflow' },
    ],
    cost: 100,
  },
  {
    functionality: 'Pesquisa e Formulários',
    logos: [
      { Icon: SiTypeform, color: '#FFFFFF', name: 'Typeform' },
      { Icon: null, name: 'Jotform' },
    ],
    cost: 250,
  },
  {
    functionality: 'E-mail Marketing',
    logos: [
      { Icon: SiMailchimp, color: '#FFE01B', name: 'Mailchimp' },
      { Icon: SiHubspot, color: '#FF7A59', name: 'HubSpot' },
    ],
    cost: 500,
  },
  {
    functionality: 'Chat e SMS',
    logos: [
      { Icon: SiTwilio, color: '#F22F46', name: 'Twilio' },
    ],
    cost: 500,
  },
  {
    functionality: 'Agendamentos',
    logos: [
      { Icon: SiGooglecalendar, color: '#4285F4', name: 'Google Calendar' },
    ],
    cost: 150,
  },
  {
    functionality: 'Automações',
    logos: [
      { Icon: SiZapier, color: '#FF4F00', name: 'Zapier' },
      { Icon: SiMake, color: '#6D00CC', name: 'Make' },
      { Icon: SiN8N, color: '#EA4B71', name: 'n8n' },
    ],
    cost: 500,
  },
  {
    functionality: 'Cursos e produtos',
    logos: [
      { Icon: null, name: 'Hotmart' },
      { Icon: null, name: 'Kiwify' },
      { Icon: null, name: 'Teachable' },
    ],
    cost: 'Taxa',
  },
  {
    functionality: 'Analytics e Tracking',
    logos: [
      { Icon: SiGoogleanalytics, color: '#E37400', name: 'Google Analytics' },
      { Icon: SiHotjar, color: '#FD3A5C', name: 'Hotjar' },
    ],
    cost: 250,
  },
  {
    functionality: 'Comunidade',
    logos: [
      { Icon: SiDiscord, color: '#5865F2', name: 'Discord' },
      { Icon: SiSlack, color: '#4A154B', name: 'Slack' },
    ],
    cost: 500,
  },
  {
    functionality: 'Assinatura de documento',
    logos: [
      { Icon: null, name: 'DocuSign' },
      { Icon: null, name: 'ZapSign' },
      { Icon: null, name: 'Clicksign' },
    ],
    cost: 100,
  },
]

const total = 5350
const inovawebPrice = 147

const fmt = (v) =>
  typeof v === 'number' ? `R$ ${v.toLocaleString('pt-BR')}/mês` : v

const Comparison = () => {
  return (
    <section className="relative bg-ink text-bone overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark opacity-30" aria-hidden />

      <div className="relative container mx-auto px-6 py-20 md:py-28 max-w-6xl">
        <Reveal className="flex items-center gap-3 mb-12">
          <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-bone/50">
            03 — O que você substitui
          </span>
          <span className="flex-1 h-px bg-bone/15" />
        </Reveal>

        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <Reveal as="h2" delay={0.1} className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] max-w-3xl">
            Pare de pagar{' '}
            <em className="text-gradient not-italic">12 ferramentas</em> quando
            uma só faz tudo.
          </Reveal>
          <Reveal as="p" delay={0.2} className="text-bone/60 max-w-sm text-lg">
            Compare lado a lado. A conta no fim do mês fala por si.
          </Reveal>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-bone/10 overflow-hidden bg-white/[0.02] backdrop-blur-sm">
          <div className="grid grid-cols-[1.5fr_1.6fr_1fr_1fr] gap-px bg-bone/10 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-bone/50">
            <div className="bg-ink px-6 py-4">Funcionalidade</div>
            <div className="bg-ink px-6 py-4">Substitui</div>
            <div className="bg-ink px-6 py-4 text-right">Custo</div>
            <div className="bg-ink px-6 py-4 text-center">InovaWeb</div>
          </div>
          <div className="divide-y divide-bone/5">
            {comparisonData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="grid grid-cols-[1.5fr_1.6fr_1fr_1fr] hover:bg-white/[0.02] transition-colors"
              >
                <div className="px-6 py-4 text-bone font-medium text-sm self-center">
                  {item.functionality}
                </div>
                <div className="px-6 py-4 self-center">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.logos.map((logo, i) => (
                      <Logo key={i} {...logo} />
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 text-right text-bone/40 text-sm font-mono-tech line-through self-center">
                  {fmt(item.cost)}
                </div>
                <div className="px-6 py-4 flex items-center justify-center">
                  <span className="w-6 h-6 rounded-full bg-gradient-roxo-azul flex items-center justify-center">
                    <FiCheck className="w-3.5 h-3.5 text-bone" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total */}
          <div className="grid grid-cols-[1.5fr_1.6fr_1fr_1fr] border-t border-bone/10 bg-gradient-to-r from-roxo/10 to-azul/10">
            <div className="px-6 py-6 font-display text-bone text-xl">Total</div>
            <div className="px-6 py-6 text-bone/60 text-sm self-center">
              Você economiza R$ {(total - inovawebPrice).toLocaleString('pt-BR')} por mês.
            </div>
            <div className="px-6 py-6 text-right text-bone/40 line-through self-center font-mono-tech text-sm">
              R$ {total.toLocaleString('pt-BR')}/mês
            </div>
            <div className="px-6 py-6 text-center self-center">
              <span className="font-display text-2xl text-gradient">
                R$ {inovawebPrice}
              </span>
              <span className="font-mono-tech text-[10px] text-bone/50 ml-1">
                /mês
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Reveal delay={0.2} className="mt-12 text-center">
          <Link
            to="/checkout"
            className="inline-flex items-center gap-3 bg-bone text-ink px-7 py-4 rounded-full font-semibold text-base shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_60px_-15px_rgba(106,17,203,0.6)] hover:shadow-[0_25px_80px_-15px_rgba(37,116,252,0.8)] transition-shadow"
          >
            Quero economizar agora
            <FiArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default Comparison
