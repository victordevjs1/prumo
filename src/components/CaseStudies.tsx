// language: TypeScript, file: src/components/CaseStudies.tsx, target: Página Prumo
// Seção 02. Dois cases demonstrativos com cenário, gargalo, intervenção e resultado.
// A comparação antes/depois é barra proporcional ILUSTRATIVA: as proporções vêm do
// data file e os valores são placeholders marcados. O aviso de demonstração fica
// visível no topo da seção, não em nota de rodapé.

import { CASES, CASES_DISCLAIMER } from '../data/cases'
import { useReveal } from '../hooks/useReveal'
import { Icon } from './ui/Icon'
import { Placeholder } from './ui/Placeholder'
import { Prose } from './ui/Prose'
import { SectionHeading } from './ui/SectionHeading'

export function CaseStudies() {
  return (
    <section
      id="cases"
      aria-labelledby="cases-heading"
      className="bg-prumo-offwhite px-24 py-80 sm:px-32 sm:py-96"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-64">
        <SectionHeading
          eyebrow="Prova de valor"
          heading="Dois cenários, o mesmo método"
          lead="A estrutura abaixo é a que usamos para apresentar qualquer projeto: onde a empresa estava, qual gargalo apareceu na análise, o que foi executado e o que mudou."
        />

        {/* Aviso de demonstração — visível e no topo, conforme exigido pelo projeto. */}
        <p className="flex items-start gap-16 rounded-lg border border-dashed border-prumo-neutral/70 bg-prumo-sage/15 px-24 py-16 caption-4 text-prumo-graphite/80">
          <Icon name="alert" size={16} className="mt-[1px] shrink-0 text-prumo-forest" />
          {CASES_DISCLAIMER}
        </p>

        <div className="grid grid-cols-1 gap-40 lg:grid-cols-2">
          {CASES.map((item, index) => (
            <CaseCard key={item.id} study={item} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

type CaseCardProps = {
  study: (typeof CASES)[number]
  reverse: boolean
}

function CaseCard({ study, reverse }: CaseCardProps) {
  const { ref, isVisible } = useReveal<HTMLElement>({ threshold: 0.08 })
  const [before, after] = study.metrics

  return (
    <article
      ref={ref}
      data-visible={isVisible}
      className="reveal flex flex-col overflow-hidden rounded-2xl border border-prumo-graphite/12 bg-white"
    >
      <header className="flex flex-col gap-16 border-b border-prumo-line p-32 sm:p-40">
        <div className="flex items-center justify-between gap-16">
          <span className="caption-3 uppercase tracking-[0.14em] text-prumo-forest">
            {study.label}
          </span>
          <span className="caption-5 text-prumo-graphite/50">
            Duração: <Placeholder value={study.duration} />
          </span>
        </div>
        <p className="title-4 text-prumo-graphite/75">
          <Placeholder value={study.context} />
        </p>
      </header>

      <div className="flex flex-1 flex-col gap-32 p-32 sm:p-40">
        <Field label="Cenário inicial" text={study.scenario} />
        <Field label="Principal gargalo" text={study.bottleneck} />
        <Field label="Estratégia aplicada" text={study.intervention} />
        <Field label="Resultado" text={study.outcome} accent />
      </div>

      {/* Comparativo antes/depois */}
      <div className="border-t border-prumo-line bg-prumo-offwhite p-32 sm:p-40">
        <span className="caption-3 uppercase tracking-[0.14em] text-prumo-graphite/55">
          Indicador comparativo
        </span>

        <div className="mt-24 flex flex-col gap-24">
          {[before, after].map((metric, metricIndex) => (
            <div key={metric.label} className="flex flex-col gap-8">
              <div className="flex items-baseline justify-between gap-16">
                <span className="caption-4 text-prumo-graphite/70">{metric.label}</span>
                <span className="title-4 tabular-nums text-prumo-graphite">
                  <Placeholder value={metric.value} />
                </span>
              </div>
              <div className="h-[10px] w-full overflow-hidden rounded-full bg-prumo-line">
                <div
                  className={`h-full rounded-full transition-[width] duration-[900ms] ease-prumo ${
                    metricIndex === 0 ? 'bg-prumo-neutral' : 'bg-prumo-forest'
                  }`}
                  style={{ width: isVisible ? `${metric.ratio * 100}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-24 caption-5 text-prumo-graphite/50">
          Proporção ilustrativa da interface. Não é medição de cliente.
          {reverse ? ' Valores em placeholder.' : ''}
        </p>
      </div>
    </article>
  )
}

function Field({
  label,
  text,
  accent = false,
}: {
  label: string
  text: string
  accent?: boolean
}) {
  return (
    <div className="flex flex-col gap-12">
      <span
        className={`caption-3 uppercase tracking-[0.12em] ${
          accent ? 'text-prumo-forest' : 'text-prumo-graphite/50'
        }`}
      >
        {label}
      </span>
      <p className={`body-6 ${accent ? 'text-prumo-graphite' : 'text-prumo-graphite/75'}`}>
        <Prose as="span" text={text} />
      </p>
    </div>
  )
}
