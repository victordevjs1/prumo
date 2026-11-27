// language: TypeScript, file: src/components/ValueSection.tsx, target: Página Prumo
// Seção 04a. Onde o valor se acumula. O preço não é defendido com afirmação de qualidade:
// é demonstrado por profundidade de análise, horas técnicas, formato de projeto e
// entregável verificável.

import { VALUE_PILLARS_HEADING } from '../data/site'
import { VALUE_PILLARS } from '../data/objections'
import { useReveal } from '../hooks/useReveal'
import { SectionHeading } from './ui/SectionHeading'

export function ValueSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ threshold: 0.08 })

  return (
    <section
      id="investimento"
      aria-labelledby="investimento-heading"
      className="bg-prumo-offwhite px-24 py-80 sm:px-32 sm:py-96"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-64">
        <SectionHeading
          eyebrow={VALUE_PILLARS_HEADING.eyebrow}
          heading={VALUE_PILLARS_HEADING.heading}
          lead="Quatro fatores explicam o formato de investimento de um projeto Prumo. Nenhum deles é uma caixa fechada replicada entre clientes."
        />

        <div ref={ref} data-visible={isVisible} className="reveal grid grid-cols-1 gap-40 sm:grid-cols-2">
          {VALUE_PILLARS.map((pillar) => (
            <article
              key={pillar.label}
              className="flex flex-col gap-16 border-t-2 border-prumo-forest pt-32"
            >
              <span className="caption-4 tabular-nums text-prumo-graphite/40">{pillar.label}</span>
              <h3 className="title-1 text-prumo-graphite">{pillar.title}</h3>
              <p className="body-6 text-prumo-graphite/70">{pillar.description}</p>
            </article>
          ))}
        </div>

        {/* Nota de estrutura de investimento: sem preço inventado, sem faixa fictícia. */}
        <div className="flex flex-col gap-16 rounded-2xl border border-prumo-graphite/12 bg-white p-32 sm:p-40 lg:flex-row lg:items-center lg:justify-between lg:gap-48">
          <div className="flex flex-col gap-12 lg:max-w-[720px]">
            <h3 className="title-2 text-prumo-graphite">Como o valor é apresentado</h3>
            <p className="body-6 text-prumo-graphite/70">
              A faixa por porte de projeto é informada na conversa de diagnóstico, junto com
              escopo, frentes e cronograma. O valor final sai em proposta fechada, com o
              investimento total definido antes do início e parcelamento ao longo do
              cronograma. Não trabalhamos com hora aberta.
            </p>
          </div>

          <a
            href="#diagnostico"
            className="inline-flex shrink-0 items-center gap-8 rounded-lg border border-prumo-forest bg-prumo-forest px-32 py-24 press button-md text-white hover:border-prumo-forest-deep hover:bg-prumo-forest-deep"
          >
            Ver faixa no diagnóstico
          </a>
        </div>
      </div>
    </section>
  )
}
