import { motion } from 'framer-motion'
import { FiCheck, FiArrowRight, FiZap } from 'react-icons/fi'

const features = [
  'Passo a Passo Completo em Vídeo para ativar o CRM em Poucos Minutos',
  'Assinatura do CRM Completa com Usuários e Contatos Ilimitados',
  'Automações Prontas e Validadas do CRM',
  'Integrações com Google, Instagram, Facebook, TikTok e Linkedin',
  'Programação de Post em TODAS as redes sociais',
  'Modelos Validados de E-mail Marketing',
  'Automações de Instagram (igual Manychat)',
  'Conexão de WhatsApp via QR Code',
  'Automações Validadas de Follow UP',
  'Automações Validadas de Nutrição (Geladeira 30D, 60D e 90D)',
  'Suporte Individual no WhatsApp de Domingo a Domingo',
  'Curso com +40 aulas completas sobre a plataforma'
]

const Pricing = ({ onOpenCheckout }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Planos & <span className="text-roxo">Preços</span>
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Um plano, múltiplas ferramentas.
          </p>
          <div className="inline-block bg-gradient-to-r from-roxo to-azul text-white px-6 py-2 rounded-full font-semibold">
            Desconto Vitalício de 70% Aplicado
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-roxo to-azul rounded-3xl p-1">
            <div className="bg-white rounded-3xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Plano Ilimitado
                </h3>
                <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
                  <FiZap className="w-5 h-5 text-roxo" />
                  <span className="text-sm">Tudo que você precisa em um só lugar</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-start gap-3"
                  >
                    <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="text-center border-t border-gray-100 pt-6">
                <p className="text-gray-500 mb-2">DE R$497,00/mês por:</p>
                <div className="mb-4">
                  <span className="text-6xl font-bold text-gray-900">R$149</span>
                  <span className="text-xl text-gray-500">/mês</span>
                </div>
                
                <button 
                  onClick={onOpenCheckout}
                  className="w-full bg-gradient-to-r from-roxo to-azul text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg mb-3"
                >
                  Quero Plano Ilimitado
                </button>
                
                <div className="flex items-center justify-center gap-4 text-gray-500 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    Sem fidelidade
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    Cancele quando quiser
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-6">
                  Pagamento Internacional. O valor em reais pode sofrer pequena variação conforme o cartão.
                </p>

                <div className="flex items-center justify-center gap-6 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <FiCheck className="w-4 h-4 text-roxo" />
                    Suporte domingo a domingo
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCheck className="w-4 h-4 text-roxo" />
                    Setup em minutos
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCheck className="w-4 h-4 text-roxo" />
                    Tudo ilimitado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
