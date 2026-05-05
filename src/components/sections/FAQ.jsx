import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

const faqs = [
  {
    question: 'Quer comprar, mas ficou na dúvida?',
    answer: 'Entendemos! Oferecemos suporte completo para tirar todas as suas dúvidas antes da compra. Entre em contato pelo WhatsApp.'
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer: 'Sim! Não há fidelidade. Cancele quando quiser, sem burocracia.'
  },
  {
    question: 'Vocês possuem API oficial do Facebook/Meta?',
    answer: 'Sim! A InovaWeb possui integração oficial com a API do Facebook/Meta, garantindo conexão segura e estável com Instagram, Messenger e Facebook Ads. Isso significa que suas automações e atendimentos funcionam com total confiabilidade e dentro das diretrizes da plataforma.'
  },
  {
    question: 'Tem IA para atendimento ao cliente?',
    answer: 'Sim! A plataforma conta com um Agente de IA que pode atender seus clientes automaticamente no WhatsApp, Instagram e Facebook. A IA responde dúvidas, qualifica leads e encaminha conversas para sua equipe quando necessário — tudo de forma inteligente e personalizada.'
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Perguntas <span className="text-roxo">Frequentes</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown className="w-5 h-5 text-roxo flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
