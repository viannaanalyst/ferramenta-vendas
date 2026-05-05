import { motion } from 'framer-motion'
import { FiCheck, FiHeadphones, FiZap, FiCreditCard } from 'react-icons/fi'

const benefits = [
  { icon: FiZap, title: 'Tudo ilimitado', description: 'Sem limites de uso' },
  { icon: FiZap, title: 'Setup em minutos', description: 'Comece rapidamente' },
  { icon: FiHeadphones, title: 'Suporte 7 dias', description: 'Domingo a domingo' },
  { icon: FiCreditCard, title: '1 plano só', description: 'Sem surpresas' }
]

const Benefits = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-roxo to-azul text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Por que escolher o InovaWeb?
          </h2>
          <p className="text-xl text-white/80">
            Cancele quando quiser, sem burocracia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-white/80 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
