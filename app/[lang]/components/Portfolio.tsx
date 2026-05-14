'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { translations } from '../../../lib/translations'
import type { Locale } from '../../../middleware'

interface PortfolioProps {
  lang: Locale
  t: typeof translations.en
}

export default function Portfolio({ lang, t }: PortfolioProps) {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  type ProjectKey = keyof typeof translations.en.portfolio.projects

  const projects: Array<{
    id: ProjectKey
    category: 'enterprise' | 'ecommerce' | 'mobile'
  }> = [
    { id: 'project1', category: 'mobile' },
    { id: 'project2', category: 'ecommerce' },
    { id: 'project3', category: 'enterprise' },
    { id: 'project4', category: 'ecommerce' },
    { id: 'project5', category: 'enterprise' },
    { id: 'project6', category: 'enterprise' },
    { id: 'project7', category: 'enterprise' },
  ]

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(p => p.category === selectedFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section id="portfolio" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.portfolio.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.portfolio.subtitle}
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            { id: 'all', label: t.portfolio.filterAll },
            { id: 'enterprise', label: t.portfolio.filterEnterprise },
            { id: 'ecommerce', label: t.portfolio.filterEcommerce },
            { id: 'mobile', label: t.portfolio.filterMobile },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'glass-card text-gray-600 dark:text-gray-300 hover:bg-white/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          key={selectedFilter}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
            const projectData = t.portfolio.projects[project.id]

            return (
              <motion.div
                key={`${project.id}-${selectedFilter}`}
                variants={itemVariants}
                layout={false}
                animate="visible"
                initial="hidden"
                exit="hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
                onClick={() => setSelectedProject(projectData.title)}
              >
                  {/* Project image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="glass-card px-6 py-3 rounded-lg">
                        <div className="text-2xl font-bold text-gray-700 dark:text-gray-200">
                          Project {project.id.replace('project', '')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {projectData.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {projectData.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {projectData.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-card max-w-md w-full p-6 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedProject}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {lang === 'en'
                  ? 'This project showcases our expertise in building scalable, modern web applications. Contact us to learn more about this project and how we can help with yours.'
                  : 'Acest proiect demonstrează expertiza noastră în construirea de aplicații web scalabile și moderne. Contactați-ne pentru a afla mai multe despre acest proiect și cum vă putem ajuta.'}
              </p>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                {lang === 'en' ? 'Close' : 'Închide'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
