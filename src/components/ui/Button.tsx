// language: TypeScript, file: src/components/ui/Button.tsx, target: Página Prumo
// Botão único do sistema. Estado ativo com scale(0.98) conforme B9, foco visível
// herdado do :focus-visible global, e nenhuma transição com curva default do browser (B7).

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = {
  variant?: Variant
  size?: Size
  icon?: IconName
  children: ReactNode
} & (
  | ({ as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: 'a' } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
)

/** B2: botão principal com 8px vertical e 12px horizontal, crescendo com o tamanho. */
const sizeClasses: Record<Size, string> = {
  sm: 'px-12 py-8 gap-8 button-sm',
  md: 'px-16 py-12 gap-8 button-md',
  lg: 'px-24 py-16 gap-12 button-lg',
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-prumo-forest text-white hover:bg-prumo-forest-deep border border-prumo-forest hover:border-prumo-forest-deep',
  secondary:
    'bg-transparent text-prumo-graphite border border-prumo-graphite/25 hover:border-prumo-graphite/60 hover:bg-prumo-graphite/[0.04]',
  ghost:
    'bg-transparent text-prumo-graphite border border-transparent hover:bg-prumo-graphite/[0.05]',
  inverse:
    'bg-white text-prumo-forest border border-white hover:bg-prumo-offwhite hover:border-prumo-offwhite',
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center text-center',
    'rounded-lg press cursor-pointer select-none',
    'disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none',
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span>{children}</span>
      {icon ? <Icon name={icon} size={18} className="shrink-0" /> : null}
    </>
  )

  if (rest.as === 'a') {
    const { as: _as, ...anchorProps } = rest
    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    )
  }

  const { as: _as, ...buttonProps } = rest
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  )
}
