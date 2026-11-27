// language: TypeScript, file: src/data/site.ts, target: Página Prumo
// Fonte única de verdade da página. Todo texto comercial fica aqui — nenhum componente
// escreve copy inline. O que depende de dado real está marcado com {{placeholder}}.

import type { NavItem } from '../types'

/**
 * Dados de contato e agenda.
 *
 * ATENÇÃO: nada aqui é real. Antes de publicar, substitua cada campo.
 * O formulário de diagnóstico monta a mensagem a partir destes valores.
 */
export const CONTACT = {
  /** Número no formato internacional, apenas dígitos: 55 + DDD + número. */
  whatsappNumber: '{{whatsapp_numero}}',
  /** Mesmo número formatado para exibição. */
  whatsappDisplay: '{{whatsapp_exibicao}}',
  email: '{{email_contato}}',
  phone: '{{telefone_contato}}',
  city: '{{cidade_atendimento}}',
  /** Faixa de horário de atendimento exibida no rodapé. */
  hours: '{{horario_atendimento}}',
} as const

/** Vaga de agenda. Elemento demonstrativo — não representa escassez real. */
export const AGENDA = {
  slotsLabel: '{{vagas_mes}}',
  monthLabel: '{{mes_referencia}}',
  isDemo: true,
} as const

export const NAV_ITEMS: NavItem[] = [
  { label: 'Método', href: '#metodo' },
  { label: 'Cases', href: '#cases' },
  { label: 'Investimento', href: '#investimento' },
  { label: 'Dúvidas', href: '#duvidas' },
]

export const BRAND = {
  name: 'Método Prumo',
  /** Assinatura curta usada na navbar. */
  short: 'Prumo',
  tagline: 'Clareza financeira para decisões empresariais',
} as const

export const HERO = {
  eyebrow: 'Consultoria financeira e estratégica para empresas',
  headline: 'Decidir com número na mão, não com sensação',
  subheadline:
    'O Método Prumo organiza a informação financeira da sua empresa, identifica onde a margem está vazando e implanta um ritual de gestão que sustenta a decisão depois que a consultoria sai.',
  ctaPrimary: 'Agendar diagnóstico',
  ctaSecondary: 'Ver o método',
  proofLine:
    'Diagnóstico de 30 minutos, sem custo e sem compromisso. Conduzido por quem vai executar o trabalho.',
  /** Credibilidade sem número inventado: afirma o que a empresa é, não o que ela rendeu. */
  credentials: [
    'Atuação direta com sócios e diretoria',
    'Diagnóstico antes de qualquer proposta',
    'Projetos com escopo, prazo e entregáveis definidos',
  ],
} as const

/** Coluna do painel ilustrativo do hero. Réguas e tipografia literais: 8 / 12 / 20 / 32. */
export const HERO_PANEL = {
  caption: 'Composição ilustrativa. Não representa resultado de cliente.',
  rows: [
    { id: 'receita', label: 'Receita', mark: 'R$ 4.812.400', width: 1 },
    { id: 'custo', label: 'Custo variável', mark: 'R$ 2.907.100', width: 0.604 },
    { id: 'fixo', label: 'Custo fixo', mark: 'R$ 1.104.800', width: 0.23 },
    { id: 'margem', label: 'Margem de contribuição', mark: 'R$ 800.500', width: 0.166 },
  ],
  flags: [
    'Centro de custo sem responsável',
    'Preço revisado pela última vez em 20/10',
    'Indicador de caixa apurado fora do sistema',
  ],
} as const

/** B11 — seção obrigatória de revelação da tagline, palavra por palavra. */
export const TAGLINE_REVEAL = {
  /** Quebra por linha é intencional: cada linha é um pensamento. */
  lines: [
    'A maior parte das empresas não perde margem por decisão ruim.',
    'Perde por decidir tarde, com informação que já não corresponde ao que aconteceu na operação.',
  ],
} as const

export const CREDIBILITY_STRIP = {
  statement:
    'Não vendemos relatório bonito. Entregamos decisão documentada, com responsável, prazo e número que pode ser conferido.',
  stats: [
    { label: 'Duração mínima de engajamento', value: '{{duracao_projeto}}' },
    { label: 'Frentes de análise por diagnóstico', value: '{{numero_frentes}}' },
    { label: 'Fundação da consultoria', value: '{{ano_fundacao}}' },
    { label: 'Áreas de atuação', value: '{{areas_atuacao}}' },
  ],
} as const

