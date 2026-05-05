import { motion } from 'framer-motion'

const CTA = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para simplificar sua vida?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Junte-se a milhares de empreendedores que já economizam tempo e dinheiro.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-roxo to-azul text-white font-bold text-lg px-12 py-5 rounded-lg shadow-2xl hover:shadow-3xl transition-all"
          >
            Começar Agora - Acesso Imediato
          </motion.button>
          <p className="mt-6 text-gray-500 text-sm">
            Setup em minutos • Suporte 7 dias por semana • Cancele quando quiser
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
