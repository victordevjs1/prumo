// language: TypeScript, file: src/components/ui/Placeholder.tsx, target: Página Prumo
// Marca visualmente todo dado ainda não substituído. O projeto não pode exibir um placeholder
// cru sem sinalização, senão um número demonstrativo passa por dado real.

import { isPlaceholder } from '../../lib/format'

type PlaceholderProps = {
  value: string
  className?: string
}

export function Placeholder({ value, className = '' }: PlaceholderProps) {
  if (!isPlaceholder(value)) {
    return <span className={className}>{value}</span>
  }

  return (
    <span
      className={`rounded-sm border border-dashed border-prumo-neutral/60 bg-prumo-sage/20 px-2 py-2 font-medium text-prumo-forest ${className}`}
      title="Dado demonstrativo. Substituir pelo valor real antes de publicar."
    >
      {value}
    </span>
  )
}
