// language: TypeScript, file: src/hooks/useTaglineReveal.ts, target: Página Prumo
// B11 — revelação da tagline palavra por palavra, na ordem de leitura, conforme o texto
// cruza a linha de gatilho. Cada palavra tem seu próprio observer.
// *Um observer por palavra e não um listener de scroll com requestAnimationFrame: o custo é
//  O(n) só na travessia e o texto longo (30+ palavras) continua suave no mobile.

import { useEffect, useRef, useState } from 'react'

/** Movimento reduzido ou ambiente sem IntersectionObserver: texto entra inteiro. */
function shouldRevealImmediately(): boolean {
  if (typeof IntersectionObserver === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useTaglineReveal(wordCount: number) {
  const containerRef = useRef<HTMLParagraphElement | null>(null)
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([])
  // Com movimento reduzido o estado já nasce completo: nenhuma palavra fica apagada.
  const [activeCount, setActiveCount] = useState(() =>
    shouldRevealImmediately() ? wordCount : 0,
  )

  useEffect(() => {
    wordRefs.current = wordRefs.current.slice(0, wordCount)

    if (shouldRevealImmediately()) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = Number((entry.target as HTMLElement).dataset.wordIndex)
          if (Number.isNaN(index)) continue
          // Marca a palavra mais avançada já ativada: a leitura nunca retrocede.
          setActiveCount((current) => Math.max(current, index + 1))
          observer.unobserve(entry.target)
        }
      },
      {
        // A linha de gatilho fica na metade inferior: a palavra acende quando entra em cena.
        rootMargin: '0px 0px -35% 0px',
        threshold: 0,
      },
    )

    for (const node of wordRefs.current) {
      if (node) observer.observe(node)
    }
    return () => observer.disconnect()
  }, [wordCount])

  return { containerRef, wordRefs, activeCount }
}
