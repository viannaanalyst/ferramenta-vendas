import {
  upsertCustomer,
  createPayment,
  createSubscription,
  getPixQrCode,
  getProducts,
} from '../_lib/asaas'
import { notifyDiscord, notifyEmail } from '../_lib/notify'
import { isValidCPF, isValidEmail, isValidPhone, onlyDigits } from '../_lib/validators'

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

export const onRequestPost = async ({ request, env }) => {
  let payload
  try {
    payload = await request.json()
  } catch {
    return json(400, { error: 'JSON inválido.' })
  }

  const { customer, products, billing } = payload || {}
  const PRODUCTS = getProducts()

  // Validation
  if (!customer || !isValidEmail(customer.email)) return json(400, { error: 'E-mail inválido.' })
  if (!isValidCPF(customer.cpf)) return json(400, { error: 'CPF inválido.' })
  if (!isValidPhone(customer.phone)) return json(400, { error: 'WhatsApp inválido.' })
  if (!Array.isArray(products) || !products.includes('main'))
    return json(400, { error: 'Selecione ao menos o plano principal.' })
  if (!['PIX', 'BOLETO', 'CREDIT_CARD'].includes(billing?.method))
    return json(400, { error: 'Método de pagamento inválido.' })
  if (billing.method === 'CREDIT_CARD') {
    const c = billing.card
    if (!c?.number || !c?.holder || !c?.expiry || !c?.cvv)
      return json(400, { error: 'Dados do cartão incompletos.' })
  }

  try {
    // Holder info reused across cards
    const holderInfo = {
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf,
      phone: customer.phone,
    }

    const customerRecord = await upsertCustomer(env, customer)
    const customerId = customerRecord.id

    const charges = []
    let primaryPaymentId = null

    // Create each product as a separate charge / subscription
    for (const productId of products) {
      const product = PRODUCTS[productId]
      if (!product) continue
      const billingArgs = { ...billing, holderInfo }

      if (product.type === 'subscription') {
        const sub = await createSubscription(
          env,
          customerId,
          { ...product, id: productId },
          billingArgs
        )
        charges.push({
          id: sub.id,
          type: 'subscription',
          description: `${product.name} (mensal)`,
          value: product.price,
          paymentId: sub.id,
          status: sub.status,
        })
        if (productId === 'main') primaryPaymentId = sub.id
      } else {
        const pay = await createPayment(
          env,
          customerId,
          { ...product, id: productId },
          billingArgs
        )
        charges.push({
          id: pay.id,
          type: 'payment',
          description: product.name,
          value: product.price,
          paymentId: pay.id,
          status: pay.status,
        })
      }
    }

    // For Pix: get first payment from subscription, then fetch QR code (retry up to 3x)
    const apiBase = env.ASAAS_ENV === 'production' ? 'https://api.asaas.com/v3' : 'https://api-sandbox.asaas.com/v3'
    const asaasHeaders = { 'Content-Type': 'application/json', 'User-Agent': 'InovaWeb-CRM/1.0', access_token: env.ASAAS_API_KEY }

    let pix = null
    if (billing.method === 'PIX') {
      const firstCharge = charges[0]
      let paymentIdForPix = firstCharge.paymentId

      if (firstCharge.type === 'subscription') {
        // Retry up to 3x with 1s delay — sandbox may be slow generating the first payment
        for (let attempt = 0; attempt < 3; attempt++) {
          if (attempt > 0) await new Promise((r) => setTimeout(r, 1500))
          const list = await fetch(`${apiBase}/subscriptions/${firstCharge.id}/payments`, { headers: asaasHeaders }).then((r) => r.json())
          console.log('Sub payments attempt', attempt, JSON.stringify(list?.data?.map(p => p.id)))
          if (list?.data?.[0]?.id) {
            paymentIdForPix = list.data[0].id
            break
          }
        }
      }

      console.log('Fetching Pix QR for payment:', paymentIdForPix)
      try {
        const qr = await getPixQrCode(env, paymentIdForPix)
        console.log('Pix QR result keys:', Object.keys(qr))
        pix = {
          payload: qr.payload,
          qrCodeBase64: qr.encodedImage,
          expiresAt: qr.expirationDate,
        }
      } catch (err) {
        console.error('Pix QR fetch failed:', err.message)
      }
    }

    let boleto = null
    if (billing.method === 'BOLETO') {
      const firstCharge = charges[0]
      // For subscriptions, fetch the first generated payment to get the boleto URL
      const apiBase =
        env.ASAAS_ENV === 'production' ? 'https://api.asaas.com/v3' : 'https://api-sandbox.asaas.com/v3'
      let payId = firstCharge.paymentId
      if (firstCharge.type === 'subscription') {
        const list = await fetch(`${apiBase}/subscriptions/${firstCharge.id}/payments`, {
          headers: { access_token: env.ASAAS_API_KEY },
        }).then((r) => r.json())
        payId = list?.data?.[0]?.id || payId
      }
      const pay = await fetch(`${apiBase}/payments/${payId}`, {
        headers: { access_token: env.ASAAS_API_KEY },
      }).then((r) => r.json())
      boleto = { url: pay.bankSlipUrl, barCode: pay.identificationField }
    }

    const total = charges.reduce((s, c) => s + c.value, 0)

    const items = charges.map((c) => ({ description: c.description, value: c.value }))
    await notifyDiscord(env, {
      title: '🛒 Novo pedido recebido',
      customer: { name: customer.name, email: customer.email, phone: customer.phone },
      items,
      total,
      method: billing.method,
      status: 'pendente',
    })
    notifyEmail(env, {
      subject: `[InovaWeb] Novo pedido — ${customer.name}`,
      html: `
        <h2>Novo pedido recebido</h2>
        <p><strong>${customer.name}</strong> (${customer.email}, ${customer.phone})</p>
        <p>Pagamento: <strong>${billing.method}</strong></p>
        <ul>${items.map((i) => `<li>${i.description} — R$ ${i.value.toFixed(2)}</li>`).join('')}</ul>
        <p>Total: <strong>R$ ${total.toFixed(2)}</strong></p>
      `,
    })

    return json(200, {
      ok: true,
      method: billing.method,
      total,
      pix,
      boleto,
      charges: charges.map((c) => ({ description: c.description, value: c.value })),
      customerId,
    })
  } catch (err) {
    console.error('Checkout error:', err)
    return json(err.status || 500, {
      error: err.message || 'Erro ao processar pagamento.',
    })
  }
}
