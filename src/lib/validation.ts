// language: TypeScript, file: src/lib/validation.ts, target: Página Prumo
// Validação de formulário do lado do cliente (B10). Erros em linguagem direta, dizendo
// o que falhou e o que fazer — nunca window.alert.

import type { DiagnosticFormData, FormErrors } from '../types'

/** Blocos de domínio descartáveis, para não aceitar e-mail corporativo digitado errado. */
const DISPOSABLE_HINTS = ['mailinator', 'tempmail', '10minutemail', 'guerrillamail']

export function validateField<K extends keyof DiagnosticFormData>(
  field: K,
  value: string,
): string | undefined {
  const trimmed = value.trim()

  switch (field) {
    case 'name': {
      if (!trimmed) return 'Informe seu nome.'
      if (trimmed.length < 3) return 'Nome muito curto.'
      return undefined
    }

    case 'company': {
      if (!trimmed) return 'Informe o nome da empresa.'
      if (trimmed.length < 2) return 'Nome da empresa muito curto.'
      return undefined
    }

    case 'email': {
      if (!trimmed) return 'Informe seu e-mail corporativo.'
      // Validação pragmática: um @, domínio com ponto, sem espaços.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
        return 'E-mail inválido. Confira o endereço digitado.'
      }
      const domain = trimmed.split('@')[1]?.toLowerCase() ?? ''
      if (DISPOSABLE_HINTS.some((hint) => domain.includes(hint))) {
        return 'Use um e-mail corporativo. Dominadores temporários não são aceitos.'
      }
      return undefined
    }

    case 'whatsapp': {
      const digits = trimmed.replace(/\D/g, '')
      if (!digits) return 'Informe um número com DDD.'
      if (digits.length < 10 || digits.length > 11) {
        return 'Número incompleto. Use DDD mais o número.'
      }
      return undefined
    }

    case 'role': {
      if (!trimmed) return 'Informe seu cargo.'
      return undefined
    }

    case 'challenge':
      // Campo opcional: nunca bloqueia o envio.
      return undefined

    default:
      return undefined
  }
}

export function validateForm(data: DiagnosticFormData): FormErrors {
  const errors: FormErrors = {}

  for (const key of Object.keys(data) as Array<keyof DiagnosticFormData>) {
    const message = validateField(key, data[key])
    if (message) errors[key] = message
  }

  return errors
}
