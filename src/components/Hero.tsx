// language: TypeScript, file: src/components/Hero.tsx, target: Página Prumo
// Seção 01. B5 — heading e subheading com largura máxima de 680px e quebra de linha
// inserida em ponto significativo, nunca cortando a frase no meio.
// O painel à direita é composição ilustrativa: réguas literais (8 / 12 / 20 / 32) e
// rótulos legíveis, sem parecer dado real de cliente.

import { HERO, HERO_PANEL } from '../data/site'
import { Button } from './ui/Button'
import { Icon } from './ui/Icon'

export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-prumo-offwhite px-24 pb-64 pt-[168px] sm:px-32 sm:pb-80 sm:pt-[200px] lg:pb-96"
    >
      {/* Grid editorial de fundo: linhas verticais discretas, herança de papel milimetrado.
          Sem gradiente — a skill proíbe gradiente em fundo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto hidden max-w-[1280px] grid-cols-4 px-32 lg:grid"
      >
        {[0, 1, 2, 3].map((column) => (
          <div key={column} className="border-l border-prumo-line/60 last:border-r" />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-[1280px] gap-64 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-center lg:gap-80">
        {/* ---- Coluna de copy ---- */}
        <div className="flex flex-col items-start gap-32">
          <span className="inline-flex items-center gap-8 rounded-full border border-prumo-graphite/15 bg-white/70 px-16 py-8 caption-4 text-prumo-forest">
            <span aria-hidden="true" className="size-[6px] rounded-full bg-prumo-forest" />
            {HERO.eyebrow}
          </span>

          {/* B5: gradiente apenas no texto do heading, do grafite para o cinza. */}
          <h1 id="hero-heading" className="hero-heading-gradient heading-1 max-w-[680px]">
            Decidir com número na mão,
            <br />
            não com sensação
          </h1>

          <p className="body-3 max-w-[680px] text-prumo-graphite/75">{HERO.subheadline}</p>

          <div className="flex flex-col gap-16 sm:flex-row sm:items-center sm:gap-24">
            <Button as="a" href="#diagnostico" size="lg" icon="arrow-right">
              {HERO.ctaPrimary}
            </Button>
            <Button as="a" href="#metodo" variant="secondary" size="lg">
              {HERO.ctaSecondary}
            </Button>
          </div>

          {/* Prova imediatamente abaixo do CTA, conforme A4: prova ao lado da afirmação. */}
          <p className="body-6 max-w-[560px] border-l-2 border-prumo-sage pl-24 text-prumo-graphite/65">
            {HERO.proofLine}
          </p>

          <ul className="flex flex-col gap-12 sm:flex-row sm:flex-wrap sm:gap-x-32">
            {HERO.credentials.map((item) => (
              <li key={item} className="flex items-center gap-12 caption-4 text-prumo-graphite/70">
                <Icon name="check" size={16} className="shrink-0 text-prumo-forest" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Painel ilustrativo ---- */}
        <figure className="flex flex-col gap-16">
          <div className="rounded-2xl border border-prumo-graphite/12 bg-white p-24 sm:p-32">
            <div className="flex items-baseline justify-between gap-16 border-b border-prumo-line pb-24">
              <span className="caption-3 uppercase tracking-[0.14em] text-prumo-graphite/55">
                Estrutura de resultado
              </span>
              <span className="caption-5 text-prumo-graphite/45">12 meses</span>
            </div>

            <div className="flex flex-col gap-24 pt-32">
              {HERO_PANEL.rows.map((row, index) => (
                <div key={row.id} className="flex flex-col gap-8">
                  <div className="flex items-baseline justify-between gap-16">
                    <span className="title-4 text-prumo-graphite/80">{row.label}</span>
                    <span className="caption-4 tabular-nums text-prumo-graphite">
                      {row.mark}
                    </span>
                  </div>

                  {/* Barra proporcional. É régua gráfica, não medição de cliente. */}
                  <div className="h-[6px] w-full overflow-hidden rounded-full bg-prumo-offwhite">
                    <div
                      className={`h-full rounded-full ${
                        index === HERO_PANEL.rows.length - 1
                          ? 'bg-prumo-forest'
                          : 'bg-prumo-sage'
                      }`}
                      style={{ width: `${row.width * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bloco de desvios: o que o diagnóstico procura. */}
          <div className="rounded-2xl border border-prumo-graphite/12 bg-prumo-graphite p-24 sm:p-32">
            <div className="flex items-center gap-12 pb-24">
              <Icon name="alert" size={16} className="text-prumo-sage" />
              <span className="caption-3 uppercase tracking-[0.14em] text-prumo-sage">
                O que costuma aparecer
              </span>
            </div>
            <ul className="flex flex-col gap-16">
              {HERO_PANEL.flags.map((flag) => (
                <li
                  key={flag}
                  className="flex items-start gap-16 border-t border-prumo-line-dark pt-16 body-6 text-white/75 first:border-t-0 first:pt-0"
                >
                  <span aria-hidden="true" className="mt-[7px] size-[5px] shrink-0 rounded-full bg-prumo-sage" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>

          <figcaption className="caption-5 text-prumo-graphite/50">
            {HERO_PANEL.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
