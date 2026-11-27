// language: TypeScript, file: src/components/ui/Icon.tsx, target: Página Prumo
// Ícones desenhados à mão em traço de 1.5, grade de 24.
// A skill (B6) aprova Phosphor, Solar e Iconamoon, mas proíbe Material Symbols e pede
// que nenhum ícone exista sem propósito. Desenhar aqui evita uma dependência de ~2 MB
// para oito glifos e mantém o traço consistente com a identidade editorial da página.

import type { SVGProps } from 'react'

export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'check'
  | 'menu'
  | 'close'
  | 'plus'
  | 'compass'
  | 'shuffle'
  | 'target'
  | 'banner'
  | 'quote'
  | 'alert'

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName
  /** Lado do quadrado em px. O traço escala junto para não perder peso. */
  size?: number
}

export function Icon({ name, size = 24, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}

const paths: Record<IconName, React.ReactNode> = {
  'arrow-right': (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  menu: (
    <>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m15 9-1.8 4.2L9 15l1.8-4.2Z" />
    </>
  ),
  shuffle: (
    <>
      <path d="M4 7h4l8 10h4" />
      <path d="M4 17h4l2-2.5" />
      <path d="m17 4 3 3-3 3" />
      <path d="m17 14 3 3-3 3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
    </>
  ),
  banner: (
    <>
      <path d="M6 3v18" />
      <path d="M6 5h11l-2.5 4L17 13H6" />
    </>
  ),
  quote: (
    <>
      <path d="M9 6c-2.8 1-4.5 3.4-4.5 6.5V18h5v-5.5H6.4c0-2 .9-3.4 2.6-4.2Z" />
      <path d="M19 6c-2.8 1-4.5 3.4-4.5 6.5V18h5v-5.5h-3.1c0-2 .9-3.4 2.6-4.2Z" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5" />
      <path d="M12 16h.01" />
    </>
  ),
}
