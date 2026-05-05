export const onlyDigits = (s) => (s || '').replace(/\D/g, '')

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((email || '').trim())

// CPF check (algoritmo oficial)
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

export const formatCPF = (v) => {
  const c = onlyDigits(v).slice(0, 11)
  return c
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export const formatPhone = (v) => {
  const p = onlyDigits(v).slice(0, 11)
  if (p.length <= 10) {
    return p
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
  return p
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}
