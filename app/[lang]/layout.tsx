import type { Metadata } from 'next'
import { LangSetter } from './components/LangSetter'

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{
    lang: string
  }>
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params

  const title = lang === 'en'
    ? 'Grandios Web - Premium Web Development & Digital Transformation'
    : 'Grandios Web - Dezvoltare Web Premium și Transformare Digitală'

  const description = lang === 'en'
    ? 'Premium web development services. 8+ years of excellence in enterprise development, AI integration, and digital transformation.'
    : 'Servicii premium de dezvoltare web. 8+ ani de excelență în dezvoltare enterprise, integrare AI și transformare digitală.'

  return {
    title,
    description,
    keywords: 'web development, digital transformation, AI integration, React, Next.js, mobile apps, Suceava Romania',
    authors: [{ name: 'Grandios Web' }],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'ro_RO',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function LangLayout({ children }: LangLayoutProps) {
  return (
    <>
      <LangSetter />
      {children}
    </>
  )
}
