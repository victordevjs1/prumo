# Método Prumo — Landing page

Landing page B2B para consultoria financeira e estratégica. React + TypeScript + Vite +
Tailwind CSS 4.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview  # serve o dist
```

## Estrutura

```
src/
├── components/
│   ├── Navbar.tsx            navbar flutuante, menu mobile em painel, item ativo por observer
│   ├── Hero.tsx              seção 01, headline + CTA + painel ilustrativo
│   ├── CredibilityStrip.tsx  faixa de credibilidade
│   ├── TaglineReveal.tsx     seção de tagline, palavra por palavra no scroll
│   ├── ProblemSection.tsx    sintomas que antecedem o diagnóstico
│   ├── CaseStudies.tsx       seção 02, dois cases demonstrativos
│   ├── MethodSection.tsx     seção 03, as quatro etapas com handoff
│   ├── ValueSection.tsx      seção 04a, composição do valor
│   ├── FAQSection.tsx        seção 04b, objeções
│   ├── DiagnosticSection.tsx seção 05, oferta e formulário
│   ├── FinalCTA.tsx          CTA final, idêntico ao do topo
│   ├── Footer.tsx            rodapé, links legais, contato
│   └── ui/                   Button, Icon, Logo, Placeholder, Prose, SectionHeading
├── data/                     todo o conteúdo textual: site, cases, method, objections
├── hooks/                    useReveal, useTaglineReveal, useActiveSection
├── lib/                      format, validation, whatsapp
└── types/                    contratos de dados
```

Todo o texto comercial vive em `src/data`. Trocar copy não exige tocar em componente.

## Antes de publicar

**Nada nesta página é dado real.** Toda informação que depende de fato está marcada com
`{{placeholder}}` e renderizada com marca visual (borda tracejada + title). Substitua:

1. `src/data/site.ts`
   - `CONTACT` — WhatsApp, e-mail, telefone, cidade, horário
   - `AGENDA` — vagas e mês de referência (ou remova o bloco em `DiagnosticSection`)
   - `CREDIBILITY_STRIP.stats` — duração, frentes, fundação, áreas
   - `HERO_PANEL.flags` — data da última revisão de preço
   - `FOOTER.legal` — URLs de privacidade, termos e cookies
2. `src/data/cases.ts` — os dois cases são **estruturas demonstrativas**. Setores, portes,
   prazos e indicadores são placeholders. As barras comparativas são proporções
   ilustrativas da interface, não medições.
3. `src/data/method.ts` — prazos por etapa
4. `src/data/objections.ts` — horas do sócio por mês, prazo do projeto, faixa de investimento
5. `index.html` — `{{site_url}}`, `{{og_image}}`, `{{email_contato}}`, `{{telefone_contato}}`
   e o JSON-LD `ProfessionalService`

## Envio do formulário

Não há backend. O envio valida, simula latência e, **quando `CONTACT.whatsappNumber` tem
12 ou 13 dígitos**, monta um link `wa.me` com a mensagem pré-formatada para revisão manual.
Enquanto o número for placeholder, nenhum link é gerado e a interface avisa. Nenhum dado
sai da página por conta própria.

Para ligar de verdade: preencha `CONTACT.whatsappNumber` em `src/data/site.ts` (formato
`5511912345678`). Para trocar por API, substitua o corpo de `handleSubmit` em
`DiagnosticSection.tsx`.

## Sistema visual

Os tokens estão em `src/index.css`, no bloco `@theme`. O ponto que exige atenção:

**`--spacing: 1px`.** No Tailwind 4, cada utilitário de espaço é `calc(var(--spacing) * N)`.
Com o padrão de `0.25rem`, `p-300` valeria 1200px. Ancorando em 1px, o número da classe é
o valor em pixel, e a escala fica legível: `2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96`.
Nenhum valor intermediário é permitido.

Tipografia: escala do Tailwind, resolvida por estilos nomeados definidos uma única vez
(`heading-1..6`, `title-1..5`, `body-1..6`, `button-*`, `caption-1..5`). Nenhum elemento
recebe tamanho e peso soltos.

Movimento: curva `cubic-bezier(0.22, 1, 0.36, 1)`, só `transform` e `opacity`, reveals por
`IntersectionObserver`, `prefers-reduced-motion` respeitado em todos os pontos.

## Verificação

Os scripts em `.shots/` são de desenvolvimento e podem ser removidos:

```bash
node .shots/verify.mjs   # 26 checagens de comportamento no Chrome real
node .shots/audit2.mjs   # escala tipográfica, espaçamento, radius
node .shots/audit3.mjs   # placeholders marcados, copy proibida, links mortos
```
