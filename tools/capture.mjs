// language: JavaScript, file: tools/capture.mjs, runtime: node + playwright-core (Chrome do sistema)
// Captura a landing do Método Prumo em PNG: página inteira, uma imagem por seção
// (desktop e mobile) e os estados do formulário. Salva em png/.
//
// *Página inteira com deviceScaleFactor 2 dá imagens enormes (1440x12000 =
//  2880x24000 px) e o Chrome headless morre no meio. Por isso a captura
//  full-page é feita em escala 1, e as seções individuais em escala 2, que é
//  onde a nitidez importa para leitura de texto.
// *Os reveals são acionados por IntersectionObserver e a transição leva 700ms.
//  Rolar a página não basta: a seção ainda pode estar no meio da animação na
//  hora do clique. Por isso, depois de rolar, a transição é desligada e o
//  estado final é aplicado à força em todo nó [data-visible], e as palavras da
//  tagline são acesas do mesmo modo. Sem isso, as seções de baixo saem em branco.
// *O menu mobile e a validação do formulário dependem de evento real: o clique
//  é disparado no DOM porque a navbar fixa intercepta o hit-test do headless.
//
// uso: node tools/capture.mjs [url]

import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const URL = process.argv[2] ?? process.env.CAPTURE_URL ?? 'http://localhost:5299/'
const OUT = 'png'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome', headless: true })

/** Dispara todos os reveals e congela o estado final antes de fotografar. */
async function warmReveals(page) {
  // 1. Rola a página inteira para o IntersectionObserver disparar em cada seção.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.5)
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 110))
    }
    window.scrollTo(0, document.documentElement.scrollHeight)
    await new Promise((r) => setTimeout(r, 900))
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 800))
  })

  // 2. Espera o observer marcar tudo como visível.
  await page
    .waitForFunction(
      () => {
        const nodes = document.querySelectorAll('[data-visible]')
        if (nodes.length === 0) return true
        return Array.from(nodes).every((n) => n.dataset.visible === 'true')
      },
      { timeout: 20000 },
    )
    .catch(() => {})

  // 3. Corta a transição e força o estado final. É este passo que impede as
  //    seções do fim da página de saírem com opacity 0 na captura.
  await page.addStyleTag({
    content: '[data-visible]{transition:none !important}',
  })
  await page.evaluate(() => {
    document.querySelectorAll('[data-visible]').forEach((el) => {
      el.setAttribute('data-visible', 'true')
    })
  })
  await page.waitForTimeout(1200)
}

/** Nomes legíveis para as seções, na ordem em que aparecem no documento. */
const NOMES = {
  topo: 'hero',
  credibilidade: 'credibilidade',
  tagline: 'tagline',
  problema: 'problema',
  cases: 'cases',
  metodo: 'metodo',
  investimento: 'investimento',
  duvidas: 'duvidas',
  diagnostico: 'diagnostico',
  'cta-final': 'cta-final',
  rodape: 'rodape',
}

/** Seções que não têm id próprio e são localizadas por outro seletor. */
const POR_SELETOR = {
  rodape: 'footer',
}

/* ------------------------------------------------------------------ */
/*  Desktop 1440px: página inteira + uma imagem por seção              */
/* ------------------------------------------------------------------ */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await warmReveals(page)

  await page.screenshot({ path: `${OUT}/00-pagina-inteira-desktop.png`, fullPage: true })
  console.log('00-pagina-inteira-desktop.png')

  // Seções com id próprio, mais o rodapé.
  const sections = await page.evaluate(() =>
    [
      ...Array.from(document.querySelectorAll('main > section')).map((el, i) => ({
        i,
        id: el.id || `secao-${i + 1}`,
      })),
      { i: 99, id: 'rodape' },
    ].filter((s) => s.id !== 'rodape' || document.querySelector('footer')),
  )

  for (const s of sections) {
    const nome = NOMES[s.id] ?? s.id
    const arq = `${String(s.i + 1).padStart(2, '0')}-${nome}-desktop.png`
    const alvo = POR_SELETOR[s.id] ?? `#${s.id}`
    try {
      await page.locator(alvo).first().screenshot({ path: `${OUT}/${arq}`, timeout: 15000 })
      console.log(arq)
    } catch (err) {
      console.log(`${arq}  FALHOU: ${err.message.split('\n')[0]}`)
    }
  }

  await page.close()
}

/* ------------------------------------------------------------------ */
/*  Mobile 390px: página inteira + uma imagem por seção                */
/* ------------------------------------------------------------------ */
{
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await warmReveals(page)

  await page.screenshot({ path: `${OUT}/00-pagina-inteira-mobile.png`, fullPage: true })
  console.log('00-pagina-inteira-mobile.png')

  // Primeira dobra: é o que decide a leitura no celular.
  await page.screenshot({ path: `${OUT}/01-primeira-dobra-mobile.png` })
  console.log('01-primeira-dobra-mobile.png')

  const sections = await page.evaluate(() =>
    Array.from(document.querySelectorAll('main > section')).map((el, i) => ({
      i,
      id: el.id || `secao-${i + 1}`,
    })),
  )

  for (const s of sections) {
    const nome = NOMES[s.id] ?? s.id
    const arq = `${String(s.i + 1).padStart(2, '0')}-${nome}-mobile.png`
    try {
      await page.locator(`#${s.id}`).screenshot({ path: `${OUT}/${arq}`, timeout: 15000 })
      console.log(arq)
    } catch (err) {
      console.log(`${arq}  FALHOU: ${err.message.split('\n')[0]}`)
    }
  }

  // Menu aberto: o toggle fecha no Esc e trava o scroll do fundo.
  await page.locator('#topo').scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await page.locator('button[aria-controls="menu-mobile"]').evaluate((el) => el.click())
  await page.waitForTimeout(900)
  await page.screenshot({ path: `${OUT}/90-menu-mobile-aberto.png` })
  console.log('90-menu-mobile-aberto.png')

  await page.close()
}

/* ------------------------------------------------------------------ */
/*  Estado do formulário: validação e sucesso                          */
/* ------------------------------------------------------------------ */
{
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await warmReveals(page)

  await page.locator('#diagnostico').scrollIntoViewIfNeeded()
  await page.waitForTimeout(800)

  // Estado de erro: envia vazio e captura o formulário com as mensagens.
  await page.locator('form button[type="submit"]').evaluate((el) => el.click())
  await page.waitForTimeout(600)
  await page.locator('form').screenshot({ path: `${OUT}/91-formulario-erro.png` })
  console.log('91-formulario-erro.png')

  // Estado de sucesso. Depois do envio o <form> é substituído pela confirmação,
  // então o seletor muda: capturamos a seção inteira, que contém a confirmação.
  await page.fill('#name', 'Ana Ferreira')
  await page.fill('#company', 'Aurora Logística')
  await page.fill('#email', 'ana.ferreira@aurora.com.br')
  await page.fill('#whatsapp', '11912345678')
  await page.fill('#role', 'Diretora Financeira')
  await page.fill('#challenge', 'Margem caindo com receita crescendo.')
  await page.locator('form button[type="submit"]').evaluate((el) => el.click())
  await page.waitForTimeout(1800)
  await page.locator('#diagnostico').screenshot({ path: `${OUT}/92-formulario-sucesso.png` })
  console.log('92-formulario-sucesso.png')

  await page.close()
}

await browser.close()
console.log('\ncaptura concluída')
