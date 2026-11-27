// language: TypeScript, file: src/data/cases.ts, target: Página Prumo
//
// ============================================================================
//  CASES DEMONSTRATIVOS. TODOS OS NÚMEROS SÃO PLACEHOLDERS.
//  Nada aqui descreve cliente real, projeto executado ou resultado apurado.
//  As barras comparativas são proporções ILUSTRATIVAS da interface, não
//  medições. Substitua por dados documentados antes de publicar.
// ============================================================================

import type { CaseStudy } from '../types'

export const CASES_DISCLAIMER =
  'Os dois cases abaixo são estruturas demonstrativas de apresentação. Números, prazos e setores estão marcados como placeholder e não representam resultado real da consultoria.'

export const CASES: CaseStudy[] = [
  {
    id: 'case-distribuicao',
    label: 'Case 01',
    context: '{{setor}} · {{porte}} · operação com {{n}} unidades',
    scenario:
      'Empresa em crescimento de receita havia três anos consecutivos, com margem caindo no mesmo período. Fechamento contábil em {{prazo_fechamento}} dias e nenhuma visão de rentabilidade por linha de produto.',
    bottleneck:
      'Preço formado por comparação de mercado, sem vínculo com custo real de servir cada cliente. Os contratos maiores eram os que menos contribuíam.',
    intervention:
      'Modelagem de custo por linha e por canal, reconstrução da tabela de preço em quatro faixas e implantação de painel de margem de contribuição com revisão mensal assumida pela diretoria comercial.',
    outcome:
      'A empresa passou a recusar proposta com margem abaixo do piso definido e a concentrar esforço comercial nas faixas que pagam a estrutura.',
    metrics: [
      { label: 'Margem antes', value: '{{margem_antes}}', ratio: 0.42 },
      { label: 'Margem depois', value: '{{margem_depois}}', ratio: 0.71 },
    ],
    duration: '{{duracao_case_01}}',
  },
  {
    id: 'case-servicos',
    label: 'Case 02',
    context: '{{setor}} · {{porte}} · receita concentrada em {{n}} contratos',
    scenario:
      'Resultado positivo na demonstração contábil e caixa cronicamente apertado. A empresa operava com antecipação de recebível e não tinha o mapa de quando cada real entraria e sairia.',
    bottleneck:
      'Descasamento entre ciclo de recebimento e ciclo de pagamento, agravado por contrato de prazo longo com reajuste defasado e custo corrigido todo ano.',
    intervention:
      'Construção do fluxo de caixa projetado em {{horizonte_projecao}} meses, revisão das condições de prazo com os cinco maiores clientes e implantação de ritual semanal de caixa com alçada de decisão definida.',
    outcome:
      'Redução da dependência de antecipação e recuperação de previsibilidade suficiente para a empresa voltar a negociar prazo com fornecedor em condição melhor.',
    metrics: [
      { label: 'Dependência de antecipação', value: '{{antecipacao_antes}}', ratio: 0.78 },
      { label: 'Após o projeto', value: '{{antecipacao_depois}}', ratio: 0.31 },
    ],
    duration: '{{duracao_case_02}}',
  },
]
