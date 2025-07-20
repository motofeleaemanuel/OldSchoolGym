// components/blog/[id]/page.js
'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

// Extend posts with optional thumbnail field
const blogPosts = [
  {
    id: 'maximize-treadmill',
    date: 'July 10, 2025',
    title: 'Maximizing Your Treadmill Workouts',
    thumbnail: '/images/cbum1.jpg',
    content: `<p>Discover the best strategies to get the most out of your treadmill sessions.</p>`
  },
  {
    id: 'nutrition-muscle-gain',
    date: 'June 25, 2025',
    title: 'Nutrition Tips for Muscle Gain',
    thumbnail: '', // no image → will use placeholder
    content: `<p>Learn which macronutrients to focus on, meal timing, and top foods.</p>`
  },
  {
    id: 'stretching-routines',
    date: 'May 15, 2025',
    title: 'Stretching Routines to Prevent Injury',
    thumbnail: '/images/cbum2.jpg',
    content: `<p>A step-by-step guide to dynamic and static stretches.</p>`
  },
  {
    id: 'hiit-vs-steady',
    date: 'April 30, 2025',
    title: 'HIIT vs. Steady-State Cardio',
    thumbnail: '/images/cbum3.jpg',
    content: `<p>An in-depth comparison of HIIT vs steady-state cardio.</p>`
  }
]

export default function BlogPostPage() {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === id)
  const [imgError, setImgError] = useState(false)

  if (!post) {
    return (
      <div className="text-center py-20 h-screen text-gray-50">
        <h2 className="text-2xl font-bold">Post not found</h2>
        <Link href="/blog" className="text-primary">Back to Blog</Link>
      </div>
    )
  }

  return (
    <motion.div
      key={Array.isArray(id) ? id.join('-') : id}
      className="max-w-3xl h-screen mx-auto px-4 py-20 text-gray-50"
      initial="hidden"
      animate="visible"
      variants={sectionVariant}
    >
      {/* Display thumbnail or placeholder */}
      {post.thumbnail && !imgError ? (
        <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="w-full h-64 mb-8 bg-gray-900 flex items-center justify-center rounded-xl">
          <span className="text-gray-600">No Image Available</span>
        </div>
      )}

      <span className="text-sm text-[var(--primary)]">{post.date}</span>
      <h1 className="text-4xl font-extrabold mb-6 text-white">{post.title}</h1>
      <div className="prose prose-invert text-gray-300" dangerouslySetInnerHTML={{ __html: post.content }} />
      <Link href="/pages/blog" className="mt-10 inline-block text-primary font-semibold">← Back to Blog</Link>
    </motion.div>
  )
}
