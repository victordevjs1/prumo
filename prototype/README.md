# Protótipo — capturas da landing page

PNG de página inteira, seção por seção, em desktop e mobile. Gerado a partir da
aplicação real rodando, não de mockup: o que aparece aqui é o que o código renderiza.

Marca: **Método Prumo**. Nenhum dado real — os indicadores marcados com borda
tracejada são placeholders.

## Desktop (1440px)

| arquivo | seção |
|---|---|
| `00-pagina-inteira-desktop.png` | página completa, 1440 × 12137 |
| `01-topo.png` | hero: headline, CTA, provas e painel de estrutura de resultado |
| `02-credibilidade.png` | faixa de credibilidade e indicadores |
| `03-tagline.png` | revelação da tagline, palavra por palavra |
| `04-problema.png` | cinco sintomas que antecedem o diagnóstico |
| `05-cases.png` | dois cases demonstrativos com comparativo antes e depois |
| `06-metodo.png` | as quatro etapas com objetivo, responsabilidades, entregáveis e handoff |
| `07-investimento.png` | composição do valor e formato do investimento |
| `08-duvidas.png` | dez objeções de escopo e preço |
| `09-diagnostico.png` | oferta do diagnóstico e formulário |
| `10-cta-final.png` | chamada final |
| `11-rodape.png` | rodapé, contato e links legais |

## Mobile (390px, escala 2)

| arquivo | conteúdo |
|---|---|
| `90-pagina-inteira-mobile.png` | página completa, 390 × 21836 (lógico) |
| `91-primeira-dobra-mobile.png` | primeira tela, onde se decide continuar ou sair |
| `92-diagnostico-mobile.png` | oferta e formulário no celular |
| `93-menu-mobile-aberto.png` | menu em painel de altura inteira |

## Estados de interface

| arquivo | estado |
|---|---|
| `94-formulario-estado-erro.png` | validação: campos inválidos e bloco de erro agregado |
| `95-formulario-estado-sucesso.png` | confirmação, com o aviso de que é demonstração |

## Regenerar

```bash
npm install
npm run dev
node tools/capture.mjs
```

A captura usa o Chrome já instalado, via `playwright-core`. Para apontar para outra
URL: `CAPTURE_URL=https://... node tools/capture.mjs`.
