import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const items = [
  'Gestão de Contatos',
  'Pipeline',
  'Central de Chat',
  'Analytics',
  'E-mail Marketing',
  'Automações',
  'Websites',
  'Programação de Posts',
  'Agente de IA',
  'Relatórios',
  'Área de Membros',
  'Área de Comunidades',
  'Central de Ligações (VoIP)'
]

const Centralize = () => {
  return (
    <section className="py-16 md:py-28 relative overflow-x-clip">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]"></div>
      
      <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-extrabold mb-6 leading-tight max-w-2xl mx-auto"
        >
          Centralize suas estratégias online{' '}
          <span className="bg-gradient-to-r from-roxo to-azul bg-clip-text text-transparent">
            com todas as ferramentas
          </span>{' '}
          essenciais reunidas.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 mb-10"
        >
          Uma plataforma. Inúmeras possibilidades. Simplifique sua vida online.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative mx-auto w-full max-w-4xl"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 pb-4">
            {items.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl px-5 py-3 text-sm font-semibold text-gray-800 whitespace-nowrap border border-gray-200/50 backdrop-blur-sm"
                style={{
                  animationDelay: `${index * 0.3}s`
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex items-center justify-center gap-2 text-roxo"
          >
            <FiArrowRight className="w-5 h-5" />
            <span className="font-bold text-lg">InovaWeb CRM</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Centralize
