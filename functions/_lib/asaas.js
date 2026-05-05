/**
 * Asaas API client (Cloudflare Workers / Pages Functions)
 * Docs: https://docs.asaas.com/
 */

const PRODUCTS = {
  main: { name: 'Plano Ilimitado', price: 149, type: 'subscription', cycle: 'MONTHLY' },
  support: { name: 'Suporte Mensal', price: 899, type: 'subscription', cycle: 'MONTHLY' },
  setup: { name: 'Configuração pela Equipe', price: 999, type: 'one_time' },
}

export const getProducts = () => PRODUCTS

const getApiBase = (env) =>
  env.ASAAS_ENV === 'production'
    ? 'https://api.asaas.com/v3'
    : 'https://api-sandbox.asaas.com/v3'

const callAsaas = async (env, path, method = 'GET', body = null) => {
  const res = await fetch(`${getApiBase(env)}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'InovaWeb-CRM/1.0',
      access_token: env.ASAAS_API_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const errMsg =
      data?.errors?.[0]?.description ||
      data?.message ||
      `Asaas API error (${res.status})`
    const err = new Error(errMsg)
    err.status = res.status
    err.body = data
    throw err
  }
  return data
}

/**
 * Find existing customer by CPF or create one.
 */
export const upsertCustomer = async (env, customer) => {
  const cpf = customer.cpf
  // Try to find existing
  const existing = await callAsaas(
    env,
    `/customers?cpfCnpj=${encodeURIComponent(cpf)}&limit=1`
  )
  if (existing.data?.length > 0) return existing.data[0]

  return callAsaas(env, '/customers', 'POST', {
    name: customer.name,
    email: customer.email,
    cpfCnpj: cpf,
    mobilePhone: customer.phone,
    notificationDisabled: false,
  })
}

const todayPlus = (days) => {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

/**
 * Create a single payment (one-time charge).
 */
export const createPayment = async (env, customerId, product, billing) => {
  return callAsaas(env, '/payments', 'POST', {
    customer: customerId,
    billingType: billing.method, // PIX | BOLETO | CREDIT_CARD
    value: product.price,
    dueDate: todayPlus(billing.method === 'BOLETO' ? 3 : 1),
    description: product.name,
    externalReference: `${product.id || 'product'}-${Date.now()}`,
    creditCard: billing.card
      ? {
          holderName: billing.card.holder,
          number: billing.card.number,
          expiryMonth: billing.card.expiry?.split('/')[0],
          expiryYear: '20' + billing.card.expiry?.split('/')[1],
          ccv: billing.card.cvv,
        }
      : undefined,
    creditCardHolderInfo: billing.card
      ? {
          name: billing.holderInfo.name,
          email: billing.holderInfo.email,
          cpfCnpj: billing.holderInfo.cpf,
          postalCode: '00000000',
          addressNumber: 'S/N',
          phone: billing.holderInfo.phone,
        }
      : undefined,
  })
}

/**
 * Create a subscription (recurring monthly charge).
 */
export const createSubscription = async (
  env,
  customerId,
  product,
  billing
) => {
  return callAsaas(env, '/subscriptions', 'POST', {
    customer: customerId,
    billingType: billing.method,
    value: product.price,
    nextDueDate: todayPlus(billing.method === 'BOLETO' ? 3 : 1),
    cycle: 'MONTHLY',
    description: `${product.name} (recorrente mensal)`,
    externalReference: `${product.id || 'sub'}-${Date.now()}`,
    creditCard: billing.card
      ? {
          holderName: billing.card.holder,
          number: billing.card.number,
          expiryMonth: billing.card.expiry?.split('/')[0],
          expiryYear: '20' + billing.card.expiry?.split('/')[1],
          ccv: billing.card.cvv,
        }
      : undefined,
    creditCardHolderInfo: billing.card
      ? {
          name: billing.holderInfo.name,
          email: billing.holderInfo.email,
          cpfCnpj: billing.holderInfo.cpf,
          postalCode: '00000000',
          addressNumber: 'S/N',
          phone: billing.holderInfo.phone,
        }
      : undefined,
  })
}

/**
 * Get Pix QR Code for a payment.
 */
export const getPixQrCode = async (env, paymentId) => {
  return callAsaas(env, `/payments/${paymentId}/pixQrCode`)
}

/**
 * Get a payment / subscription by id (used in webhook handler).
 */
export const getPayment = async (env, paymentId) =>
  callAsaas(env, `/payments/${paymentId}`)
