// language: TypeScript, file: src/data/objections.ts, target: Página Prumo
// Seção de objeções. O preço é justificado por profundidade, método e entregável —
// nunca por afirmação vazia de qualidade. Valores são placeholders.

import type { FaqItem, ValuePillar } from '../types'

export const VALUE_PILLARS: ValuePillar[] = [
  {
    label: '01',
    title: 'Cada projeto começa do zero',
    description:
      'Não existe pacote replicado. A modelagem de custo, o painel e o plano de ação são construídos sobre o sistema, a estrutura e o mix que a sua empresa tem hoje.',
  },
  {
    label: '02',
    title: 'É trabalho técnico, não reunião',
    description:
      'Conciliação, modelagem, reconstrução de resultado e montagem de cenário consomem horas de análise por profissional alocado. Boa parte do projeto acontece fora da sua sala.',
  },
  {
    label: '03',
    title: 'O entregável é decisão, não relatório',
    description:
      'O que fica não é um PDF de diagnóstico. É plano com dono, prazo e efeito esperado, painel em operação e um time treinado para manter o ritual rodando.',
  },
  {
    label: '04',
    title: 'Acompanhamento depois da entrega',
    description:
      'As primeiras rodadas do ritual acontecem com a consultoria na sala. É esse acompanhamento que evita o plano voltar ao ponto de partida em três meses.',
  },
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'incluso',
    question: 'O que exatamente está incluso na consultoria?',
    answer:
      'As quatro etapas do método com os entregáveis declarados em cada uma: base conciliada dos últimos doze meses, abertura de receita, margem de contribuição por produto, canal e cliente, leitura do ciclo financeiro e de caixa, plano de ação priorizado com responsáveis, cenários modelados para as decisões em aberto, painel de indicadores em operação e treinamento do time interno. O escopo exato é fechado por escrito na proposta, com o que entra e o que não entra.',
  },
  {
    id: 'nao-incluso',
    question: 'O que não está incluso?',
    answer:
      'Execução contábil e fiscal do dia a dia, folha de pagamento, escrituração, obrigações acessórias e representação perante órgãos públicos. Não substituímos a contabilidade da empresa nem assumimos o papel de controller interno. Também não está incluso trabalho jurídico, tributarista ou de reestruturação societária, ainda que o diagnóstico possa apontar a necessidade dessas frentes.',
  },
  {
    id: 'entrega',
    question: 'Como funciona a entrega ao longo do projeto?',
    answer:
      'A entrega é por etapa, com data de fechamento combinada no início. Cada etapa termina em uma reunião de apresentação com a diretoria, com material enviado antes para leitura prévia. Entre as reuniões, o acompanhamento ocorre por canal direto com o ponto focal definido pela empresa. Nenhuma etapa avança sobre a anterior sem que ela esteja fechada e validada.',
  },
  {
    id: 'acompanhamento',
    question: 'Como funciona o acompanhamento depois da entrega?',
    answer:
      'No formato de sustentação, acompanhamos as primeiras rodadas do ritual de gestão junto com o time interno: fechamento do mês, leitura dos indicadores e reunião de resultado. O objetivo explícito é tornar a consultoria dispensável. Quando o time conduz a rotina sem apoio, o projeto encerra com um plano de saída definido, e não com renovação automática.',
  },
  {
    id: 'envolvimento',
    question: 'Qual é o nível de envolvimento exigido da minha equipe?',
    answer:
      'A diretoria precisa de participação real em três momentos: definir o ponto focal interno, validar as premissas da etapa de análise e decidir na etapa de correção. Estimamos o consumo de tempo do sócio em torno de {{horas_socio_mes}} por mês durante o projeto. A análise técnica fica conosco; a validação e a decisão não podem ser delegadas para fora da empresa.',
  },
  {
    id: 'preco',
    question: 'Por que o serviço tem esse preço?',
    answer:
      'Porque o formato é projeto, e não hora avulsa. O valor cobre profissionais alocados em dedicação contínua por {{duracao_projeto}}, modelagem construída sobre os dados da sua operação, entregáveis técnicos, acompanhamento das rodadas iniciais e o custo de errar menos em decisões de preço, custo e caixa. A comparação relevante não é com o preço da hora de outro fornecedor, e sim com o efeito acumulado de decisões tomadas sem base.',
  },
  {
    id: 'investimento',
    question: 'Como o investimento é estruturado?',
    answer:
      'Proposta fechada por escopo, com valor total definido antes do início e parcelamento ao longo do cronograma. Não trabalhamos por hora aberta nem com cobrança variável por reunião. A faixa de investimento por porte de projeto é {{faixa_investimento}} e o valor exato sai na proposta, depois do diagnóstico, com o escopo descrito por escrito.',
  },
  {
    id: 'diferenca',
    question: 'O que diferencia o Método Prumo de uma consultoria genérica?',
    answer:
      'Três coisas verificáveis no processo. Primeiro, o diagnóstico vem antes de qualquer proposta comercial: só propomos depois de olhar os números. Segundo, não existe projeto sem prazo, escopo e entregável declarado por escrito. Terceiro, o critério de sucesso é o time interno conduzindo a rotina sem nós, não a renovação do contrato. Uma consultoria genérica entrega apresentação; aqui a entrega é decisão documentada e processo em operação.',
  },
  {
    id: 'porte',
    question: 'Minha empresa tem porte para contratar?',
    answer:
      'O método foi desenhado para empresas com estrutura mínima instalada: sistema de gestão em uso, contabilidade formal e alguém respondendo pelo financeiro. Abaixo desse patamar, o trabalho começa a se confundir com implantação de rotina básica e costuma não compensar. Na conversa de diagnóstico você recebe uma leitura honesta sobre o encaixe, inclusive quando a resposta for aguardar.',
  },
  {
    id: 'tempo',
    question: 'Quanto tempo até o primeiro resultado visível?',
    answer:
      'A base conciliada e a leitura de desvios ficam prontas ao final da segunda etapa. O plano priorizado sai na terceira, e o ritual passa a rodar na quarta. O prazo total varia com o volume de dados e com a velocidade das validações internas, por isso trabalhamos com cronograma por etapa acordado no início, e não com uma data única no fim.',
  },
]
