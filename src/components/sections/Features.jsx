import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const featuresData = [
  {
    name: 'Gestão de Contatos',
    text: 'Organize todos os seus contatos em um só lugar. Importação fácil, segmentation avançada e histórico completo de interações.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop'
  },
  {
    name: 'Pipeline',
    text: 'Visualize suas vendas em um kanban intuitivo. Arraste negócios entre etapas e acompanhe o progresso em tempo real.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
  },
  {
    name: 'Central de Chat',
    text: 'Unifique todos os canais de comunicação. WhatsApp, Instagram, Telegram e mais em uma única interface.',
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&h=400&fit=crop'
  },
  {
    name: 'Analytics',
    text: 'Dashboards poderosos com métricas em tempo real. Tome decisões baseadas em dados, não em intuição.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
  },
  {
    name: 'E-mail Marketing',
    text: 'Crie campanhas profissionais com editor drag-and-drop. Automatize envios e acompanhe métricas de entrega.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop'
  },
  {
    name: 'Automações',
    text: 'Economize horas com fluxos automatizados. Configure triggers e ações que executam automaticamente.',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop'
  },
  {
    name: 'Websites',
    text: 'Crie landing pages e sites institucionais sem código. Modelos prontos e editor visual intuitivo.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop'
  },
  {
    name: 'Programação de Posts',
    text: 'Agende conteúdo para todas as redes sociais. Calendário visual e análise de engajamento.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop'
  },
  {
    name: 'Agente de IA',
    text: 'Inteligência artificial que responde clientes 24/7. Treine com seu conhecimento e reduza custos de atendimento.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
  },
  {
    name: 'Relatórios',
    text: 'Relatórios detalhados e exportáveis. PDF, Excel e integrações com ferramentas de BI.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop'
  },
  {
    name: 'Área de Membros',
    text: 'Crie cursos, membros VIP e comunidades. Conteúdo exclusivo com controle de acesso.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop'
  },
  {
    name: 'Área de Comunidades',
    text: 'Fóruns e comunidades para seus clientes. Engajamento e interação em um ambiente controlado.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop'
  },
  {
    name: 'Central de Ligações (VoIP)',
    text: 'Faça e receba ligações pelo computador. Gravação, URA e integração com CRM.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop'
  }
]

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setActiveIndex((current) => (current + 1) % featuresData.length)
          return 10
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (container) {
      const newIndex = direction === 'left' 
        ? Math.max(0, activeIndex - 1)
        : Math.min(featuresData.length - 1, activeIndex + 1)
      
      setActiveIndex(newIndex)
      setTimeLeft(10)
      
      const targetElement = container.children[newIndex]
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tudo em <span className="text-roxo">um só lugar</span>
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all border border-gray-200"
          >
            <FiChevronLeft className="w-5 h-5 text-roxo" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuresData.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => {
                  setActiveIndex(index)
                  setTimeLeft(10)
                }}
                className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 cursor-pointer transition-all border-2 ${
                  index === activeIndex 
                    ? 'border-roxo text-roxo font-bold' 
                    : 'border-gray-300 text-gray-500'
                }`}
              >
                {index === activeIndex ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-roxo rounded-full"
                    />
                    {feature.name}
                    <span className="bg-roxo text-white text-xs px-1.5 py-0.5 rounded font-bold">
                      {timeLeft}s
                    </span>
                  </div>
                ) : (
                  feature.name
                )}
              </motion.div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-all border border-gray-200"
          >
            <FiChevronRight className="w-5 h-5 text-roxo" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto border border-gray-100 h-[400px]"
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 p-10 flex flex-col justify-center h-full">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {featuresData[activeIndex].name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {featuresData[activeIndex].text}
                </p>
              </div>
              <div className="md:w-1/2 h-full">
                <img 
                  src={featuresData[activeIndex].image} 
                  alt={featuresData[activeIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Features
