// language: TypeScript, file: src/data/method.ts, target: Página Prumo
// As quatro etapas da metodologia. Cada etapa declara o que a consultoria faz, o que o cliente
// precisa fazer e como entrega a etapa seguinte — o handoff é o que impede o processo de parecer
// uma lista de cards soltos.

import type { MethodStep } from '../types'

export const METHOD_STEPS: MethodStep[] = [
  {
    index: '01',
    name: 'Nivelamento',
    objective:
      'Reconstruir a realidade financeira da empresa a partir do que existe, sem pedir que ninguém organize nada antes.',
    consultancy:
      'Coleta e conciliação de extratos, sistema, planilhas e controles paralelos. Reconstrução do resultado dos últimos doze meses e abertura da receita por linha, canal e cliente.',
    client:
      'Acesso ao sistema, aos extratos e às pessoas que hoje respondem pelas planilhas. Um ponto focal interno para centralizar os pedidos.',
    expected:
      'Uma base única, conciliada e conferível. Pela primeira vez, dois sócios olham o mesmo número.',
    handoff:
      'Com a base fechada, a etapa seguinte já sabe onde comparar. Sem nivelamento, qualquer análise posterior vira discussão sobre qual planilha está certa.',
    duration: '{{duracao_etapa_01}}',
    deliverables: [
      'Demonstrativo gerencial dos últimos 12 meses',
      'Abertura de receita por linha, canal e cliente',
      'Mapa de divergências entre sistema e controle paralelo',
    ],
  },
  {
    index: '02',
    name: 'Prumo',
    objective:
      'Medir o desvio. Comparar o que a operação faz hoje com o que ela deveria fazer para sustentar a margem e o caixa.',
    consultancy:
      'Análise de margem de contribuição por produto e por cliente, curva de custo fixo, ciclo financeiro, formação de preço e leitura dos indicadores que a diretoria já acompanha.',
    client:
      'Validação das premissas junto às áreas comercial, operacional e financeira. É a etapa que exige mais tempo interno: sem validação, o diagnóstico fica bonito e inútil.',
    expected:
      'Um retrato do desvio: quais linhas destroem margem, qual ciclo de caixa está descasado e quais decisões estão sendo tomadas sem base.',
    handoff:
      'O desvio medido é a matéria prima da correção. A etapa seguinte prioriza o que a análise provou, não o que a percepção sugeria.',
    duration: '{{duracao_etapa_02}}',
    deliverables: [
      'Margem de contribuição por produto, canal e cliente',
      'Mapa do ciclo financeiro e do descasamento de caixa',
      'Diagnóstico de formação de preço',
      'Ranking de desvios por impacto potencial',
    ],
  },
  {
    index: '03',
    name: 'Correção',
    objective:
      'Transformar o diagnóstico em plano executável, com dono, prazo e efeito esperado declarado para cada frente.',
    consultancy:
      'Priorização das frentes por impacto e esforço, desenho do plano de ação, revisão de tabela de preço quando for o caso e construção dos cenários de decisão para as escolhas em aberto.',
    client:
      'Decisão. Esta é a etapa em que a diretoria escolhe o que entra e o que fica fora. A consultoria estrutura a escolha, não escolhe pelo cliente.',
    expected:
      'Um plano com frentes priorizadas, responsáveis nomeados e efeito esperado por frente. Nenhuma ação sem dono e sem prazo.',
    handoff:
      'Plano em execução sem ritual de acompanhamento volta ao ponto de partida em poucos meses. A quarta etapa existe para impedir exatamente isso.',
    duration: '{{duracao_etapa_03}}',
    deliverables: [
      'Plano de ação priorizado por impacto e esforço',
      'Cenários modelados para as decisões em aberto',
      'Tabela de preço e política de desconto revisadas',
      'Painel de acompanhamento das frentes',
    ],
  },
  {
    index: '04',
    name: 'Sustentação',
    objective:
      'Instalar o ritual de gestão que mantém o nível depois que o projeto termina. O resultado precisa sobreviver à consultoria.',
    consultancy:
      'Implantação da rotina de indicadores, treinamento do time interno, documentação dos processos financeiros e acompanhamento das primeiras rodadas do ritual.',
    client:
      'Assumir a condução do ritual. A consultoria participa das primeiras rodadas e sai de cena de forma planejada.',
    expected:
      'A empresa passa a fechar o mês no prazo, com indicador apurado, dono definido e reunião de resultado que acontece mesmo sem a consultoria na sala.',
    handoff:
      'Não há etapa seguinte. O encerramento é o próprio entregável: o processo opera sem dependência externa.',
    duration: '{{duracao_etapa_04}}',
    deliverables: [
      'Ritual de gestão documentado com periodicidade e alçadas',
      'Painel de indicadores em operação',
      'Time interno treinado na rotina',
      'Processos financeiros documentados',
    ],
  },
]
