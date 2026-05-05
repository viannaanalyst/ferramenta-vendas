import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowLeft,
  FiArrowRight,
  FiLock,
  FiCheck,
  FiShield,
  FiCreditCard,
} from 'react-icons/fi'
import { PRODUCTS, formatBRL } from '../lib/products'
import {
  isValidCPF,
  isValidEmail,
  isValidPhone,
  formatCPF,
  formatPhone,
  onlyDigits,
} from '../lib/validators'

const PaymentTab = ({ value, current, onClick, label, icon: Icon }) => {
  const active = current === value
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      aria-pressed={active}
      className={`relative flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg border transition-all ${
        active
          ? 'border-roxo/30 bg-gradient-to-br from-roxo/10 to-azul/5 text-roxo shadow-[0_0_0_1.5px_rgba(106,17,203,0.2)]'
          : 'border-gray-200 bg-white text-gray-400 hover:text-gray-600 hover:border-gray-300'
      }`}
    >
      {active && (
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
      )}
      <Icon className="w-4 h-4" />
      <span className={`font-mono-tech text-[11px] uppercase tracking-[0.18em] ${active ? 'font-semibold' : ''}`}>
        {label}
      </span>
    </button>
  )
}

const Checkout = () => {
  const navigate = useNavigate()

  // upsells (selected)
  const [upsells, setUpsells] = useState({ support: false, setup: false })

  // form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')

  // payment
  const [method, setMethod] = useState('PIX')
  const [card, setCard] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: '',
  })

  // submission
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const total = useMemo(() => {
    let sum = PRODUCTS.main.price
    if (upsells.support) sum += PRODUCTS.support.price
    if (upsells.setup) sum += PRODUCTS.setup.price
    return sum
  }, [upsells])

  const monthlyTotal = useMemo(() => {
    let sum = PRODUCTS.main.price
    if (upsells.support) sum += PRODUCTS.support.price
    return sum
  }, [upsells])

  const validate = () => {
    if (!name.trim() || name.trim().split(' ').length < 2)
      return 'Informe seu nome completo.'
    if (!isValidEmail(email)) return 'E-mail inválido.'
    if (!isValidCPF(cpf)) return 'CPF inválido.'
    if (!isValidPhone(phone)) return 'WhatsApp inválido.'
    if (method === 'CREDIT_CARD') {
      if (onlyDigits(card.number).length < 13)
        return 'Número do cartão inválido.'
      if (!card.holder.trim()) return 'Nome no cartão é obrigatório.'
      if (!/^\d{2}\/\d{2}$/.test(card.expiry))
        return 'Validade no formato MM/AA.'
      if (!/^\d{3,4}$/.test(card.cvv)) return 'CVV inválido.'
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const err = validate()
    if (err) {
      setError(err)
      return
    }

    setLoading(true)

    try {
      const payload = {
        customer: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          cpf: onlyDigits(cpf),
          phone: onlyDigits(phone),
        },
        products: ['main', upsells.support && 'support', upsells.setup && 'setup'].filter(Boolean),
        billing: {
          method,
          card:
            method === 'CREDIT_CARD'
              ? {
                  number: onlyDigits(card.number),
                  holder: card.holder.trim(),
                  expiry: card.expiry,
                  cvv: card.cvv,
                }
              : undefined,
        },
      }

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Falha ao criar cobrança.')

      // navigate to success with payment data
      navigate('/sucesso', { state: data })
    } catch (err) {
      setError(err.message || 'Erro ao processar pagamento.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* atmosphere */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-roxo/8 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-azul/8 blur-[140px]"
      />

      {/* top bar */}
      <header className="relative z-10 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 max-w-6xl flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors text-sm"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em]">
              Voltar
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-roxo-azul flex items-center justify-center">
              <span className="font-display text-white text-sm">i</span>
            </div>
            <span className="font-display text-gray-800 text-base">
              InovaWeb <span className="text-gray-400">CRM</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FiLock className="w-3.5 h-3.5" />
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em]">
              Pagamento seguro
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">
            Checkout · Plano Ilimitado
          </div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
            Falta pouco. <em className="text-gradient not-italic">Bem pouco.</em>
          </h1>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_400px] gap-10">
          {/* LEFT — form */}
          <div className="space-y-10">
            {/* identidade */}
            <section>
              <SectionHeader number="01" title="Seus dados" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Nome completo"
                  value={name}
                  onChange={(v) => setName(v)}
                  placeholder="Como aparece no documento"
                  className="sm:col-span-2"
                />
                <Field
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={(v) => setEmail(v)}
                  placeholder="voce@email.com"
                  className="sm:col-span-2"
                />
                <Field
                  label="CPF"
                  value={cpf}
                  onChange={(v) => setCpf(formatCPF(v))}
                  placeholder="000.000.000-00"
                  inputMode="numeric"
                />
                <Field
                  label="WhatsApp"
                  value={phone}
                  onChange={(v) => setPhone(formatPhone(v))}
                  placeholder="(11) 90000-0000"
                  inputMode="numeric"
                />
              </div>
            </section>

            {/* adicionais */}
            <section>
              <SectionHeader number="02" title="Adicionais (opcionais)" />
              <div className="space-y-3">
                <UpsellRow
                  product={PRODUCTS.support}
                  checked={upsells.support}
                  onToggle={() =>
                    setUpsells((u) => ({ ...u, support: !u.support }))
                  }
                  recurring
                />
                <UpsellRow
                  product={PRODUCTS.setup}
                  checked={upsells.setup}
                  onToggle={() =>
                    setUpsells((u) => ({ ...u, setup: !u.setup }))
                  }
                />
              </div>
            </section>

            {/* pagamento */}
            <section>
              <SectionHeader number="03" title="Pagamento" />

              <div className="flex gap-2 mb-5">
                <PaymentTab
                  value="PIX"
                  current={method}
                  onClick={setMethod}
                  label="Pix"
                  icon={FiCheck}
                />
                <PaymentTab
                  value="CREDIT_CARD"
                  current={method}
                  onClick={setMethod}
                  label="Cartão"
                  icon={FiCreditCard}
                />
                <PaymentTab
                  value="BOLETO"
                  current={method}
                  onClick={setMethod}
                  label="Boleto"
                  icon={FiShield}
                />
              </div>

              {method === 'PIX' && (
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-gray-400 leading-relaxed">
                  · Geramos o QR Code na próxima tela · Aprovação imediata · Acesso liberado em minutos
                </p>
              )}

              {method === 'BOLETO' && (
                <p className="font-mono-tech text-[11px] uppercase tracking-[0.18em] text-gray-400 leading-relaxed">
                  · Boleto bancário · Compensação em 1 a 3 dias úteis · Acesso liberado após confirmação
                </p>
              )}

              {method === 'CREDIT_CARD' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Número do cartão"
                    value={card.number}
                    onChange={(v) =>
                      setCard((c) => ({
                        ...c,
                        number: onlyDigits(v)
                          .slice(0, 16)
                          .replace(/(\d{4})(?=\d)/g, '$1 '),
                      }))
                    }
                    placeholder="0000 0000 0000 0000"
                    inputMode="numeric"
                    className="sm:col-span-2"
                  />
                  <Field
                    label="Nome impresso no cartão"
                    value={card.holder}
                    onChange={(v) =>
                      setCard((c) => ({ ...c, holder: v.toUpperCase() }))
                    }
                    placeholder="NOME COMO ESTÁ NO CARTÃO"
                    className="sm:col-span-2"
                  />
                  <Field
                    label="Validade"
                    value={card.expiry}
                    onChange={(v) => {
                      const d = onlyDigits(v).slice(0, 4)
                      setCard((c) => ({
                        ...c,
                        expiry:
                          d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d,
                      }))
                    }}
                    placeholder="MM/AA"
                    inputMode="numeric"
                  />
                  <Field
                    label="CVV"
                    value={card.cvv}
                    onChange={(v) =>
                      setCard((c) => ({ ...c, cvv: onlyDigits(v).slice(0, 4) }))
                    }
                    placeholder="000"
                    inputMode="numeric"
                  />
                </div>
              )}
            </section>
          </div>

          {/* RIGHT — order summary */}
          <aside className="lg:sticky lg:top-6 self-start">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-5">
                Resumo do pedido
              </div>

              <SummaryLine
                title={PRODUCTS.main.name}
                subtitle="Recorrente · mensal"
                price={PRODUCTS.main.price}
              />
              {upsells.support && (
                <SummaryLine
                  title={PRODUCTS.support.name}
                  subtitle="Recorrente · mensal"
                  price={PRODUCTS.support.price}
                />
              )}
              {upsells.setup && (
                <SummaryLine
                  title={PRODUCTS.setup.name}
                  subtitle="Pagamento único"
                  price={PRODUCTS.setup.price}
                />
              )}

              <div className="border-t border-gray-200 mt-5 pt-5 space-y-3">
                {upsells.setup && (
                  <Row label="Total hoje">
                    {formatBRL(total)}
                  </Row>
                )}
                <Row label={upsells.setup ? 'A partir do 2º mês' : 'Total mensal'}>
                  <span className="font-display text-2xl text-gradient">
                    {formatBRL(monthlyTotal)}
                  </span>
                  <span className="font-mono-tech text-[10px] text-gray-400 ml-1">
                    /mês
                  </span>
                </Row>
              </div>

              {error && (
                <div className="mt-4 p-3 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-roxo/80 to-azul/80 text-bone px-6 py-3.5 rounded-lg font-semibold text-base hover:from-roxo hover:to-azul transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? 'Processando…'
                  : method === 'PIX'
                    ? 'Gerar QR Code Pix'
                    : method === 'BOLETO'
                      ? 'Gerar boleto'
                      : 'Pagar com cartão'}
                <FiArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.18em] text-gray-400">
                <FiLock className="w-3 h-3" />
                Pagamento processado pela Asaas
              </div>

              <div className="mt-3 text-center font-mono-tech text-[10px] uppercase tracking-[0.18em] text-gray-400">
                Sem fidelidade · Cancele quando quiser
              </div>
            </div>
          </aside>
        </form>
      </main>
    </div>
  )
}

