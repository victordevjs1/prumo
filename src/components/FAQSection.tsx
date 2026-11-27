// language: TypeScript, file: src/components/FAQSection.tsx, target: Página Prumo
// Seção 04b. Objeções e dúvidas. Acordeão acessível: cada item é um <details> nativo,
// o que entrega teclado, foco e leitor de tela sem JavaScript adicional. O marcador
// gira na curva base em vez de trocar instantaneamente.

import { FAQ_ITEMS } from '../data/objections'
import { OBJECTION_INTRO } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Icon } from './ui/Icon'
import { Prose } from './ui/Prose'
import { SectionHeading } from './ui/SectionHeading'

export function FAQSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ threshold: 0.05 })

  return (
    <section
      id="duvidas"
      aria-labelledby="duvidas-heading"
      className="bg-prumo-offwhite px-24 py-80 sm:px-32 sm:py-96"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-64">
        <SectionHeading
          eyebrow={OBJECTION_INTRO.eyebrow}
          heading={OBJECTION_INTRO.heading}
          lead={OBJECTION_INTRO.lead}
        />

        <div
          ref={ref}
          data-visible={isVisible}
          className="reveal divide-y divide-prumo-line border-y border-prumo-line"
        >
          {FAQ_ITEMS.map((item) => (
            <details key={item.id} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-32 py-32 press">
                <h3 className="title-2 max-w-[820px] text-prumo-graphite group-hover:text-prumo-forest">
                  {item.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-[2px] inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-prumo-graphite/20 text-prumo-graphite transition-transform duration-500 ease-prumo group-open:rotate-45"
                >
                  <Icon name="plus" size={16} />
                </span>
              </summary>

              <div className="max-w-[820px] pb-40 pr-0 sm:pr-80">
                <Prose text={item.answer} className="body-6 text-prumo-graphite/70" />
              </div>
            </details>
          ))}
        </div>

        <div className="flex flex-col gap-16 rounded-2xl border border-prumo-graphite/12 bg-white p-32 sm:flex-row sm:items-center sm:justify-between sm:gap-40 sm:p-40">
          <p className="body-5 max-w-[680px] text-prumo-graphite/80">
            Ficou uma dúvida que não está aqui? Ela costuma ser resolvida na própria conversa
            de diagnóstico.
          </p>
          <a
            href="#diagnostico"
            className="inline-flex shrink-0 items-center gap-8 press button-sm text-prumo-forest hover:text-prumo-graphite"
          >
            Agendar diagnóstico
            <Icon name="arrow-right" size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}
