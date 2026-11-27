// language: TypeScript, file: src/components/FinalCTA.tsx, target: Página Prumo
// CTA final, idêntico ao do topo conforme A2 item 12. Fecha a página repetindo a mesma
// oferta e a mesma promessa — sem introduzir uma segunda oferta concorrente.

import { HERO } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Button } from './ui/Button'
import { Icon } from './ui/Icon'

export function FinalCTA() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section aria-labelledby="cta-final-heading" className="bg-prumo-offwhite px-24 pb-80 sm:px-32 sm:pb-96">
      <div
        ref={ref}
        data-visible={isVisible}
        className="reveal mx-auto flex max-w-[1280px] flex-col items-start gap-40 rounded-2xl border border-prumo-graphite/12 bg-white px-32 py-48 sm:px-64 sm:py-80"
      >
        <span className="caption-3 uppercase tracking-[0.16em] text-prumo-forest">
          Último passo
        </span>

        <h2 id="cta-final-heading" className="heading-3 max-w-[680px] text-prumo-graphite">
          Trinta minutos para saber onde a sua margem está vazando.
        </h2>

        <p className="body-3 max-w-[680px] text-prumo-graphite/70">
          Se a decisão está travada por falta de número confiável, a conversa de diagnóstico
          resolve a primeira camada. Sem custo, sem apresentação institucional e com retorno
          por escrito, tenha ou não projeto no fim.
        </p>

        <div className="flex flex-col gap-16 sm:flex-row sm:items-center sm:gap-24">
          <Button as="a" href="#diagnostico" size="lg" icon="arrow-right">
            {HERO.ctaPrimary}
          </Button>
          <a
            href={`mailto:${'{{email_contato}}'}`}
            className="inline-flex items-center gap-8 press button-md text-prumo-graphite/70 hover:text-prumo-graphite"
          >
            Preferir por e-mail
            <Icon name="arrow-up-right" size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}
