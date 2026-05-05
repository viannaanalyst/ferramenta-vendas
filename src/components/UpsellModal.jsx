import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiCheck, FiArrowRight } from 'react-icons/fi'

const links = {
  main: 'https://www.asaas.com/c/ouuibiknv07n0uri',
  suporte: 'https://www.asaas.com/c/t7o3pz42n2okca0b',
  config: 'https://www.asaas.com/c/08wy2o708voyp0fs'
}

const products = [
  {
    id: 'suporte',
    name: 'Suporte Mensal',
    price: 1099,
    description: 'Suporte individual no WhatsApp de Domingo a Domingo',
    frequency: '/mês'
  },
  {
    id: 'config',
    name: 'Configuração pela Equipe',
    price: 999,
    description: 'Nossa equipe configura toda a plataforma para você',
    frequency: ' (pagamento único)'
  }
]

const UpsellModal = ({ isOpen, onClose }) => {
  const [selectedUpsells, setSelectedUpsells] = useState([])
  const [currentStep, setCurrentStep] = useState(1)

  const mainPrice = 149
  const upsellsTotal = selectedUpsells.reduce((acc, id) => {
    const product = products.find(p => p.id === id)
    return acc + (product ? product.price : 0)
  }, 0)
  const total = mainPrice + upsellsTotal

  useEffect(() => {
    if (isOpen) {
      setSelectedUpsells([])
      setCurrentStep(1)
    }
  }, [isOpen])

  const toggleUpsell = (id) => {
    setSelectedUpsells(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleContinue = () => {
    if (currentStep === 1) {
      if (selectedUpsells.length > 0) {
        setCurrentStep(2)
      } else {
        window.open(links.main, '_blank')
        onClose()
      }
    } else {
      window.open(links.main, '_blank')
      onClose()
    }
  }

  const handleSkip = () => {
    window.open(links.main, '_blank')
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>

          {currentStep === 1 ? (
            <>
              <div className="bg-gradient-to-r from-roxo to-azul p-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Otimize sua experiência!</h3>
                <p className="text-white/80 text-sm">
                  Adicione itens extras para turbinar seu CRM
                </p>
              </div>

              <div className="p-6">
                <div className="bg-gradient-to-br from-roxo/5 to-azul/5 rounded-2xl p-4 mb-6 border-2 border-roxo/20">
                  <div className="flex items-center gap-3 mb-2">
                    <FiCheck className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-gray-900">Plano Ilimitado CRM</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">Já selecionado • R$ {mainPrice}/mês</p>
                </div>

                <div className="space-y-3 mb-6">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => toggleUpsell(product.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedUpsells.includes(product.id)
                          ? 'border-roxo bg-roxo/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedUpsells.includes(product.id)
                            ? 'border-roxo bg-roxo'
                            : 'border-gray-300'
                        }`}>
                          {selectedUpsells.includes(product.id) && (
                            <FiCheck className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-900">{product.name}</span>
                            <span className="font-bold text-roxo">
                              R$ {product.price}{product.frequency}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedUpsells.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
                  >
                    <p className="text-sm text-green-700">
                      <span className="font-semibold">💡 Dica:</span> Você pode contratar os adicionais agora ou depois via WhatsApp após a ativação do CRM.
                    </p>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleSkip}
                    className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Pular
                  </button>
                  <button
                    onClick={handleContinue}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-roxo to-azul text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    Continuar
                    <FiArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gradient-to-r from-roxo to-azul p-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Resumo do seu pedido</h3>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">Plano Ilimitado CRM</span>
                    <span className="font-semibold text-gray-900">R$ {mainPrice}/mês</span>
                  </div>
                  
                  {selectedUpsells.map(id => {
                    const product = products.find(p => p.id === id)
                    return (
                      <div key={id} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700">{product.name}</span>
                        <span className="font-semibold text-gray-900">
                          R$ {product.price}
                          <span className="text-sm text-gray-500">{product.frequency}</span>
                        </span>
                      </div>
                    )
                  })}

                  <div className="flex justify-between items-center pt-3">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-roxo">R$ {total}</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-amber-700">
                    <span className="font-semibold">⚠️ Importante:</span> Você será redirecionado para o link de pagamento do <strong>Plano CRM</strong>. Os adicionais serão enviados para contratação via WhatsApp após a ativação.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleContinue}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-roxo to-azul text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    Ir para Pagamento
                    <FiArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default UpsellModal
