import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheck, FiCopy, FiArrowLeft, FiClock } from 'react-icons/fi'
import { formatBRL } from '../lib/products'

const Success = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!state) navigate('/', { replace: true })
  }, [state, navigate])

  if (!state) return null

  const { method, total, pix, boleto, charges } = state

  const copyPix = async () => {
    if (!pix?.payload) return
    await navigator.clipboard.writeText(pix.payload)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-ink text-bone relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark opacity-30" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-roxo/20 blur-[140px]"
      />

      <header className="relative z-10 border-b border-bone/10 backdrop-blur-md bg-ink/50">
        <div className="container mx-auto px-6 py-4 max-w-4xl flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-bone/60 hover:text-bone transition-colors text-sm"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em]">
              Início
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-roxo-azul flex items-center justify-center">
              <span className="font-display text-bone text-sm">i</span>
            </div>
            <span className="font-display text-bone text-base">
              InovaWeb <span className="text-bone/40">CRM</span>
            </span>
          </div>
          <span />
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-roxo-azul mb-6">
            <FiCheck className="w-7 h-7 text-bone" />
          </div>
          <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-bone/50 mb-3">
            Pedido recebido
          </div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
            {method === 'PIX' ? (
              <>
                Falta só o <em className="text-gradient not-italic">Pix</em>.
              </>
            ) : method === 'BOLETO' ? (
              <>
                Seu <em className="text-gradient not-italic">boleto</em> está pronto.
              </>
            ) : (
              <>
                Pagamento <em className="text-gradient not-italic">processando</em>.
              </>
            )}
          </h1>
        </motion.div>

        {/* PIX */}
        {method === 'PIX' && pix && (
          <div className="rounded-2xl border border-bone/10 bg-white/[0.02] backdrop-blur-md p-8">
            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
              <div className="flex justify-center">
                {pix.qrCodeBase64 ? (
                  <img
                    src={`data:image/png;base64,${pix.qrCodeBase64}`}
                    alt="QR Code Pix"
                    className="w-48 h-48 rounded-xl border border-bone/10 bg-white p-2"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-xl border border-bone/10 bg-white/5 flex items-center justify-center text-bone/40 text-xs text-center px-4">
                    QR Code em geração…
                  </div>
                )}
              </div>
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-bone/50 mb-2">
                  Total · Pix
                </div>
                <div className="font-display text-4xl text-gradient mb-6">
                  {formatBRL(total)}
                </div>

                <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-bone/50 mb-2">
                  Copia e cola
                </div>
                <div className="rounded-lg border border-bone/10 bg-ink/40 p-3 mb-3">
                  <code className="text-bone/70 text-[11px] break-all font-mono-tech">
                    {pix.payload}
                  </code>
                </div>
                <button
                  onClick={copyPix}
                  className="inline-flex items-center gap-2 bg-bone text-ink px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-white transition-colors"
                >
                  <FiCopy className="w-3.5 h-3.5" />
                  {copied ? 'Copiado!' : 'Copiar código'}
                </button>

                <p className="mt-6 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-bone/40 flex items-center gap-2">
                  <FiClock className="w-3 h-3" />
                  Expira em 30 minutos
                </p>
              </div>
            </div>
          </div>
        )}

        {/* BOLETO */}
        {method === 'BOLETO' && boleto && (
          <div className="rounded-2xl border border-bone/10 bg-white/[0.02] backdrop-blur-md p-8 text-center">
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-bone/50 mb-2">
              Total · Boleto
            </div>
            <div className="font-display text-4xl text-gradient mb-6">
              {formatBRL(total)}
            </div>
            <a
              href={boleto.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-bone text-ink px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white transition-colors"
            >
              Abrir boleto
            </a>
            <p className="mt-6 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-bone/40">
              Compensação em 1 a 3 dias úteis
            </p>
          </div>
        )}

        {/* CARTÃO */}
        {method === 'CREDIT_CARD' && (
          <div className="rounded-2xl border border-bone/10 bg-white/[0.02] backdrop-blur-md p-8 text-center">
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-bone/50 mb-2">
              Total cobrado
            </div>
            <div className="font-display text-4xl text-gradient mb-3">
              {formatBRL(total)}
            </div>
            <p className="text-bone/60 max-w-md mx-auto">
              Pagamento processado com sucesso. Em breve você receberá um e-mail
              com os dados de acesso à plataforma.
            </p>
          </div>
        )}

        {charges?.length > 0 && (
          <div className="mt-10 rounded-2xl border border-bone/10 bg-white/[0.02] p-6">
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-bone/50 mb-4">
              Detalhes do pedido
            </div>
            <ul className="space-y-2">
              {charges.map((c, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between text-sm border-b border-bone/5 pb-2 last:border-0"
                >
                  <span className="text-bone/80">{c.description}</span>
                  <span className="text-bone font-semibold">
                    {formatBRL(c.value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-12 text-center font-mono-tech text-[10px] uppercase tracking-[0.18em] text-bone/40">
          Dúvidas? Fale conosco no WhatsApp · Suporte 7 dias por semana
        </p>
      </main>
    </div>
  )
}

export default Success
