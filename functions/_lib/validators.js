export const onlyDigits = (s) => (s || '').replace(/\D/g, '')

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((email || '').trim())

export const isValidCPF = (cpf) => {
  const c = onlyDigits(cpf)
  if (c.length !== 11) return false
  if (/^(\d)\1{10}$/.test(c)) return false
  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(c[i]) * (10 - i)
  let d1 = (sum * 10) % 11
  if (d1 === 10) d1 = 0
  if (d1 !== parseInt(c[9])) return false
  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(c[i]) * (11 - i)
  let d2 = (sum * 10) % 11
  if (d2 === 10) d2 = 0
  return d2 === parseInt(c[10])
}

export const isValidPhone = (phone) => {
  const p = onlyDigits(phone)
  return p.length >= 10 && p.length <= 11
}
