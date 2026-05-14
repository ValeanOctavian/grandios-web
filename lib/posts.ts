import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  content: string
  lang: 'en' | 'ro'
  image: string
}

const postsDirectory = path.join(process.cwd(), 'public/blog')

export function getAllPosts(lang?: 'en' | 'ro'): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPosts = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace('.md', '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug,
          title: data.title || '',
          excerpt: data.excerpt || '',
          date: data.date || '',
          readTime: data.readTime || '',
          content,
          lang: (data.lang || 'en') as 'en' | 'ro',
          image: data.image || '',
        }
      })
      .filter((post) => (lang ? post.lang === lang : true))
      .sort((a, b) => (a.date < b.date ? 1 : -1))

    return allPosts
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string, lang?: 'en' | 'ro'): BlogPost | null {
  try {
    const allPosts = getAllPosts(lang)
    return allPosts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error('Error finding blog post:', error)
    return null
  }
}

export function getLatestPosts(limit: number = 3, lang: 'en' | 'ro' = 'en'): BlogPost[] {
  const posts = getAllPosts(lang)
  return posts.slice(0, limit)
}

export function getPostsByLang(lang: 'en' | 'ro'): BlogPost[] {
  return getAllPosts(lang)
}

export function getAllSlugs(): string[] {
  const posts = getAllPosts()
  return posts.map((post) => post.slug)
}

export function validateMarkdownFiles(): boolean {
  try {
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }
    return true
  } catch (error) {
    console.error('Error validating blog directory:', error)
    return false
  }
}