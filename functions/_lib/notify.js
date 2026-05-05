/**
 * Notification dispatchers — Discord webhook + Resend email.
 * Both are best-effort: failures are logged but never block the main flow.
 */

const BRL = (v) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

export const notifyDiscord = async (env, { title, customer, items, total, method, status }) => {
  if (!env.DISCORD_WEBHOOK_URL) {
    console.log('Discord: DISCORD_WEBHOOK_URL not set, skipping')
    return
  }
  console.log('Discord: sending to', env.DISCORD_WEBHOOK_URL.slice(0, 40) + '...')
  try {
    const fields = [
      { name: 'Cliente', value: `${customer.name}\n${customer.email}\n${customer.phone}`, inline: true },
      { name: 'Pagamento', value: `${method}\nStatus: ${status || 'pendente'}`, inline: true },
      {
        name: 'Itens',
        value: items.map((i) => `• ${i.description} — ${BRL(i.value)}`).join('\n') || '—',
      },
      { name: 'Total', value: `**${BRL(total)}**`, inline: true },
    ]

    const color = status === 'CONFIRMED' || status === 'RECEIVED' ? 0x10b981 : 0x6a11cb

    await fetch(env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{ title, color, fields, timestamp: new Date().toISOString() }],
      }),
    })
  } catch (err) {
    console.error('Discord notify failed:', err)
  }
}

export const notifyEmail = async (env, { subject, html }) => {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL_TO || !env.NOTIFY_EMAIL_FROM) return
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.NOTIFY_EMAIL_FROM,
        to: env.NOTIFY_EMAIL_TO,
        subject,
        html,
      }),
    })
  } catch (err) {
    console.error('Email notify failed:', err)
  }
}
