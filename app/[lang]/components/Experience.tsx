"use client";

import { motion } from "framer-motion";
import { translations } from "../../../lib/translations";
import type { Locale } from "../../../middleware";

interface ExperienceProps {
  lang: Locale;
  t: typeof translations.en;
}

export default function Experience({ lang, t }: ExperienceProps) {
  const years = [
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="experience"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.experience?.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t.experience?.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2" />

          <div className="space-y-12">
            {years.map((year, index) => (
              <motion.div
                key={year}
                variants={itemVariants}
                className="relative flex items-center"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-8 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 ring-4 ring-white dark:ring-gray-800 transform -translate-x-1/2"
                  whileHover={{ scale: 1.2 }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                />

                {/* Content */}
                <div className="glass-card ml-20 p-6 rounded-xl hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {year.slice(-2)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {year}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {
                          t.experience?.timeline[
                            year as keyof typeof translations.en.experience.timeline
                          ]
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
