# Protótipo — capturas da landing page

PNG gerados a partir da aplicação rodando, não de mockup. O que aparece aqui é o que o
código renderiza.

Marca: **Método Prumo**. Nenhum dado real — os indicadores com borda tracejada são
placeholders.

## Como foi capturado

Duas decisões que fazem a captura funcionar:

**Página inteira em escala 1, seções em escala 2.** Em escala 2 a página inteira daria
2880 × 24000 px e o Chrome headless morre no meio. A nitidez que importa para ler texto
está nas imagens por seção.

**Transição desligada antes de fotografar.** As seções começam em `opacity: 0` e só
acendem quando entram na viewport, via `IntersectionObserver`. Rolar a página devagar não
basta: a seção ainda pode estar no meio da animação de 700ms na hora do clique, e sai em
branco. O script rola tudo, espera o observer marcar cada nó como `data-visible="true"`,
**injeta CSS cortando a transição e força o estado final** — e só então fotografa.

## Arquivos

### Página inteira

| arquivo | dimensão |
|---|---|
| `01-pagina-inteira-desktop.png` | 1440 × 12117 |
| `02-pagina-inteira-mobile.png` | 390 × 10908 (810 × 43632 no arquivo, escala 2) |

### Desktop, 1440px (escala 2 no arquivo)

| arquivo | seção |
|---|---|
| `03-hero-desktop.png` | headline, CTA, provas e painel de estrutura de resultado |
| `04-credibilidade-desktop.png` | faixa de credibilidade e indicadores |
| `05-tagline-desktop.png` | revelação da tagline |
| `06-problema-desktop.png` | cinco sintomas que antecedem o diagnóstico |
| `07-cases-desktop.png` | dois cases com comparativo antes e depois |
| `08-metodo-desktop.png` | as quatro etapas, com entregáveis e handoff |
| `09-investimento-desktop.png` | composição do valor e formato do investimento |
| `10-duvidas-desktop.png` | dez objeções de escopo e preço |
| `11-diagnostico-desktop.png` | oferta do diagnóstico e formulário |
| `12-cta-final-desktop.png` | chamada final |
| `13-rodape-desktop.png` | rodapé, contato e links legais |

### Mobile, 390px

| arquivo | conteúdo |
|---|---|
| `20-primeira-dobra-mobile.png` | primeira tela, onde se decide continuar ou sair |
| `21-hero-mobile.png` … `30-cta-final-mobile.png` | uma imagem por seção |
| `40-menu-mobile-aberto.png` | menu em painel de altura inteira |

### Estados de interface

| arquivo | estado |
|---|---|
| `41-formulario-erro.png` | validação: campos inválidos e bloco de erro agregado |
| `42-formulario-sucesso.png` | confirmação, com o aviso de que é demonstração |

O `26-metodo-mobile.png` tem 928 KB: a seção de método é longa no celular. Para enviar
por mensagem, use os recortes de desktop, que são leves.

## Regenerar

```bash
npm install
npm run build
npx vite preview --port 5299 --strictPort
node tools/capture.mjs http://localhost:5299/
```

A captura usa o Chrome já instalado, via `playwright-core`. Para apontar para outra URL:

```bash
node tools/capture.mjs https://prumo.vercel.app
```
