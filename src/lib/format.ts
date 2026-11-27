// language: TypeScript, file: src/lib/format.ts, target: Página Prumo
// Utilitários puros. Sem dependência externa — o projeto não precisa de biblioteca de máscara
// para dois formatadores.

/** Aplica máscara de telefone brasileiro conforme os dígitos entram: (11) 91234-5678. */
export function formatWhatsapp(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 11)

  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

/** Conta palavras de um trecho, para dimensionar o reveal da tagline. */
export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

/**
 * Detecta um placeholder não substituído, no formato {{algo}}.
 * Usado na interface para sinalizar visualmente que o dado é demonstrativo.
 */
export function isPlaceholder(value: string): boolean {
  return /\{\{[^}]+\}\}/.test(value)
}
