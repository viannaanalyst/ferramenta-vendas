import { motion } from 'framer-motion'
import { FiCheck, FiX, FiArrowRight } from 'react-icons/fi'

const comparisonData = [
  {
    functionality: 'CRM e Gerenciamento de pipeline',
    substitutes: 'ActiveCampaign, HubSpot, Klaviyo',
    cost: 'R$ 500/mês'
  },
  {
    functionality: 'Funil de vendas ilimitados',
    substitutes: 'Klaviyo, ClickFunnels, Leadpages, Unbounce',
    cost: 'R$ 1.500/mês'
  },
  {
    functionality: 'Construtor de website',
    substitutes: 'Unbounce, WordPress, Wix, Squarespace',
    cost: 'R$ 100/mês'
  },
  {
    functionality: 'E-mail Marketing',
    substitutes: 'ActiveCampaign, Mailchimp, RD Station, HubSpot',
    cost: 'R$ 500/mês'
  },
  {
    functionality: 'SMS Marketing',
    substitutes: 'HubSpot, Twilio, Zenvia, Infobip, SMS Tool',
    cost: 'R$ 500/mês'
  },
  {
    functionality: 'Relatórios',
    substitutes: 'Reportei, LockStudio, mLabs',
    cost: 'R$ 300/mês'
  },
  {
    functionality: 'Automações e fluxos',
    substitutes: 'Zapier, Make, N8N',
    cost: 'R$ 500/mês'
  },
  {
    functionality: 'Área de Membros para Cursos',
    substitutes: 'Hotmart, Teachable, Thinkific, Kiwify',
    cost: 'Taxa + hospedagem'
  },
  {
    functionality: 'Sistema de VOIP com Gravação',
    substitutes: 'JustCall, Vonage, CloudTalk',
    cost: 'R$ 450/mês'
  },
  {
    functionality: 'Programação de Posts',
    substitutes: 'Hootsuite, Buffer, mLabs',
    cost: 'R$ 1.500/mês'
  }
]

const Comparison = () => {
  const totalEconomy = 6350
  const inovawebPrice = 147

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            O que você pode substituir
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            É hora de dizer adeus aos altos custos das suas ferramentas
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-roxo to-azul text-white">
                    <th className="px-6 py-4 text-left font-bold">Funcionalidade</th>
                    <th className="px-6 py-4 text-left font-bold">Substitui</th>
                    <th className="px-6 py-4 text-center font-bold">Custo</th>
                    <th className="px-6 py-4 text-center font-bold">InovaWeb</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">{item.functionality}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{item.substitutes}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-500 font-semibold">{item.cost}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <FiCheck className="w-6 h-6 text-green-500 mx-auto" />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gradient-to-r from-roxo/10 to-azul/10">
                    <td className="px-6 py-4 font-bold text-gray-800">Usuários Ilimitados</td>
                    <td className="px-6 py-4 text-gray-600">—</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-gray-500">—</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <FiCheck className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-gradient-to-r from-roxo to-azul text-white">
                    <td className="px-6 py-4 font-bold text-lg">Total</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 text-center">
                      <span className="line-through opacity-75">R$ {totalEconomy.toLocaleString('pt-BR')}/mês</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-2xl font-bold">R$ {inovawebPrice}/mês</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="bg-gradient-to-r from-roxo to-azul text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg inline-flex items-center gap-2">
              Começar Agora
              <FiArrowRight />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Comparison
