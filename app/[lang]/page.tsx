import { translations } from '../../lib/translations'
import type { Locale } from '../../middleware'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import Blog from './components/Blog'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

interface HomePageProps {
  params: Promise<{
    lang: Locale
  }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params
  const t = translations[lang]

  const whatsappMessage = lang === 'en'
    ? 'Hello! I would like more information about your services.'
    : 'Bună! Aș dori mai multe informații despre serviciile voastre.'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <Header lang={lang} t={t} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero lang={lang} t={t} />
        <Services lang={lang} t={t} />
        <Portfolio lang={lang} t={t} />
        <Experience lang={lang} t={t} />
        <Blog lang={lang} t={t} />
        <Newsletter lang={lang} t={t} />
        <Contact lang={lang} t={t} />
      </main>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <WhatsAppButton
          phone="+40742805633"
          message={whatsappMessage}
          buttonText={lang === 'en' ? 'Chat on WhatsApp' : 'Chat pe WhatsApp'}
        />
      </div>

      {/* Footer */}
      <Footer lang={lang} t={t} />
    </div>
  )
}