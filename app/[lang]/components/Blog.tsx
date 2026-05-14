"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { translations } from "@/lib/translations";
import type { Locale } from "@/middleware";

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
      title: "Migrating from Wardpress to Modern JavaScript",
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
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #050B18 0%, #07111F 30%, #0B1F2A 60%, #07111F 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #2563EB 0%, transparent 70%)",
          }}
        />
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "#F8FAFC" }}>
            {t.blog?.title}
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
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
                title: "Modernizing Legacy Web Applications",
                excerpt:
                  "Un ghid complet pentru modernizarea aplicațiilor legacy cu Next.js și TypeScript.",
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
                className="group relative rounded-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",

                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 0 30px rgba(59,130,246,0.15), 0 0 60px rgba(124,58,237,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "none";
                }}
              >
                {/* Gradient border glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1))",
                    margin: "-1px",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    border: "1px solid rgba(59,130,246,0.3)",
                  }}
                />

                {/* Post image placeholder */}
                <div className="relative z-10 h-48 bg-liner-to-br from-blue-500/20 to-purple-500/20 rounded-t-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="px-6 py-3 rounded-lg transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span className="text-xl font-bold" style={{ color: "#94A3B8" }}>
                        {post.image.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-4 text-sm mb-4" style={{ color: "#64748B" }}>
                    <time>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/${lang}/blog/${post.slug}`}>
                    <h3
                      className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-blue-400"
                      style={{ color: "#F8FAFC" }}
                    >
                      {displayPost.title}
                    </h3>
                  </Link>

                  <p className="text-sm sm:text-base mb-4 leading-relaxed" style={{ color: "#94A3B8" }}>
                    {displayPost.excerpt}
                  </p>

                  <Link
                    href={`/${lang}/blog/${post.slug}`}
                    className="inline-flex items-center font-semibold transition-all duration-300 group-hover:gap-2"
                    style={{ color: "#3B82F6" }}
                  >
                    {t.blog?.readMore}
                    <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
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
