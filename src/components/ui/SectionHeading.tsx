// language: TypeScript, file: src/components/ui/SectionHeading.tsx, target: Página Prumo
// Cabeçalho de seção. Uma vez definido, garante que toda seção abra com a mesma
// hierarquia: eyebrow em Caption, heading em Heading 2 ou 3, lead em Body 3.

import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

type SectionHeadingProps = {
  eyebrow: string
  heading: string
  lead?: ReactNode
  /** Tema escuro inverte as cores sem alterar a hierarquia. */
  theme?: 'light' | 'dark'
  /** Nível real do heading no documento, para manter a hierarquia semântica correta. */
  as?: 'h2' | 'h3'
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  heading,
  lead,
  theme = 'light',
  as = 'h2',
  align = 'left',
}: SectionHeadingProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()
  const Heading = as

  const eyebrowColor = theme === 'dark' ? 'text-prumo-sage' : 'text-prumo-forest'
  const headingColor = theme === 'dark' ? 'text-white' : 'text-prumo-graphite'
  const leadColor = theme === 'dark' ? 'text-white/70' : 'text-prumo-graphite/75'

  return (
    <div
      ref={ref}
      data-visible={isVisible}
      className={`reveal flex flex-col gap-24 ${
        align === 'center' ? 'items-center text-center' : 'items-start'
      }`}
    >
      <span className={`caption-3 uppercase tracking-[0.16em] ${eyebrowColor}`}>{eyebrow}</span>

      <Heading className={`heading-2 max-w-[680px] ${headingColor}`}>{heading}</Heading>

      {lead ? <div className={`body-3 max-w-[680px] ${leadColor}`}>{lead}</div> : null}
    </div>
  )
}
