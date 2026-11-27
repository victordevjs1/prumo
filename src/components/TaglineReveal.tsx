// language: TypeScript, file: src/components/TaglineReveal.tsx, target: Página Prumo
// B11 — seção obrigatória. Duas linhas de texto grande, cada palavra acendendo sozinha
// ao cruzar a linha de gatilho, na ordem de leitura, na curva base. Sob movimento
// reduzido o texto aparece inteiro de uma vez.

import { useMemo } from 'react'
import { TAGLINE_REVEAL } from '../data/site'
import { useTaglineReveal } from '../hooks/useTaglineReveal'
import { countWords } from '../lib/format'

/** Índice global de cada palavra, pré-calculado. O contador vive no dado, não no render. */
const WORD_INDEX: number[][] = (() => {
  let cursor = 0
  return TAGLINE_REVEAL.lines.map((line) =>
    line.split(' ').map(() => {
      const index = cursor
      cursor += 1
      return index
    }),
  )
})()

export function TaglineReveal() {
  const total = useMemo(
    () => TAGLINE_REVEAL.lines.reduce((sum, line) => sum + countWords(line), 0),
    [],
  )

  const { containerRef, wordRefs, activeCount } = useTaglineReveal(total)

  return (
    <section
      id="tagline" aria-labelledby="tagline-heading"
      className="bg-prumo-graphite px-24 py-80 sm:px-32 sm:py-96"
    >
      <div className="mx-auto max-w-[1280px]">
        <h2 id="tagline-heading" className="sr-only">
          Por que a margem se perde
        </h2>

        <p ref={containerRef} className="heading-3 max-w-[880px] text-white/25 sm:heading-2">
          {TAGLINE_REVEAL.lines.map((line, lineIndex) => (
            <span key={line} className="block">
              {line.split(' ').map((word, wordIndex) => {
                const index = WORD_INDEX[lineIndex][wordIndex]
                const isActive = index < activeCount

                return (
                  <span
                    key={`${word}-${index}`}
                    ref={(node) => {
                      wordRefs.current[index] = node
                    }}
                    data-word-index={index}
                    className={`inline-block transition-colors duration-500 ease-prumo ${
                      isActive ? 'text-white' : 'text-white/25'
                    }`}
                  >
                    {word}
                    {lineIndex < TAGLINE_REVEAL.lines.length ? '\u00A0' : ''}
                  </span>
                )
              })}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
