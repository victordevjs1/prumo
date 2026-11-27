// language: TypeScript, file: src/components/Footer.tsx, target: Página Prumo
// B10 — rodapé com links legais, navegação, contato e year dinâmico.
// A navegação usa NAV_ITEMS: o item atual já é indicado na navbar por observer.

import { CONTACT, FOOTER, NAV_ITEMS } from '../data/site'
import { Icon } from './ui/Icon'
import { Logo } from './ui/Logo'
import { Placeholder } from './ui/Placeholder'

/** Ano corrente resolvido uma vez no carregamento, fora do caminho de render. */
const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const year = CURRENT_YEAR

  return (
    <footer className="border-t border-prumo-line-dark bg-prumo-graphite px-24 py-64 sm:px-32 sm:py-80">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-48">
        <div className="flex flex-col gap-40 lg:flex-row lg:justify-between lg:gap-80">
          <div className="flex flex-col gap-24 lg:max-w-[420px]">
            <Logo theme="dark" />
            <p className="body-6 text-white/60">{FOOTER.statement}</p>
          </div>

          <div className="grid grid-cols-1 gap-40 sm:grid-cols-3 sm:gap-48 lg:gap-80">
            <nav aria-label="Seções da página" className="flex flex-col gap-16">
              <span className="caption-3 uppercase tracking-[0.14em] text-prumo-sage">
                {FOOTER.columnsTitle}
              </span>
              <ul className="flex flex-col gap-16">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="press caption-2 text-white/65 hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#diagnostico"
                    className="press caption-2 text-white/65 hover:text-white"
                  >
                    Diagnóstico
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex flex-col gap-16">
              <span className="caption-3 uppercase tracking-[0.14em] text-prumo-sage">
                {FOOTER.contactTitle}
              </span>
              <ul className="flex flex-col gap-16">
                <li className="caption-2 text-white/65">
                  <a href={`mailto:${CONTACT.email}`} className="press hover:text-white">
                    <Placeholder value={CONTACT.email} />
                  </a>
                </li>
                <li className="caption-2 text-white/65">
                  <Placeholder value={CONTACT.phone} />
                </li>
                <li className="caption-2 text-white/65">
                  <Placeholder value={CONTACT.whatsappDisplay} />
                </li>
                <li className="caption-5 text-white/45">
                  <Placeholder value={CONTACT.hours} />
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-16">
              <span className="caption-3 uppercase tracking-[0.14em] text-prumo-sage">
                Atendimento
              </span>
              <ul className="flex flex-col gap-16">
                <li className="caption-2 text-white/65">
                  <Placeholder value={CONTACT.city} />
                </li>
                <li className="flex items-center gap-12 caption-5 text-white/45">
                  <Icon name="check" size={14} className="shrink-0 text-prumo-sage" />
                  Reuniões remotas
                </li>
                <li className="flex items-center gap-12 caption-5 text-white/45">
                  <Icon name="check" size={14} className="shrink-0 text-prumo-sage" />
                  Presencial sob escopo
                </li>
              </ul>

              <a
                href="#diagnostico"
                className="mt-12 inline-flex w-fit items-center gap-8 press button-sm text-prumo-sage hover:text-white"
              >
                Agendar diagnóstico
                <Icon name="arrow-right" size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-24 border-t border-prumo-line-dark pt-40 sm:flex-row sm:items-center sm:justify-between">
          <p className="caption-5 text-white/45">
            © {year} Método Prumo. Todos os direitos reservados.
          </p>

          <ul className="flex flex-wrap gap-x-32 gap-y-12">
            {FOOTER.legal.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="press caption-5 text-white/45 hover:text-white/80"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Aviso de escopo: deixa explícito o que é real e o que é demonstração. */}
        <p className="rounded-lg border border-dashed border-white/20 px-24 py-16 caption-5 text-white/50">
          Página demonstrativa. Indicadores, prazos, faixas de investimento, contatos e a
          estrutura dos cases estão marcados como placeholder e precisam ser substituídos por
          dados reais antes de qualquer uso comercial.
        </p>
      </div>
    </footer>
  )
}
