// language: TypeScript, file: src/components/Navbar.tsx, target: Página Prumo
// B7 — navbar flutuante, descolada do topo, centrada e dimensionada ao conteúdo,
// com superfície translúcida e blur. O toggle abre e fecha com transformação do ícone,
// o painel mobile ocupa a altura inteira, e os links entram em stagger de 60ms.

import { useEffect, useState } from 'react'
import { NAV_ITEMS, BRAND } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { Logo } from './ui/Logo'
import { Icon } from './ui/Icon'

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace('#', ''))

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const activeId = useActiveSection(SECTION_IDS)

  // Passado o primeiro trecho de rolagem, a barra ganha contraste para não perder
  // legibilidade sobre fundo escuro. Listener de scroll aqui é aceitável: só troca um
  // booleano e o trabalho real (observers) roda à parte.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Painel mobile aberto trava o scroll do documento e fecha no Esc.
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const shell = isScrolled
    ? 'bg-prumo-offwhite/85 border-prumo-line shadow-[0_2px_20px_-12px_rgba(32,37,34,0.35)]'
    : 'bg-prumo-offwhite/60 border-transparent'

  return (
    <>
      {/* B10: link de salto para o conteúdo, primeiro elemento focável da página. */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-24 focus:top-24 focus:z-[60] focus:rounded-lg focus:bg-prumo-forest focus:px-24 focus:py-16 focus:text-white focus:button-sm"
      >
        Pular para o conteúdo
      </a>

      {/* O container do header é fixed e ocupa a faixa superior da viewport inteira.
          Sem pointer-events-none, essa faixa transparente engole cliques em qualquer
          coisa que passe por baixo — exatamente o que o navegador acusou ao tentar
          clicar no botão do formulário com a página rolada. Só a pílula da navbar
          volta a receber ponteiro. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-16 pt-24 sm:pt-32">
        <nav
          aria-label="Navegação principal"
          className={`pointer-events-auto flex w-full max-w-[1080px] items-center justify-between gap-24 rounded-2xl border px-24 py-16 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ease-prumo sm:px-32 ${shell}`}
        >
          <a
            href="#topo"
            className="rounded-md press"
            aria-label={`${BRAND.name} — início`}
          >
            <Logo />
          </a>

          {/* Desktop: navegação inline. O item ativo fica marcado, conforme B9. */}
          <ul className="hidden items-center gap-12 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.href.replace('#', '')
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`inline-flex rounded-md px-16 py-8 press button-sm ${
                      isActive
                        ? 'text-prumo-forest bg-prumo-sage/25'
                        : 'text-prumo-graphite/70 hover:text-prumo-graphite hover:bg-prumo-graphite/[0.05]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-12">
            <a
              href="#diagnostico"
              className="hidden rounded-lg border border-prumo-forest bg-prumo-forest px-24 py-12 press button-sm text-white hover:border-prumo-forest-deep hover:bg-prumo-forest-deep sm:inline-flex"
            >
              Agendar diagnóstico
            </a>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="menu-mobile"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-prumo-graphite/20 press text-prumo-graphite hover:bg-prumo-graphite/[0.05] lg:hidden"
            >
              {/* Transformação em vez de troca instantânea: o mesmo glifo gira e vira X. */}
              <span className="relative block size-[18px]">
                <span
                  className={`absolute left-0 block h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-500 ease-prumo ${
                    isOpen ? 'top-[8px] rotate-45' : 'top-[4px]'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-[18px] rounded-full bg-current transition-transform duration-500 ease-prumo ${
                    isOpen ? 'top-[8px] -rotate-45' : 'top-[12px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* B7 — menu mobile em painel de altura inteira, não dropdown. */}
      <div
        id="menu-mobile"
        hidden={!isOpen}
        className="fixed inset-0 z-40 bg-prumo-graphite/95 backdrop-blur-2xl lg:hidden"
      >
        <div className="flex h-full flex-col justify-between px-24 pb-40 pt-[104px]">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeId === item.href.replace('#', '')
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    style={{ transitionDelay: isOpen ? `${index * 60}ms` : '0ms' }}
                    className={`block border-b border-prumo-line-dark py-24 transition-[opacity,transform] duration-500 ease-prumo heading-5 ${
                      isOpen ? 'translate-y-0 opacity-100' : 'translate-y-300 opacity-0'
                    } ${isActive ? 'text-prumo-sage' : 'text-white/80'}`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex flex-col gap-24">
            <a
              href="#diagnostico"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-8 rounded-lg border border-white bg-white px-32 py-24 press button-md text-prumo-forest hover:bg-prumo-offwhite"
            >
              Agendar diagnóstico
              <Icon name="arrow-right" size={18} />
            </a>
            <p className="caption-3 text-prumo-sage">
              Diagnóstico de 30 minutos, sem custo e sem compromisso.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
