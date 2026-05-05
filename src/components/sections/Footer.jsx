import Reveal from '../Reveal'

const Footer = () => {
  return (
    <footer className="relative bg-ink text-bone border-t border-bone/10 overflow-hidden">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <Reveal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-roxo-azul flex items-center justify-center">
              <span className="font-display text-bone text-lg">i</span>
            </div>
            <div>
              <div className="font-display text-bone text-xl leading-none">
                InovaWeb <span className="text-bone/40">CRM</span>
              </div>
              <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-bone/40 mt-1">
                A plataforma operacional do seu negócio
              </div>
            </div>
          </div>

          <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-bone/40">
            © 2026 InovaWeb · Todos os direitos reservados
          </div>
        </Reveal>
      </div>
    </footer>
  )
}

export default Footer
