'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import {useRef, useState} from 'react'
import { translations } from '../../../lib/translations'
import type { Locale } from '../../../middleware'

interface ServicesProps {
  lang: Locale
  t: typeof translations.en
}

export default function Services({ lang, t }: ServicesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const services = [
    {
      id: 'enterprise',
      icon: '🏢',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      id: 'rapid',
      icon: '⚡',
      gradient: 'from-green-500 to-green-600',
    },
    {
      id: 'ai',
      icon: '🤖',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      id: 'mobile',
      icon: '📱',
      gradient: 'from-pink-500 to-pink-600',
    },
    {
      id: 'legacy',
      icon: '🔄',
      gradient: 'from-yellow-500 to-yellow-600',
    },
    {
      id: 'consultancy',
      icon: '💡',
      gradient: 'from-indigo-500 to-indigo-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  }
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({
    transform: 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg)',
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const translateX = ((x - centerX) / centerX) * 20;
    const translateY = ((y - centerY) / centerY) * 20;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransformStyle({
      transform: `
        translateX(${translateX}px)
        translateY(${translateY}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg)',
    });
  };
  return (
    <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.services.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>
        {/*<img src={'/assets/images.png'} alt={'name'} />*/}
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
            style={{
              perspective: '1000px',
            }}
        >
          <img
              src="/assets/images.png"
              alt="name"
              className="transition-transform duration-150 ease-out will-change-transform"
              style={transformStyle}
          />
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const serviceName = service.id as keyof typeof translations.en.services
            const serviceData = t.services[serviceName] as { title: string; description: string }

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl"
                initial={{ rotate: index % 2 === 0 ? -1 : 1 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white text-2xl shadow-lg`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {serviceData.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {serviceData.description}
                </p>

                {/* Subtle gradient overlay */}
                <div className={`absolute inset-0 opacity-0 hover:opacity-5 bg-gradient-to-br ${service.gradient} rounded-2xl transition-opacity duration-300`} />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
