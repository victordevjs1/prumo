// language: TypeScript, file: src/components/MethodSection.tsx, target: Página Prumo
// Seção 03. As quatro etapas não são quatro cards soltos: cada etapa é uma linha de
// registro com trilho vertical contínuo, e o handoff aparece como a emenda que liga
// uma etapa à seguinte. A régua do trilho é o próprio prumo da marca.

import { METHOD_SECTION } from '../data/site'
import { METHOD_STEPS } from '../data/method'
import { useReveal } from '../hooks/useReveal'
import { Icon } from './ui/Icon'
import { Placeholder } from './ui/Placeholder'
import { Prose } from './ui/Prose'
import { SectionHeading } from './ui/SectionHeading'

export function MethodSection() {
  return (
    <section
      id="metodo"
      aria-labelledby="metodo-heading"
      className="bg-prumo-graphite px-24 py-80 sm:px-32 sm:py-96"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-64">
        <SectionHeading
          eyebrow={METHOD_SECTION.eyebrow}
          heading={METHOD_SECTION.heading}
          lead={METHOD_SECTION.lead}
          theme="dark"
        />

        <ol className="flex flex-col">
          {METHOD_STEPS.map((step, index) => (
            <MethodRow key={step.index} step={step} isLast={index === METHOD_STEPS.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  )
}

type MethodRowProps = {
  step: (typeof METHOD_STEPS)[number]
  isLast: boolean
}

function MethodRow({ step, isLast }: MethodRowProps) {
  const { ref, isVisible } = useReveal<HTMLLIElement>({ threshold: 0.06 })

  return (
    <li
      ref={ref}
      data-visible={isVisible}
      className="reveal grid grid-cols-1 gap-32 border-t border-prumo-line-dark py-48 lg:grid-cols-[200px_minmax(0,1fr)_minmax(0,380px)] lg:gap-48"
    >
      {/* ---- Marcador da etapa com trilho ---- */}
      <div className="flex items-start gap-24">
        <div className="flex flex-col items-center self-stretch">
          <span className="caption-3 tabular-nums text-prumo-sage">{step.index}</span>
          <span aria-hidden="true" className="mt-16 w-px flex-1 bg-prumo-line-dark" />
          {!isLast ? (
            <Icon name="arrow-right" size={14} className="my-12 rotate-90 text-prumo-sage/70" />
          ) : (
            <span aria-hidden="true" className="my-12 size-[7px] rounded-full bg-prumo-sage" />
          )}
          {!isLast ? <span aria-hidden="true" className="w-px flex-1 bg-prumo-line-dark" /> : null}
        </div>

        <div className="flex flex-col gap-12">
          <h3 className="heading-4 text-white">{step.name}</h3>
          <span className="caption-5 text-white/45">
            Duração: <Placeholder value={step.duration} />
          </span>
        </div>
      </div>

      {/* ---- Corpo da etapa ---- */}
      <div className="flex flex-col gap-32">
        <div className="flex flex-col gap-12">
          <span className="caption-3 uppercase tracking-[0.14em] text-white/45">Objetivo</span>
          <Prose text={step.objective} className="body-3 text-white/85" />
        </div>

        <div className="grid grid-cols-1 gap-32 sm:grid-cols-2">
          <div className="flex flex-col gap-12">
            <span className="caption-3 uppercase tracking-[0.14em] text-prumo-sage">
              A consultoria faz
            </span>
            <Prose text={step.consultancy} className="body-6 text-white/70" />
          </div>

          <div className="flex flex-col gap-12">
            <span className="caption-3 uppercase tracking-[0.14em] text-prumo-sage">
              A empresa faz
            </span>
            <Prose text={step.client} className="body-6 text-white/70" />
          </div>
        </div>

        {/* Handoff: o que esta etapa entrega para a próxima. É o que dá continuidade. */}
        <div className="flex items-start gap-16 rounded-lg border border-prumo-line-dark bg-prumo-forest/25 px-24 py-16">
          <Icon name="arrow-right" size={16} className="mt-[3px] shrink-0 text-prumo-sage" />
          <p className="body-6 text-prumo-sage">
            <span className="caption-3 uppercase tracking-[0.12em]">Entrega para a próxima: </span>
            {step.handoff}
          </p>
        </div>
      </div>

      {/* ---- Entregáveis ---- */}
      <div className="flex flex-col gap-24 rounded-2xl border border-prumo-line-dark bg-white/[0.03] p-32">
        <div className="flex flex-col gap-12">
          <span className="caption-3 uppercase tracking-[0.14em] text-white/45">
            Resultado esperado
          </span>
          <Prose text={step.expected} className="body-5 text-white/85" />
        </div>

        <div className="flex flex-col gap-16 border-t border-prumo-line-dark pt-24">
          <span className="caption-3 uppercase tracking-[0.14em] text-white/45">Entregáveis</span>
          <ul className="flex flex-col gap-16">
            {step.deliverables.map((deliverable) => (
              <li key={deliverable} className="flex items-start gap-16">
                <Icon
                  name="check"
                  size={15}
                  className="mt-[3px] shrink-0 text-prumo-sage"
                />
                <span className="body-6 text-white/70">{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}
