'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { translations } from '../../../lib/translations'
import type { Locale } from '../../../middleware'

interface HeaderProps {
  lang: Locale
  t: typeof translations.en
}

export default function Header({ lang, t }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ['home', 'services', 'portfolio', 'aboutUs', 'blog', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLanguageChange = useCallback(async (newLang: Locale) => {
    try {
      const currentPath = pathname.replace(/^\/[a-z]{2}/, '')
      const newPath = `/${newLang}${currentPath || ''}`
      // Use replace instead of push to avoid promise issues
      window.location.href = newPath
    } catch (error) {
      console.error('Language change error:', error)
    }
  }, [pathname])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'aboutUs', label: t.nav.aboutUs },
    { id: 'blog', label: t.nav.blog },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav className="glass-card mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-2xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${lang}#home`}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleSmoothScroll(e, 'home')}
            className=" text-2xl font-bold text-gray-900
                        transition-all duration-300
                        hover:bg-gradient-to-r hover:from-cyan-400 hover:via-blue-500 hover:to-fuchsia-500
                        hover:bg-clip-text hover:text-transparent hover:leading-tight
                        ">
            Grandios Web
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/${lang}#${item.id}`}
                onClick={(e) => handleSmoothScroll(e, item.id)}
                className={`relative transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <span className="relative">
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                      layoutId="activeSection"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </span>
              </a>
            ))}

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-white/20 transition-colors"
              >
                <span>{lang === 'en' ? '🇬🇧 EN' : '🇷🇴 RO'}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showLangDropdown ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {showLangDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 glass-card rounded-xl overflow-hidden z-50"
                  >
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`w-full text-left px-4 py-3 hover:bg-white/20 transition-colors ${
                        lang === 'en' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => handleLanguageChange('ro')}
                      className={`w-full text-left px-4 py-3 hover:bg-white/20 transition-colors ${
                        lang === 'ro' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      🇷🇴 Română
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden py-4 border-t border-white/20"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`/${lang}#${item.id}`}
                    onClick={(e) => handleSmoothScroll(e, item.id)}
                    className={`block px-3 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-white/20'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-2 border-t border-white/20">
                  <button
                    onClick={() => handleLanguageChange(lang === 'en' ? 'ro' : 'en')}
                    className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-white/20 transition-colors"
                  >
                    {lang === 'en' ? '🇷🇴 Switch to Română' : '🇬🇧 Switch to English'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
