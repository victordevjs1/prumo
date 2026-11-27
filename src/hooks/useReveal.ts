// language: TypeScript, file: src/hooks/useReveal.ts, target: Página Prumo
// Reveal de seção conforme B7: sobe 32px e entra em opacidade, uma vez só.
// *Usar IntersectionObserver e não window.addEventListener('scroll'): o listener de scroll
//  roda a cada frame e derruba a performance no mobile. O observer dispara só na travessia.

import { useEffect, useRef, useState } from 'react'

type UseRevealOptions = {
  /** Margem do viewport em que o reveal dispara. Negativo atrasa, positivo antecipa. */
  rootMargin?: string
  /** Fração visível necessária para disparar. */
  threshold?: number
}

/** Movimento reduzido ou ambiente sem IntersectionObserver: revela sem animar. */
function shouldRevealImmediately(): boolean {
  if (typeof IntersectionObserver === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReveal<T extends HTMLElement = HTMLDivElement>({
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.15,
}: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null)
  // O estado já nasce correto quando não há animação a fazer, evitando um render extra.
  const [isVisible, setIsVisible] = useState(shouldRevealImmediately)

  useEffect(() => {
    const node = ref.current
    if (!node || isVisible) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // B7: revela uma vez. Não reproduz ao rolar de volta.
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, threshold, isVisible])

  return { ref, isVisible }
}
