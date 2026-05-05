import { useState, useEffect } from 'react'

const TopBanner = () => {
  const [days, setDays] = useState([])

  useEffect(() => {
    const formatDate = (date) => {
      const options = { day: 'numeric', month: 'long' }
      return date.toLocaleDateString('pt-BR', options)
    }

    const getLastThreeDays = () => {
      const today = new Date()
      const lastDays = []
      
      for (let i = 2; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        lastDays.push(formatDate(date))
      }
      
      return lastDays
    }

    setDays(getLastThreeDays())
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-roxo to-azul text-white py-3 px-4">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base font-medium">
          Apenas nos dias:{' '}
          <span className="font-bold">
            {days.join(', ')}
          </span>{' '}
          você terá um{' '}
          <span className="font-bold text-yellow-300">desconto de 70% vitalício</span>
        </p>
      </div>
    </div>
  )
}

export default TopBanner
