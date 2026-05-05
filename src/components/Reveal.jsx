import { motion } from 'framer-motion'

/**
 * Wrapper unificado de animação de entrada.
 * Usa fade + slide-up sutil disparado quando o elemento entra na viewport.
 *
 * @param {number} delay  segundos antes de iniciar
 * @param {number} y      deslocamento vertical inicial (px)
 * @param {string} as     tag/elemento HTML a renderizar (default: 'div')
 */
const Reveal = ({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  as = 'div',
  className = '',
  ...rest
}) => {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
