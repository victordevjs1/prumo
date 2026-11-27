// language: TypeScript, file: src/components/ui/Prose.tsx, target: Página Prumo
// Texto corrido que pode conter placeholders {{...}} no meio da frase.
//
// O componente Placeholder resolve o caso em que o valor inteiro é um campo. Aqui o
// problema é outro: frases longas de case e de FAQ carregam {{prazo_fechamento}},
// {{faixa_investimento}} e afins dentro do parágrafo. Sem marcação, um placeholder cru
// passa por dado apurado. Este componente quebra o texto e marca cada ocorrência.

import { Fragment, type ReactNode } from 'react'
import { isPlaceholder } from '../../lib/format'

type ProseProps = {
  text: string
  className?: string
  /** Elemento do parágrafo. Use 'span' quando o pai já for um <p>. */
  as?: 'p' | 'span' | 'div'
}

const PLACEHOLDER_PATTERN = /(\{\{[^}]+\}\})/g

export function Prose({ text, className = '', as = 'p' }: ProseProps) {
  const Tag = as
  const parts = text.split(PLACEHOLDER_PATTERN)

  const nodes: ReactNode[] = parts.map((part, index) => {
    if (!isPlaceholder(part)) return <Fragment key={index}>{part}</Fragment>

    return (
      <span
        key={index}
        title="Dado demonstrativo. Substituir pelo valor real antes de publicar."
        className="whitespace-nowrap rounded-sm border border-dashed border-prumo-neutral/60 bg-prumo-sage/20 px-1 font-medium text-prumo-forest"
      >
        {part}
      </span>
    )
  })

  return <Tag className={className}>{nodes}</Tag>
}