const SectionHeader = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="font-mono-tech text-xs uppercase tracking-[0.25em] text-gray-400">
      {number} — {title}
    </span>
    <span className="flex-1 h-px bg-gray-200" />
  </div>
)

const Field = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  className = '',
  inputMode,
}) => (
  <label className={`block ${className}`}>
    <span className="block font-mono-tech text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2">
      {label}
    </span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      autoComplete="off"
      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-roxo/40 focus:ring-2 focus:ring-roxo/10 transition-colors"
    />
  </label>
)

const UpsellRow = ({ product, checked, onToggle, recurring }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`w-full text-left rounded-xl border p-4 flex items-start gap-4 transition-all ${
      checked
        ? 'border-roxo/30 bg-gradient-to-br from-roxo/5 to-azul/5'
        : 'border-gray-200 bg-white hover:border-gray-300'
    }`}
  >
    <div
      className={`mt-1 w-5 h-5 rounded-md border flex-shrink-0 flex items-center justify-center transition-all ${
        checked
          ? 'border-transparent bg-gradient-roxo-azul'
          : 'border-gray-300'
      }`}
    >
      {checked && <FiCheck className="w-3 h-3 text-white" />}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <span className="font-display text-gray-900 text-lg">{product.name}</span>
        <span className="font-mono-tech text-gray-700 text-sm">
          {formatBRL(product.price)}
          {recurring && (
            <span className="text-gray-400 text-[10px] uppercase tracking-[0.18em] ml-1">
              /mês
            </span>
          )}
        </span>
      </div>
      <p className="text-gray-500 text-sm mt-1">{product.description}</p>
    </div>
  </button>
)

const SummaryLine = ({ title, subtitle, price }) => (
  <div className="flex items-start justify-between gap-3 py-2">
    <div className="min-w-0">
      <div className="text-gray-800 text-sm font-medium">{title}</div>
      <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-gray-400 mt-0.5">
        {subtitle}
      </div>
    </div>
    <div className="text-gray-700 text-sm font-semibold whitespace-nowrap">
      {formatBRL(price)}
    </div>
  </div>
)

const Row = ({ label, children }) => (
  <div className="flex items-baseline justify-between">
    <span className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-gray-400">
      {label}
    </span>
    <span className="text-gray-900">{children}</span>
  </div>
)

export default Checkout
