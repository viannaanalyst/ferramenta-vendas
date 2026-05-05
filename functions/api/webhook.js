/**
 * Asaas webhook receiver.
 *
 * Configure no painel Asaas:
 *   URL: https://vendas.inovawebtech.com.br/api/webhook
 *   Token: defina e salve em ASAAS_WEBHOOK_TOKEN (variável de ambiente)
 *
 * Asaas envia o token no header `asaas-access-token`.
 */

import { notifyDiscord, notifyEmail } from '../_lib/notify'

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

const BRL = (v) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const EVENT_LABELS = {
  PAYMENT_CONFIRMED: '✅ Pagamento confirmado',
  PAYMENT_RECEIVED: '✅ Pagamento recebido',
  PAYMENT_OVERDUE: '⚠️ Pagamento atrasado',
  PAYMENT_DELETED: '🗑️ Pagamento deletado',
  PAYMENT_REFUNDED: '↩️ Pagamento reembolsado',
  PAYMENT_CHARGEBACK_REQUESTED: '⚠️ Chargeback solicitado',
  PAYMENT_CREATED: '🛒 Cobrança criada',
}

export const onRequestPost = async ({ request, env }) => {
  // Auth check
  const token = request.headers.get('asaas-access-token')
  if (env.ASAAS_WEBHOOK_TOKEN && token !== env.ASAAS_WEBHOOK_TOKEN) {
    return json(401, { error: 'Token inválido.' })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'JSON inválido.' })
  }

  const event = body.event
  const payment = body.payment || {}

  console.log('Asaas webhook:', event, payment.id)

  const title = EVENT_LABELS[event] || `📩 ${event}`

  // Best-effort: enrich with customer info
  let customerName = 'Cliente'
  let customerEmail = '—'
  let customerPhone = '—'
  if (payment.customer) {
    try {
      const apiBase =
        env.ASAAS_ENV === 'production'
          ? 'https://api.asaas.com/v3'
          : 'https://api-sandbox.asaas.com/v3'
      const c = await fetch(`${apiBase}/customers/${payment.customer}`, {
        headers: { access_token: env.ASAAS_API_KEY },
      }).then((r) => r.json())
      customerName = c.name || customerName
      customerEmail = c.email || customerEmail
      customerPhone = c.mobilePhone || c.phone || customerPhone
    } catch (e) {
      console.error('Customer fetch failed:', e)
    }
  }

  await notifyDiscord(env, {
    title,
    customer: { name: customerName, email: customerEmail, phone: customerPhone },
    items: [
      {
        description: payment.description || `Pagamento ${payment.id}`,
        value: payment.value || 0,
      },
    ],
    total: payment.value || 0,
    method: payment.billingType || '—',
    status: payment.status,
  })

  await notifyEmail(env, {
    subject: `[InovaWeb] ${title} — ${customerName}`,
    html: `
      <h2>${title}</h2>
      <p><strong>${customerName}</strong> (${customerEmail}, ${customerPhone})</p>
      <p>Cobrança: <code>${payment.id}</code></p>
      <p>Valor: <strong>${BRL(payment.value || 0)}</strong></p>
      <p>Método: ${payment.billingType || '—'}</p>
      <p>Status: <strong>${payment.status || '—'}</strong></p>
      <p>Descrição: ${payment.description || '—'}</p>
    `,
  })

  return json(200, { ok: true })
}