export const PROBLEM_SECTION = {
  eyebrow: 'O ponto de partida',
  heading: 'Sintomas que costumam chegar junto com o pedido de diagnóstico',
  lead:
    'Quando o problema aparece na conversa, ele quase nunca vem sozinho. Os cinco abaixo descrevem a mesma raiz: informação financeira dispersa demais para sustentar uma decisão no tempo certo.',
  symptoms: [
    {
      label: 'Visibilidade',
      title: 'Fechamento contábil fora de tempo',
      description:
        'O resultado do mês chega quando o mês seguinte já começou. A decisão de ajustar custo chega sempre depois da janela em que ela era barata.',
    },
    {
      label: 'Margem',
      title: 'Preço definido por concorrência, não por custo',
      description:
        'Ninguém sabe qual produto ou contrato paga a estrutura da empresa. O mix cresce e a margem cai sem que a causa apareça em relatório algum.',
    },
    {
      label: 'Caixa',
      title: 'Lucro no papel, aperto no banco',
      description:
        'A empresa é rentável na demonstração e dependente de antecipação na prática. O descasamento entre receber e pagar nunca foi mapeado.',
    },
    {
      label: 'Gestão',
      title: 'Indicador que ninguém controla',
      description:
        'Existem relatórios, mas não existem donos. Sem responsável e sem periodicidade, o número vira leitura de curiosidade e não instrumento de gestão.',
    },
    {
      label: 'Decisão',
      title: 'Sócio decide no escuro',
      description:
        'Aquisição, contratação, investimento e expansão são decididos por percepção. Sem cenário modelado, o risco fica inteiro do lado de quem decide.',
    },
  ],
} as const

export const METHOD_SECTION = {
  eyebrow: 'A metodologia',
  heading: 'Quatro etapas, nesta ordem',
  lead:
    'O prumo é o instrumento que revela o desvio. A metodologia segue a mesma lógica: primeiro mede, depois compara, depois corrige, depois sustenta o resultado. Nenhuma etapa começa antes da anterior fechar.',
} as const

export const OBJECTION_INTRO = {
  eyebrow: 'Escopo e investimento',
  heading: 'O que está incluso, o que não está e por que o investimento tem esse formato',
  lead:
    'Quatro perguntas resolvem a maior parte das objeções que aparecem antes da assinatura. As respostas estão abaixo sem rodeio.',
} as const

export const VALUE_PILLARS_HEADING = {
  eyebrow: 'Onde o valor se acumula',
  heading: 'O que compõe a profundidade de um projeto Prumo',
} as const

export const DIAGNOSTIC_SECTION = {
  eyebrow: 'Próximo passo',
  heading: 'Diagnóstico estratégico de 30 minutos',
  lead:
    'Uma conversa técnica com quem executa o trabalho. Não é apresentação comercial genérica e não tem script de vendas.',
  whatHappens: [
    {
      step: '01',
      title: 'Você descreve o cenário',
      detail:
        'Contexto da empresa, estrutura atual do financeiro e a decisão que está travada hoje.',
    },
    {
      step: '02',
      title: 'Mapeamos as frentes',
      detail:
        'Identificamos onde a informação parece frágil e quais perguntas ainda não têm resposta na sua operação.',
    },
    {
      step: '03',
      title: 'Você recebe o retorno',
      detail:
        'Uma leitura inicial por escrito, com as frentes que veríamos primeiro e o que elas costumam destravar.',
    },
  ],
  audience: [
    'Sócios e acionistas',
    'CEO e diretoria executiva',
    'Diretoria financeira e controladoria',
    'Gestores de unidade ou operação',
  ],
  afterText:
    'Depois da conversa, se fizer sentido seguir, você recebe uma proposta com escopo, frentes, cronograma e valor. Se não fizer sentido, você fica com o retorno escrito e encerramos por aí.',
  noCommitment: [
    'Sem custo e sem compromisso de contratação',
    'Sem apresentação institucional de 40 telas',
    'Retorno por escrito, com ou sem projeto',
  ],
} as const

export const FORM_COPY = {
  heading: 'Solicitar o diagnóstico',
  subheading: 'Levamos menos de dois minutos do seu tempo para preencher.',
  submit: 'Solicitar diagnóstico',
  submitting: 'Enviando…',
  successTitle: 'Solicitação registrada',
  successBody:
    'Este é um ambiente de demonstração, então nada foi enviado a uma consultoria. Em produção, o time retornaria em até um dia útil para confirmar o horário.',
  successWhatsapp: 'Abrir a conversa no WhatsApp',
  errorTitle: 'Não foi possível enviar',
  errorBody:
    'Revise os campos destacados e tente novamente. Nenhum dado foi perdido.',
  demoNotice:
    'Demonstração: os dados não são enviados a servidor algum. O botão abre uma conversa no WhatsApp com o número placeholder configurado no projeto.',
  privacy:
    'Usamos o que você informar apenas para preparar a conversa. Sem cadastro em lista e sem repasse a terceiros.',
  trust: [
    '30 minutos, sem custo',
    'Retorno por escrito',
    'Sem compromisso de contratação',
  ],
} as const

export const FOOTER = {
  statement:
    'Consultoria financeira e estratégica para empresas que precisam decidir com base em número confiável.',
  legal: [
    { label: 'Política de privacidade', href: '{{url_politica_privacidade}}' },
    { label: 'Termos de uso', href: '{{url_termos_uso}}' },
    { label: 'Política de cookies', href: '{{url_politica_cookies}}' },
  ],
  columnsTitle: 'Nesta página',
  contactTitle: 'Contato',
} as const
