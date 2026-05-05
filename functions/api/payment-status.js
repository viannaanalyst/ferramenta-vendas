const apiBase = (env) =>
  env.ASAAS_ENV === 'production' ? 'https://api.asaas.com/v3' : 'https://api-sandbox.asaas.com/v3'

const asaasGet = (env, path) =>
  fetch(`${apiBase(env)}${path}`, {
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'InovaWeb-CRM/1.0', access_token: env.ASAAS_API_KEY },
  }).then((r) => r.json())

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  if (!id) return json(400, { error: 'id obrigatório' })

  try {
    // id can be a subscription (sub_xxx) or a payment (pay_xxx)
    if (id.startsWith('sub_')) {
      const list = await asaasGet(env, `/subscriptions/${id}/payments`)
      const payment = list?.data?.[0]
      return json(200, { status: payment?.status || 'PENDING' })
    }
    const payment = await asaasGet(env, `/payments/${id}`)
    return json(200, { status: payment.status || 'PENDING' })
  } catch (err) {
    return json(500, { error: err.message })
  }
}
