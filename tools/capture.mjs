// language: JavaScript, file: tools/capture.mjs, runtime: node + playwright-core (Chrome do sistema)
// Captura a landing page em PNG para apresentação: página inteira, seção por seção,
// e a versão mobile. Salva em prototype/.
//
// *Página inteira com deviceScaleFactor 2 dá imagens enormes (1440x12000 = 2880x24000 px).
//  Por isso a captura full-page é feita em escala 1, e as seções individuais em escala 2,
//  que é onde a nitidez importa para leitura de texto.
// *Os reveals são acionados por IntersectionObserver. Antes de capturar, é preciso rolar
//  a página inteira devagar para que todo mundo saia de opacity 0, senão as seções
//  aparecem em branco.

import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const URL = process.env.CAPTURE_URL ?? 'http://localhost:5173/'
const OUT = 'prototype'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome', headless: true })

/** Rola a página inteira para disparar todos os reveals, depois volta ao topo. */
async function warmReveals(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6)
    const height = document.documentElement.scrollHeight
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 400))
  })
  // Espera todo reveal concluir (a transição dura 700ms).
  await page
    .waitForFunction(
      () => {
        const nodes = document.querySelectorAll('[data-visible]')
        if (nodes.length === 0) return true
        return Array.from(nodes).every((n) => n.dataset.visible === 'true')
      },
      { timeout: 15000 },
    )
    .catch(() => {})
  await page.waitForTimeout(1200)
}

/* ------------------------------------------------------------------ */
/*  Desktop: página inteira + uma imagem por seção                     */
/* ------------------------------------------------------------------ */
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await warmReveals(page)

  // Página inteira, escala 1 para o arquivo não ficar gigante.
  await page.screenshot({ path: `${OUT}/00-pagina-inteira-desktop.png`, fullPage: true })
  console.log('00-pagina-inteira-desktop.png')

  // Uma imagem por seção, em escala 2 para leitura de texto.
  const sections = await page.evaluate(() =>
    [...document.querySelectorAll('main > section, footer')].map((el, index) => ({
      index,
      id: el.id || `secao-${index}`,
      label: el.getAttribute('aria-labelledby') ?? el.id ?? `secao-${index}`,
    })),
  )

  for (const section of sections) {
    const locator = page.locator('main > section, footer').nth(section.index)
    const name = String(section.index + 1).padStart(2, '0')
    const file = `${OUT}/${name}-${section.id}.png`
    await locator.screenshot({ path: file })
    console.log(file)
  }

  await page.close()
}

/* ------------------------------------------------------------------ */
/*  Mobile: 390px, página inteira em escala 2                          */
/* ------------------------------------------------------------------ */
{
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await warmReveals(page)

  await page.screenshot({ path: `${OUT}/90-pagina-inteira-mobile.png`, fullPage: true })
  console.log('90-pagina-inteira-mobile.png')

  // Primeira dobra do mobile, que é o que decide a leitura no celular.
  await page.screenshot({ path: `${OUT}/91-primeira-dobra-mobile.png` })
  console.log('91-primeira-dobra-mobile.png')

  // O formulário, que é o ponto de conversão.
  await page.locator('#diagnostico').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)
  await page.locator('#diagnostico').screenshot({ path: `${OUT}/92-diagnostico-mobile.png` })
  console.log('92-diagnostico-mobile.png')

  await page.close()
}

/* ------------------------------------------------------------------ */
/*  Desktop: menu mobile aberto e estado de erro do formulário         */
/* ------------------------------------------------------------------ */
{
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  await page.locator('button[aria-controls="menu-mobile"]').evaluate((el) => el.click())
  await page.waitForTimeout(900)
  await page.screenshot({ path: `${OUT}/93-menu-mobile-aberto.png` })
  console.log('93-menu-mobile-aberto.png')
  await page.close()
}

{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await warmReveals(page)

  // Estado de erro: envia vazio e captura o formulário com as mensagens.
  await page.locator('#diagnostico').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1000)
  await page.locator('button[type="submit"]').evaluate((el) => el.click())
  await page.waitForTimeout(500)
  await page.locator('#diagnostico').screenshot({ path: `${OUT}/94-formulario-estado-erro.png` })
  console.log('94-formulario-estado-erro.png')

  // Estado de sucesso.
  await page.fill('#name', 'Ana Ferreira')
  await page.fill('#company', 'Aurora Logística')
  await page.fill('#email', 'ana.ferreira@aurora.com.br')
  await page.fill('#whatsapp', '11912345678')
  await page.fill('#role', 'Diretora Financeira')
  await page.locator('button[type="submit"]').evaluate((el) => el.click())
  await page.waitForTimeout(1600)
  await page.locator('#diagnostico').screenshot({ path: `${OUT}/95-formulario-estado-sucesso.png` })
  console.log('95-formulario-estado-sucesso.png')

  await page.close()
}

await browser.close()
console.log('\ncaptura concluída')
