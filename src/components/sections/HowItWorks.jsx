import { motion } from 'framer-motion'
import { FiCheck, FiArrowRight } from 'react-icons/fi'

const steps = [
  {
    number: 1,
    title: 'Você contratou',
    description: 'Usuários ilimitados e sem fidelidade. Cancele quando quiser, sem burocracia.'
  },
  {
    number: 2,
    title: 'Acesso imediato',
    description: 'Receba uma mensagem no WhatsApp e no e-mail com o acesso completo à plataforma em minutos.'
  },
  {
    number: 3,
    title: 'Automações prontas',
    description: 'Receba mais de 10 automações validadas já configuradas no seu acesso. Personalize como quiser com apenas um arrastar e soltar.'
  },
  {
    number: 4,
    title: 'Curso completo',
    description: 'Acesso ao curso com mais de 40 aulas, te ensinando tudo que você precisa saber para dominar a plataforma.'
  },
  {
    number: 5,
    title: 'Suporte dedicado',
    description: 'Suporte de domingo a domingo. Segunda a sexta: 9h às 22h | Sábado e domingo: 9h às 18h (horário de Brasília).'
  }
]

const HowItWorks = () => {
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
            Timeline da <span className="text-roxo">contratação</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-roxo to-azul hidden md:block"></div>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-roxo to-azul rounded-full flex items-center justify-center text-white font-bold text-2xl z-10">
                    {step.number}
                  </div>
                  
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
