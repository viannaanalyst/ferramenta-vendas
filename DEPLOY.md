# Deploy — InovaWeb CRM (Cloudflare Pages + Asaas)

## Stack

- **Frontend:** React + Vite (estático)
- **Backend:** Cloudflare Pages Functions (`functions/`)
- **Pagamentos:** API do Asaas (sandbox e produção)
- **Notificações:** Discord webhook + Resend (email)
- **Domínio:** `vendas.inovawebtech.com.br` (via Cloudflare)

## 1. Variáveis de ambiente necessárias

Copie `.dev.vars.example` para `.dev.vars` localmente. No Cloudflare Pages, configure as mesmas variáveis em **Settings → Environment variables**.

| Variável | Onde pegar |
|---|---|
| `ASAAS_ENV` | `sandbox` (testes) ou `production` |
| `ASAAS_API_KEY` | Painel Asaas → **Integrações → API → Gerar nova chave** |
| `ASAAS_WEBHOOK_TOKEN` | Você define um valor livre. Copie o mesmo no painel Asaas → **Integrações → Webhook** |
| `DISCORD_WEBHOOK_URL` | Discord → Editar canal → Integrações → Webhooks → Novo webhook → Copiar URL |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys (free tier 3k emails/mês) |
| `NOTIFY_EMAIL_FROM` | Email verificado no Resend (precisa configurar DNS do domínio) |
| `NOTIFY_EMAIL_TO` | Seu email pessoal |

> Você pode rodar **só com Discord** se preferir — o email é opcional, ambos são best-effort.

## 2. Configurar o Asaas

### Sandbox (testes primeiro)

1. Crie conta em [sandbox.asaas.com](https://sandbox.asaas.com)
2. Vá em **Integrações → API** e gere uma chave
3. Vá em **Integrações → Webhook** e configure:
   - URL: `https://vendas.inovawebtech.com.br/api/webhook`
   - Token: o mesmo valor que você colocou em `ASAAS_WEBHOOK_TOKEN`
   - Eventos: marque pelo menos `PAYMENT_CONFIRMED`, `PAYMENT_RECEIVED`, `PAYMENT_OVERDUE`, `PAYMENT_REFUNDED`

### Produção (depois que sandbox estiver ok)

Mesmos passos no painel real do Asaas. Troque `ASAAS_ENV=production` no Cloudflare.

## 3. Deploy no Cloudflare Pages

### Primeira vez

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages**
2. **Connect to Git** → autorize o GitHub → escolha `viannaanalyst/ferramenta-vendas`
3. Configurações de build:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** (deixe vazio)
4. **Save and Deploy** — primeiro deploy roda
5. Configure **Environment variables** (todas da seção 1) em **Settings → Environment variables**
6. **Re-deploy** depois de salvar as variáveis (na aba Deployments → ⋮ → Retry deployment)

### Domínio customizado

1. No projeto Cloudflare Pages → **Custom domains → Set up a custom domain**
2. Digite `vendas.inovawebtech.com.br` → Continue
3. Cloudflare cria automaticamente o registro CNAME no DNS

> Se o domínio `inovawebtech.com.br` ainda não está no Cloudflare, primeiro adicione em **Websites → Add a site** e atualize os nameservers no seu registrador.

## 4. Rodar localmente

```bash
# Instalar dependências
npm install

# Rodar só o frontend (sem APIs)
npm run dev

# Rodar frontend + functions (com Asaas mockado precisa do .dev.vars preenchido)
npx wrangler pages dev -- npm run dev
```

## 5. Fluxo de cobrança

```
Cliente → /checkout → POST /api/checkout
  ↓ valida dados
  ↓ Asaas: cria/encontra cliente
  ↓ Asaas: cria assinatura R$149/mês (plano principal)
  ↓ Se marcou suporte: cria assinatura R$899/mês
  ↓ Se marcou setup: cria cobrança única R$999
  ↓ Para Pix: gera QR Code
  ↓ Notifica Discord + Email (best-effort)
  → /sucesso (mostra QR/boleto/confirmação)

Quando cliente paga
  → Asaas dispara webhook
  → POST /api/webhook (autenticado por token)
  → Notifica Discord + Email com status (CONFIRMED/RECEIVED)
  → Você libera acesso manualmente
```

## 6. Testes em sandbox

O Asaas sandbox aceita:

- **CPF de teste:** qualquer válido (use [4devs.com.br/gerador_de_cpf](https://4devs.com.br/gerador_de_cpf) — só pra testar)
- **Cartão de teste:** `5184 0190 0000 0008` · validade `12/30` · CVV `318` (aprovado)
- **Pix:** o QR Code do sandbox não é pagável — para confirmar, simule no painel: clique no pagamento → "Receber em dinheiro"
- **Boleto:** mesmo procedimento

## 7. Troubleshooting

- **`/checkout` retorna 404 ao recarregar:** verifique se o arquivo `public/_redirects` existe e contém `/* /index.html 200`. Cloudflare Pages reconhece automaticamente.
- **Webhook não dispara:** confira o token no Asaas. Veja logs em **Cloudflare Pages → Functions → Real-time logs**.
- **API Key vazando:** se ela aparecer em qualquer arquivo do repositório, **rotacione imediatamente** no painel Asaas e atualize a variável no Cloudflare.
