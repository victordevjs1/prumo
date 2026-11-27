// language: TypeScript, file: src/components/DiagnosticSection.tsx, target: Página Prumo
// Seção 05 — conversão. Oferta de diagnóstico de 30 minutos com o que é analisado, o que
// acontece depois, para quem é e o formulário completo com validação, estado de erro,
// carregamento e confirmação.
//
// ============================================================================
//  NÃO HÁ BACKEND. O envio é uma demonstração: o formulário valida, simula a
//  latência de rede e então abre uma conversa de WhatsApp com a mensagem
//  pré-montada, para o operador revisar antes de enviar. Nenhum dado sai da
//  página por conta própria. O número é placeholder (src/data/site.ts) e a
//  interface avisa quando ele ainda não foi configurado.
// ============================================================================

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { AGENDA, DIAGNOSTIC_SECTION, FORM_COPY } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { formatWhatsapp } from '../lib/format'
import { validateField, validateForm } from '../lib/validation'
import { buildWhatsappLink, isWhatsappConfigured } from '../lib/whatsapp'
import type { DiagnosticFormData, FormErrors, FormStatus } from '../types'
import { Icon } from './ui/Icon'
import { Prose } from './ui/Prose'
import { SectionHeading } from './ui/SectionHeading'

const EMPTY_FORM: DiagnosticFormData = {
  name: '',
  company: '',
  email: '',
  whatsapp: '',
  role: '',
  challenge: '',
}

