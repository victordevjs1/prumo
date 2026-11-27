// language: TypeScript, file: src/hooks/useActiveSection.ts, target: Página Prumo
// B9: o item de navegação da seção atual precisa estar indicado. Um único observer
// acompanha todas as âncoras e marca a que estiver mais próxima do topo da janela.

import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Mantém a entrada mais visível entre as que estão cruzando a faixa de leitura.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      // Faixa estreita no meio da tela evita alternar entre duas seções na emenda.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
