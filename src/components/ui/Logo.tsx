// language: TypeScript, file: src/components/ui/Logo.tsx, target: Página Prumo
// Marca do Método Prumo. O glifo é o prumo: linha vertical, massa na base e o fio de
// referência. É o instrumento que dá nome ao método, então funciona como símbolo.

type LogoProps = {
  theme?: 'light' | 'dark'
  /** Mostra o nome ao lado do glifo. */
  withWordmark?: boolean
  className?: string
}

export function Logo({ theme = 'light', withWordmark = true, className = '' }: LogoProps) {
  const textColor = theme === 'dark' ? 'text-white' : 'text-prumo-graphite'
  const markColor = theme === 'dark' ? 'text-prumo-sage' : 'text-prumo-forest'

  return (
    <span className={`inline-flex items-center gap-8 ${className}`}>
      <svg
        width="22"
        height="26"
        viewBox="0 0 22 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={markColor}
        aria-hidden="true"
        focusable="false"
      >
        {/* fio de prumo */}
        <path d="M11 1.5v16" />
        {/* massa na base */}
        <path d="m11 25-4.5-7.5h9L11 25Z" />
        {/* referência horizontal */}
        <path d="M4.5 5.5h13" />
      </svg>

      {withWordmark ? (
        <span className={`title-2 tracking-[-0.02em] ${textColor}`}>
          Método Prumo
        </span>
      ) : null}
    </span>
  )
}
