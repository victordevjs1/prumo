// language: TypeScript, file: src/components/ProblemSection.tsx, target: Página Prumo
// Seção do problema. Cinco sintomas que chegam juntos, em composição editorial de
// lista numerada com régua. Ícone só entra onde carrega significado.

import { PROBLEM_SECTION } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { Icon, type IconName } from './ui/Icon'
import { SectionHeading } from './ui/SectionHeading'

const SYMPTOM_ICONS: IconName[] = ['compass', 'target', 'shuffle', 'banner', 'alert']

export function ProblemSection() {
  const { ref, isVisible } = useReveal<HTMLOListElement>({ threshold: 0.05 })

  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      className="bg-prumo-offwhite px-24 py-80 sm:px-32 sm:py-96"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-64">
        <SectionHeading
          eyebrow={PROBLEM_SECTION.eyebrow}
          heading={PROBLEM_SECTION.heading}
          lead={PROBLEM_SECTION.lead}
        />

        <ol
          ref={ref}
          data-visible={isVisible}
          className="reveal grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-prumo-graphite/12 bg-prumo-line lg:grid-cols-2"
        >
          {PROBLEM_SECTION.symptoms.map((symptom, index) => (
            <li
              key={symptom.title}
              className="flex flex-col gap-16 bg-white p-32 sm:p-40"
            >
              <div className="flex items-center justify-between gap-16">
                <span className="inline-flex items-center gap-12 caption-3 uppercase tracking-[0.14em] text-prumo-forest">
                  <Icon name={SYMPTOM_ICONS[index]} size={17} />
                  {symptom.label}
                </span>
                <span className="caption-4 tabular-nums text-prumo-graphite/35">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="title-2 text-prumo-graphite">{symptom.title}</h3>
              <p className="body-6 text-prumo-graphite/70">{symptom.description}</p>
            </li>
          ))}

          {/* Célula de fecho: fecha a malha ímpar em 5 itens sem deixar buraco. */}
          <li className="flex flex-col justify-between gap-24 bg-prumo-forest p-32 sm:p-40 lg:col-span-1">
            <p className="heading-6 text-white">
              Os cinco sintomas têm a mesma raiz: informação que não sustenta decisão.
            </p>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-8 press button-sm text-prumo-sage hover:text-white"
            >
              Avaliar o meu cenário
              <Icon name="arrow-right" size={17} />
            </a>
          </li>
        </ol>
      </div>
    </section>
  )
}
