import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Locale } from '../../../../middleware'

interface BlogPostPageProps {
  params: Promise<{
    lang: Locale
    slug: string
  }>
}

const postsDirectory = path.join(process.cwd(), 'public/blog')

function getPostData(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    return null
  }
  const fileContents = fs.readFileSync(filePath, 'utf8')
  return matter(fileContents)
}

export function generateStaticParams() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  return files.map(f => ({ slug: f.replace('.md', '') }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostData(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.data.title || slug} | Grandios Web`,
    description: post.data.excerpt || 'Blog post about web development and digital transformation',
    openGraph: {
      title: post.data.title,
      description: post.data.excerpt,
      type: 'article',
      publishedTime: post.data.date,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params

  const post = getPostData(slug)

  if (!post) {
    notFound()
  }

  const { data, content } = post

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {lang === 'en' ? 'Back to Home' : 'Înapoi Acasă'}
          </Link>
        </div>
      </nav>

      {/* Blog post content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          {data.date && (
            <time className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
              {data.date}
            </time>
          )}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}dd
          </h1>
          {data.excerpt && (
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {data.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
            {data.readTime && <span>{data.readTime}</span>}
            {data.readTime && data.date && <span>•</span>}
            {data.lang && (
              <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium uppercase">
                {data.lang}
              </span>
            )}
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {lang === 'en' ? '← Back to Home' : '← Înapoi Acasă'}
          </Link>
        </div>
      </article>
    </div>
  )
}
