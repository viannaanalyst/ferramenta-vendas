import { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiCopy, FiArrowLeft, FiClock, FiX } from 'react-icons/fi'
import { formatBRL } from '../lib/products'

const POLL_INTERVAL = 5000
const POLL_MAX = 36 // 3 minutos

const Success = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const pollRef = useRef(null)
  const pollCount = useRef(0)

  useEffect(() => {
    if (!state) navigate('/', { replace: true })
  }, [state, navigate])

  // Polling — só para Pix
  useEffect(() => {
    if (!state || state.method !== 'PIX' || !state.charges?.[0]) return

    const paymentId = state.charges[0].paymentId || state.charges[0].id
    if (!paymentId) return

    const check = async () => {
      try {
        const res = await fetch(`/api/payment-status?id=${paymentId}`)
        const data = await res.json()
        if (data.status === 'CONFIRMED' || data.status === 'RECEIVED') {
          setConfirmed(true)
          clearInterval(pollRef.current)
        }
      } catch {
        // silently ignore
      }
      pollCount.current += 1
      if (pollCount.current >= POLL_MAX) clearInterval(pollRef.current)
    }

    pollRef.current = setInterval(check, POLL_INTERVAL)
    return () => clearInterval(pollRef.current)
  }, [state])

  if (!state) return null

  const { method, total, pix, boleto, charges } = state

  const copyPix = async () => {
    if (!pix?.payload) return
    await navigator.clipboard.writeText(pix.payload)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <div aria-hidden className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-roxo/8 blur-[140px]" />

      <header className="relative z-10 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 max-w-4xl flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors text-sm">
            <FiArrowLeft className="w-4 h-4" />
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em]">Início</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-roxo-azul flex items-center justify-center">
              <span className="font-display text-white text-sm">i</span>
            </div>
            <span className="font-display text-gray-800 text-base">
              InovaWeb <span className="text-gray-400">CRM</span>
            </span>
          </div>
          <span />
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-16 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-roxo-azul mb-6">
            <FiCheck className="w-7 h-7 text-white" />
          </div>
          <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">Pedido recebido</div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-gray-900">
            {method === 'PIX' ? <>Falta só o <em className="text-gradient not-italic">Pix</em>.</> :
             method === 'BOLETO' ? <>Seu <em className="text-gradient not-italic">boleto</em> está pronto.</> :
             <>Pagamento <em className="text-gradient not-italic">processando</em>.</>}
          </h1>
        </motion.div>

        {/* PIX */}
        {method === 'PIX' && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
            {pix ? (
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
                <div className="flex justify-center">
                  {pix.qrCodeBase64 ? (
                    <img src={`data:image/png;base64,${pix.qrCodeBase64}`} alt="QR Code Pix" className="w-48 h-48 rounded-xl border border-gray-200 bg-white p-2" />
                  ) : (
                    <div className="w-48 h-48 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 text-xs text-center px-4">QR Code em geração…</div>
                  )}
                </div>
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-2">Total · Pix</div>
                  <div className="font-display text-4xl text-gradient mb-6">{formatBRL(total)}</div>
                  {pix.payload && (
                    <>
                      <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">Copia e cola</div>
                      <div className="rounded-lg border border-gray-200 bg-white p-3 mb-3">
                        <code className="text-gray-600 text-[11px] break-all font-mono-tech">{pix.payload}</code>
                      </div>
                      <button onClick={copyPix} className="inline-flex items-center gap-2 bg-gradient-to-r from-roxo to-azul text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
                        <FiCopy className="w-3.5 h-3.5" />
                        {copied ? 'Copiado!' : 'Copiar código'}
                      </button>
                    </>
                  )}
                  <p className="mt-6 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-gray-400 flex items-center gap-2">
                    <FiClock className="w-3 h-3" />
                    Expira em 30 minutos
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-2">Total · Pix</div>
                <div className="font-display text-4xl text-gradient mb-4">{formatBRL(total)}</div>
                <p className="text-gray-500 text-sm">Seu pedido foi criado. Acesse o painel do Asaas para confirmar o pagamento em sandbox.</p>
              </div>
            )}
          </div>
        )}

        {/* BOLETO */}
        {method === 'BOLETO' && boleto && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-2">Total · Boleto</div>
            <div className="font-display text-4xl text-gradient mb-6">{formatBRL(total)}</div>
            <a href={boleto.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-roxo to-azul text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
              Abrir boleto
            </a>
            <p className="mt-6 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-gray-400">Compensação em 1 a 3 dias úteis</p>
          </div>
        )}

        {/* CARTÃO */}
        {method === 'CREDIT_CARD' && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-2">Total cobrado</div>
            <div className="font-display text-4xl text-gradient mb-3">{formatBRL(total)}</div>
            <p className="text-gray-500 max-w-md mx-auto">Pagamento processado com sucesso. Nossa equipe entrará em contato em até 1 hora pelo WhatsApp cadastrado.</p>
          </div>
        )}

        {charges?.length > 0 && (
          <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">Detalhes do pedido</div>
            <ul className="space-y-2">
              {charges.map((c, i) => (
                <li key={i} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2 last:border-0">
                  <span className="text-gray-600">{c.description}</span>
                  <span className="text-gray-900 font-semibold">{formatBRL(c.value)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-12 text-center font-mono-tech text-[10px] uppercase tracking-[0.18em] text-gray-400">
          Dúvidas? Fale conosco no WhatsApp · Suporte 7 dias por semana
        </p>
      </main>

      {/* Modal de confirmação do Pix */}
      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-md w-full p-10 text-center"
            >
              <button
                onClick={() => setConfirmed(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-6">
                <FiCheck className="w-8 h-8 text-emerald-500" />
              </div>

              <h2 className="font-display text-3xl text-gray-900 mb-3">
                Pagamento <em className="text-gradient not-italic">confirmado!</em>
              </h2>

              <p className="text-gray-500 leading-relaxed mb-8">
                Nossa equipe entrará em contato em até <strong className="text-gray-800">1 hora</strong> pelo WhatsApp cadastrado para liberar seu acesso.
              </p>

              <button
                onClick={() => setConfirmed(false)}
                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-roxo to-azul text-white px-6 py-3.5 rounded-full font-semibold text-base hover:opacity-90 transition-opacity"
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Success
