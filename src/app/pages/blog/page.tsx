'use client'

import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } }
}

const blogPosts = [
  {
    id: 'maximize-treadmill',
    date: 'July 10, 2025',
    title: 'Maximizing Your Treadmill Workouts',
    excerpt: 'Discover the best strategies to get the most out of your treadmill sessions.',
    thumbnail: '/images/cbum1.jpg',
    readTime: '6 min read'
  },
  {
    id: 'nutrition-muscle-gain',
    date: 'June 25, 2025',
    title: 'Nutrition Tips for Muscle Gain',
    excerpt: 'Learn which macronutrients to focus on, meal timing, and top foods.',
    // no thumbnail here → will show placeholder
    readTime: '5 min read'
  },
  {
    id: 'stretching-routines',
    date: 'May 15, 2025',
    title: 'Stretching Routines to Prevent Injury',
    excerpt: 'A step-by-step guide to dynamic and static stretches.',
    thumbnail: '/images/cbum2.jpg',
    readTime: '4 min read'
  },
  {
    id: 'hiit-vs-steady',
    date: 'April 30, 2025',
    title: 'HIIT vs. Steady‑State Cardio',
    excerpt: 'An in‑depth comparison of high‑intensity intervals vs steady‑state.',
    thumbnail: '/images/cbum3.jpg',
    readTime: '7 min read'
  }
]

export default function BlogPage() {
  return (
    <motion.section
      key="blog-list"
      className="relative bg-[var(--black)] min-h-screen text-gray-50 py-20 overflow-visible"
      initial="hidden"
      animate="visible"
      variants={sectionVariant}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-12 -left-12 w-56 h-56 bg-[var(--primary)] opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-16 right-12 w-40 h-40 bg-[var(--primary)] opacity-15 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-12">
          <BookOpen className="w-8 h-8 text-[var(--primary)] mr-2" />
          <motion.h2
            className="text-3xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            From Our Blog
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <BlogCard post={post} delay={idx * 0.2} key={post.id} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function BlogCard({
  post,
  delay
}: {
  post: {
    id: string
    date: string
    title: string
    excerpt: string
    thumbnail?: string
    readTime: string
  }
  delay: number
}) {
  // track if image load failed
  const [imgError, setImgError] = useState(false)

  return (
    <motion.article
      className="
        bg-[var(--black)]
        border
        border-gray-900
        rounded-2xl
        overflow-hidden
        flex
        flex-col
        shadow-lg
        hover:shadow-neon
        transition-shadow
        duration-300
        border-l-4
        border-l-[var(--primary)]
      "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {post.thumbnail && !imgError ? (
        <div className="relative h-40 w-full">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="h-40 w-full bg-gray-900 flex items-center justify-center">
          <span className="text-gray-600">No Image Available</span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        <span className="text-sm text-[var(--primary)] mb-1">{post.date}</span>
        <h3 className="text-2xl font-semibold mb-2 text-white">{post.title}</h3>
        <span className="text-xs text-gray-400 mb-4">{post.readTime}</span>
        <p className="text-gray-300 flex-grow mb-6">{post.excerpt}</p>
        <Link
          href={`/pages/blog/${post.id}`}
          className="mt-auto self-start text-primary font-semibold flex items-center"
        >
          Read More
          <motion.span
            className="ml-1"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </Link>
      </div>
    </motion.article>
  )
}
