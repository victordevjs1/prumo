// language: TypeScript, file: src/components/CredibilityStrip.tsx, target: Página Prumo
// Faixa de credibilidade. Nenhum número inventado: cada valor é placeholder marcado
// com o componente Placeholder, então não há como um indicador demonstrativo passar
// por resultado apurado.

import { CREDIBILITY_STRIP } from '../data/site'
import { Placeholder } from './ui/Placeholder'
import { useReveal } from '../hooks/useReveal'

export function CredibilityStrip() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section aria-label="Credibilidade" className="bg-prumo-offwhite px-24 sm:px-32">
      <div className="mx-auto max-w-[1280px]">
        <div
          ref={ref}
          data-visible={isVisible}
          className="reveal flex flex-col gap-40 rounded-2xl border border-prumo-graphite/12 bg-white px-32 py-40 sm:px-48 sm:py-48"
        >
          <p className="heading-6 max-w-[820px] text-prumo-graphite">
            {CREDIBILITY_STRIP.statement}
          </p>

          <dl className="grid grid-cols-2 gap-x-32 gap-y-32 border-t border-prumo-line pt-40 lg:grid-cols-4">
            {CREDIBILITY_STRIP.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-12">
                <dt className="caption-4 text-prumo-graphite/55">{stat.label}</dt>
                <dd className="title-1 tabular-nums text-prumo-forest">
                  <Placeholder value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