export function DiagnosticSection() {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ threshold: 0.05 })

  return (
    <section
      id="diagnostico"
      aria-labelledby="diagnostico-heading"
      className="bg-prumo-forest px-24 py-80 sm:px-32 sm:py-96"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-64">
        <SectionHeading
          eyebrow={DIAGNOSTIC_SECTION.eyebrow}
          heading={DIAGNOSTIC_SECTION.heading}
          lead={DIAGNOSTIC_SECTION.lead}
          theme="dark"
        />

        <div
          ref={ref}
          data-visible={isVisible}
          className="reveal grid grid-cols-1 gap-48 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-80"
        >
          <DiagnosticBrief />
          <DiagnosticForm />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Coluna esquerda: o que acontece na conversa                        */
/* ------------------------------------------------------------------ */

function DiagnosticBrief() {
  return (
    <div className="flex flex-col gap-48">
      <ol className="flex flex-col gap-32">
        {DIAGNOSTIC_SECTION.whatHappens.map((item) => (
          <li key={item.step} className="flex gap-24">
            <span className="caption-3 tabular-nums text-prumo-sage">{item.step}</span>
            <div className="flex flex-col gap-8">
              <h3 className="title-3 text-white">{item.title}</h3>
              <Prose text={item.detail} className="body-6 text-white/70" />
            </div>
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-1 gap-40 border-t border-prumo-line-dark pt-40 sm:grid-cols-2">
        <div className="flex flex-col gap-16">
          <span className="caption-3 uppercase tracking-[0.14em] text-prumo-sage">
            Quem deve agendar
          </span>
          <ul className="flex flex-col gap-12">
            {DIAGNOSTIC_SECTION.audience.map((item) => (
              <li key={item} className="flex items-start gap-16 body-6 text-white/70">
                <Icon name="check" size={15} className="mt-[3px] shrink-0 text-prumo-sage" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-16">
          <span className="caption-3 uppercase tracking-[0.14em] text-prumo-sage">
            O que você não recebe
          </span>
          <ul className="flex flex-col gap-12">
            {DIAGNOSTIC_SECTION.noCommitment.map((item) => (
              <li key={item} className="flex items-start gap-16 body-6 text-white/70">
                <span
                  aria-hidden="true"
                  className="mt-[7px] size-[5px] shrink-0 rounded-full bg-prumo-sage"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="body-6 border-t border-prumo-line-dark pt-40 text-white/60">
        {DIAGNOSTIC_SECTION.afterText}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Coluna direita: formulário                                         */
/* ------------------------------------------------------------------ */

function DiagnosticForm() {
  const [data, setData] = useState<DiagnosticFormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null)

  const whatsappReady = isWhatsappConfigured()

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const field = event.target.name as keyof DiagnosticFormData
    const raw = event.target.value
    const value = field === 'whatsapp' ? formatWhatsapp(raw) : raw

    setData((current) => ({ ...current, [field]: value }))

    // Limpa o erro do campo assim que o operador corrige, sem revalidar o resto.
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
    if (status === 'error') setStatus('idle')
  }

  function handleBlur(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const field = event.target.name as keyof DiagnosticFormData
    const message = validateField(field, data[field])
    setErrors((current) => ({ ...current, [field]: message }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateForm(data)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')

      // Move o foco para o primeiro campo com problema, em vez de só pintar de vermelho.
      const firstInvalid = Object.keys(nextErrors)[0]
      const node = document.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
      node?.focus()
      return
    }

    setStatus('submitting')

    // Latência simulada: deixa o estado de carregamento visível e honesto.
    await new Promise((resolve) => window.setTimeout(resolve, 900))

    setWhatsappLink(buildWhatsappLink(data))
    setStatus('success')
  }

  function handleReset() {
    setData(EMPTY_FORM)
    setErrors({})
    setStatus('idle')
    setWhatsappLink(null)
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-32 rounded-2xl border border-white/15 bg-white p-40 sm:p-48">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-prumo-sage/30 text-prumo-forest">
          <Icon name="check" size={20} />
        </span>

        <div className="flex flex-col gap-16">
          <h3 className="heading-5 text-prumo-graphite">{FORM_COPY.successTitle}</h3>
          <p className="body-6 text-prumo-graphite/70">{FORM_COPY.successBody}</p>
        </div>

        <div className="flex flex-col gap-16 sm:flex-row">
          {whatsappLink ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-8 rounded-lg border border-prumo-forest bg-prumo-forest px-32 py-24 press button-sm text-white hover:bg-prumo-forest-deep"
            >
              {FORM_COPY.successWhatsapp}
              <Icon name="arrow-up-right" size={16} />
            </a>
          ) : (
            <p className="rounded-lg border border-dashed border-prumo-neutral/70 bg-prumo-sage/15 px-24 py-16 caption-4 text-prumo-graphite/80">
              Número de WhatsApp ainda não configurado. Substitua
              <code className="mx-2 rounded-sm bg-prumo-offwhite px-2">
                CONTACT.whatsappNumber
              </code>
              em src/data/site.ts para ativar o envio.
            </p>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-lg border border-prumo-graphite/25 px-32 py-24 press button-sm text-prumo-graphite hover:border-prumo-graphite/60"
          >
            Enviar outra solicitação
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="form-heading"
      className="flex flex-col gap-40 rounded-2xl border border-white/15 bg-white p-40 sm:p-48"
    >
      <div className="flex flex-col gap-16">
        <h3 id="form-heading" className="heading-5 text-prumo-graphite">
          {FORM_COPY.heading}
        </h3>
        <p className="body-6 text-prumo-graphite/65">{FORM_COPY.subheading}</p>
      </div>

      {/* Vaga de agenda — elemento demonstrativo, sinalizado como tal. */}
      {AGENDA.isDemo ? (
        <p className="flex items-start gap-16 rounded-lg border border-dashed border-prumo-neutral/70 bg-prumo-sage/15 px-24 py-16 caption-4 text-prumo-graphite/80">
          <Icon name="alert" size={16} className="mt-[1px] shrink-0 text-prumo-forest" />
          Agenda demonstrativa: {AGENDA.slotsLabel} vagas em {AGENDA.monthLabel}. Não é
          escassez real e deve ser editada em src/data/site.ts.
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-32 sm:grid-cols-2">
        <Field
          name="name"
          label="Nome"
          autoComplete="name"
          value={data.name}
          error={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <Field
          name="company"
          label="Empresa"
          autoComplete="organization"
          value={data.company}
          error={errors.company}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <Field
          name="email"
          label="E-mail corporativo"
          type="email"
          autoComplete="email"
          value={data.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <Field
          name="whatsapp"
          label="WhatsApp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(11) 91234-5678"
          value={data.whatsapp}
          error={errors.whatsapp}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <Field
          name="role"
          label="Cargo"
          autoComplete="organization-title"
          value={data.role}
          error={errors.role}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className="sm:col-span-2"
        />

        <div className="flex flex-col gap-12 sm:col-span-2">
          <label htmlFor="challenge" className="caption-3 uppercase tracking-[0.12em] text-prumo-graphite/60">
            Principal desafio <span className="text-prumo-graphite/40">(opcional)</span>
          </label>
          <textarea
            id="challenge"
            name="challenge"
            rows={3}
            value={data.challenge}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex.: margem caindo com receita crescendo e fechamento contábil sempre atrasado."
            className="w-full resize-y rounded-lg border border-prumo-graphite/20 bg-prumo-offwhite/60 px-24 py-16 body-6 text-prumo-graphite placeholder:text-prumo-graphite/40 transition-colors duration-300 ease-prumo focus:border-prumo-forest focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Estado de erro agregado: diz o que falhou e o que fazer. */}
      {status === 'error' ? (
        <div
          role="alert"
          className="flex items-start gap-16 rounded-lg border border-prumo-graphite/25 bg-prumo-offwhite px-24 py-16"
        >
          <Icon name="alert" size={17} className="mt-[1px] shrink-0 text-prumo-graphite" />
          <div className="flex flex-col gap-2">
            <span className="body-4 text-prumo-graphite">{FORM_COPY.errorTitle}</span>
            <span className="caption-2 text-prumo-graphite/70">{FORM_COPY.errorBody}</span>
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex w-full items-center justify-center gap-8 rounded-lg border border-prumo-forest bg-prumo-forest px-32 py-24 press button-md text-white hover:border-prumo-forest-deep hover:bg-prumo-forest-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            {/* Skeleton em vez de spinner: barra que corre, alinhada ao layout real. */}
            <span
              aria-hidden="true"
              className="h-[2px] w-6 overflow-hidden rounded-full bg-white/30"
            >
              <span className="block h-full w-1/2 animate-[loading_900ms_ease-in-out_infinite] rounded-full bg-white" />
            </span>
            {FORM_COPY.submitting}
          </>
        ) : (
          <>
            {FORM_COPY.submit}
            <Icon name="arrow-right" size={18} />
          </>
        )}
      </button>

      <ul className="flex flex-wrap gap-x-32 gap-y-12">
        {FORM_COPY.trust.map((item) => (
          <li key={item} className="flex items-center gap-12 caption-5 text-prumo-graphite/60">
            <Icon name="check" size={14} className="shrink-0 text-prumo-forest" />
            {item}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-12 border-t border-prumo-line pt-32">
        <p className="caption-5 text-prumo-graphite/55">{FORM_COPY.privacy}</p>
        <p className="caption-5 text-prumo-graphite/45">
          {FORM_COPY.demoNotice}
          {!whatsappReady ? ' O número ainda não foi configurado.' : ''}
        </p>
      </div>
    </form>
  )
}

/* ------------------------------------------------------------------ */
/*  Campo com label, validação inline e mensagem de erro               */
/* ------------------------------------------------------------------ */

type FieldProps = {
  name: keyof DiagnosticFormData
  label: string
  value: string
  error?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: ChangeEvent<HTMLInputElement>) => void
  type?: string
  autoComplete?: string
  inputMode?: 'tel' | 'email' | 'text'
  placeholder?: string
  required?: boolean
  className?: string
}

function Field({
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = 'text',
  autoComplete,
  inputMode,
  placeholder,
  required = false,
  className = '',
}: FieldProps) {
  const errorId = `${name}-erro`

  return (
    <div className={`flex flex-col gap-12 ${className}`}>
      <label htmlFor={name} className="caption-3 uppercase tracking-[0.12em] text-prumo-graphite/60">
        {label}
        {required ? (
          <span className="ml-2 text-prumo-forest" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-lg border bg-prumo-offwhite/60 px-24 py-16 body-6 text-prumo-graphite placeholder:text-prumo-graphite/40 transition-colors duration-300 ease-prumo focus:bg-white focus:outline-none ${
          error
            ? 'border-prumo-graphite/60 bg-prumo-offwhite'
            : 'border-prumo-graphite/20 focus:border-prumo-forest'
        }`}
      />

      {error ? (
        <span id={errorId} role="alert" className="caption-5 text-prumo-graphite">
          {error}
        </span>
      ) : null}
    </div>
  )
}
