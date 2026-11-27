// language: TypeScript, file: src/lib/whatsapp.ts, target: Página Prumo
// Montagem do link wa.me a partir dos dados do formulário.
//
// ============================================================================
//  MODO DEMONSTRAÇÃO. Nenhum dado é enviado a servidor. O link abre o WhatsApp
//  com a mensagem pré-montada para revisão manual do operador. O número é
//  placeholder e precisa ser substituído em src/data/site.ts antes de publicar.
//  Existe uma guarda abaixo que recusa montar link com número inválido.
// ============================================================================

import { CONTACT } from '../data/site'
import type { DiagnosticFormData } from '../types'

/** O número placeholder "{{whatsapp_numero}}" não passa daqui: só dígitos com 12 ou 13 posições. */
export function isWhatsappConfigured(): boolean {
  const digits = CONTACT.whatsappNumber.replace(/\D/g, '')
  return /^\d{12,13}$/.test(digits)
}

function buildMessage(data: DiagnosticFormData): string {
  const lines = [
    'Olá. Gostaria de agendar o diagnóstico estratégico de 30 minutos.',
    '',
    `Nome: ${data.name.trim()}`,
    `Empresa: ${data.company.trim()}`,
    `Cargo: ${data.role.trim()}`,
    `E-mail corporativo: ${data.email.trim()}`,
    `WhatsApp: ${data.whatsapp.trim()}`,
  ]

  const challenge = data.challenge.trim()
  if (challenge) {
    lines.push('', `Principal desafio: ${challenge}`)
  }

  return lines.join('\n')
}

/** Retorna null quando o número ainda é placeholder — a interface trata esse caso. */
export function buildWhatsappLink(data: DiagnosticFormData): string | null {
  if (!isWhatsappConfigured()) return null

  const digits = CONTACT.whatsappNumber.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(buildMessage(data))}`
}
