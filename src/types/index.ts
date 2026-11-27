// language: TypeScript, file: src/types/index.ts, target: Página Prumo
// Contratos de dados da página. Todo conteúdo textual vive em src/data e é validado por estes tipos,
// para que trocar copy não exija tocar em componente.

export type NavItem = {
  label: string
  href: string
}

export type CaseStudy = {
  id: string
  label: string
  /** Setor e porte do cliente. Placeholder demonstrativo. */
  context: string
  /** Situação em que a empresa chegou. */
  scenario: string
  /** O gargalo central identificado no diagnóstico. */
  bottleneck: string
  /** O que a consultoria executou. */
  intervention: string
  /** O que mudou, em linguagem de gestão. */
  outcome: string
  /** Antes e depois de um indicador. Valores são placeholders explícitos. */
  metrics: [CaseMetric, CaseMetric]
  /** Duração real do engajamento. Placeholder. */
  duration: string
}

export type CaseMetric = {
  label: string
  /** Valor comparativo. Sempre um placeholder {{...}} — nunca dado inventado. */
  value: string
  /** Posição na barra comparativa, de 0 a 1. Ilustrativo. */
  ratio: number
}

export type MethodStep = {
  index: string
  name: string
  objective: string
  consultancy: string
  client: string
  expected: string
  /** Como esta etapa entrega a próxima. */
  handoff: string
  /** Prazo típico. Placeholder. */
  duration: string
  deliverables: string[]
}

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export type ValuePillar = {
  label: string
  title: string
  description: string
}

export type DiagnosticFormData = {
  name: string
  company: string
  email: string
  whatsapp: string
  role: string
  challenge: string
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export type FormErrors = Partial<Record<keyof DiagnosticFormData, string>>
