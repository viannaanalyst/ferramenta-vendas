import { motion } from 'framer-motion'
import { FiPlay, FiCheckCircle } from 'react-icons/fi'

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-roxo to-azul text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-4">
            <FiCheckCircle />
            <span>Oferta por tempo limitado</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Uma plataforma.
            <br />
            <span className="text-white/90">Inúmeras possibilidades.</span>
          </h1>
          
          <p className="text-lg mb-6 text-white/90">
            Simplifique sua vida online com o primeiro funil que pensa, adapta e vende sozinho.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-roxo font-bold text-base px-6 py-3 rounded-lg shadow-xl hover:bg-white/90 transition-all">
              Começar Agora
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-white/50 hover:border-white px-5 py-3 rounded-lg transition-all">
              <FiPlay className="w-4 h-4" />
              <span>Assista o vídeo</span>
            </button>
          </div>
        </motion.div>
        
        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl aspect-video flex items-center justify-center border-2 border-white/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 hover:bg-white/30 transition-colors cursor-pointer">
                <FiPlay className="w-8 h-8 ml-1" />
              </div>
              <p className="text-white/70 text-sm">Video aqui</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
