export const PRODUCTS = {
  main: {
    id: 'main',
    name: 'Plano Ilimitado',
    description: 'Acesso completo à plataforma · usuários e contatos ilimitados',
    price: 149,
    type: 'subscription',
    cycle: 'MONTHLY',
    required: true,
  },
  support: {
    id: 'support',
    name: 'Suporte Mensal',
    description: 'Atendimento individual por WhatsApp, domingo a domingo',
    price: 899,
    type: 'subscription',
    cycle: 'MONTHLY',
    required: false,
  },
  setup: {
    id: 'setup',
    name: 'Configuração pela Equipe',
    description: 'Nossa equipe configura toda a plataforma para você',
    price: 999,
    type: 'one_time',
    required: false,
  },
}

export const formatBRL = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
