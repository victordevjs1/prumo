// language: TypeScript, file: src/App.tsx, target: Página Prumo
// Composição da página na ordem definida em A2/A6: hero, prova, argumento do meio
// (tagline, problema, método, valor), quebra de objeções e conversão.
// O <h1> existe uma única vez, no hero; os headings de seção são <h2>.

import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { CredibilityStrip } from './components/CredibilityStrip'
import { TaglineReveal } from './components/TaglineReveal'
import { ProblemSection } from './components/ProblemSection'
import { CaseStudies } from './components/CaseStudies'
import { MethodSection } from './components/MethodSection'
import { ValueSection } from './components/ValueSection'
import { FAQSection } from './components/FAQSection'
import { DiagnosticSection } from './components/DiagnosticSection'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-dvh bg-prumo-offwhite">
      <Navbar />

      <main id="conteudo">
        <Hero />
        <CredibilityStrip />
        <TaglineReveal />
        <ProblemSection />
        <CaseStudies />
        <MethodSection />
        <ValueSection />
        <FAQSection />
        <DiagnosticSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
