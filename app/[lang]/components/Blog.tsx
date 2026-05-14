"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { translations } from "../../../lib/translations";
import type { Locale } from "../../../middleware";

interface BlogProps {
  lang: Locale;
  t: typeof translations.en;
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

export default function Blog({ lang, t }: BlogProps) {
  const blogPosts: BlogPost[] = [
    {
      slug: "ai-web-dev",
      title: "The Future of AI in Web Development",
      excerpt:
        "How AI-powered tools like Gemini API are revolutionizing the way we build modern web applications.",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "ai-web-dev",
    },
    {
      slug: "php-migration",
      title: "Migrating from PHP to Modern JavaScript",
      excerpt:
        "A comprehensive guide to modernizing legacy PHP applications with Next.js and TypeScript.",
      date: "2024-01-10",
      readTime: "8 min read",
      image: "php-migration",
    },
    {
      slug: "nextjs-ecommerce",
      title: "Enterprise Grade E-commerce with Next.js",
      excerpt:
        "Building scalable, performant e-commerce platforms that handle millions of users.",
      date: "2024-01-05",
      readTime: "6 min read",
      image: "nextjs-ecom",
    },
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="blog"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
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
            {t.blog?.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.blog?.subtitle}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post, index) => {
            const isRomanian = lang === "ro";
            const romanianPosts = [
              {
                title: "Viitorul AI în Dezvoltarea Web",
                excerpt:
                  "Cum instrumentele AI precum Gemini API revoluționează modul în care construim aplicații web moderne.",
              },
              {
                title: "Migrarea de la PHP la JavaScript Modern",
                excerpt:
                  "Un ghid complet pentru modernizarea aplicațiilor PHP legacy cu Next.js și TypeScript.",
              },
              {
                title: "E-commerce Enterprise cu Next.js",
                excerpt:
                  "Construirea de platforme e-commerce scalabile și performante care gestionează milioane de utilizatori.",
              },
            ];

            const displayPost = isRomanian ? romanianPosts[index] : post;

            return (
              <motion.article
                key={post.slug}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Post image placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-card px-6 py-3 rounded-lg">
                      <span className="text-xl font-bold text-gray-700 dark:text-gray-500">
                        {post.image.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-4">
                    <time>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/${lang}/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      {displayPost.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {displayPost.excerpt}
                  </p>

                  <Link
                    href={`/${lang}/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    {t.blog?.readMore}
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
