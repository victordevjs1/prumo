// language: TypeScript, file: vite.config.ts, runtime: Node + Vite 8, target: Página Prumo
// *O plugin do Tailwind 4 precisa vir DEPOIS do plugin do React na lista: ele transforma o
//  CSS via pipeline do Vite e a ordem invertida quebra o HMR de classes utilitárias.*
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssMinify: 'lightningcss',
  },
})
