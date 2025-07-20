"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { GalleryHorizontalIcon, X } from 'lucide-react'
import useSWR from 'swr'
import { toast } from 'sonner'

// Animation variants
const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
}

const itemVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
}

// Date formatting
const formatDatetime = (iso: string) => {
  const date = new Date(iso)
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })
  return `${dateStr} · ${timeStr}`
}

const formatGroupLabel = (iso: string) => {
  const date = new Date(iso)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

type ImageDoc = {
  _id: string
  cloudinaryUrl: string
  createdAt: string
}

type ApiResponse = {
  success: boolean
  images: ImageDoc[]
}

export default function GallerySection() {
  const { data, error } = useSWR<ApiResponse>('/api/v1/gallery', fetcher)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [filterMonth, setFilterMonth] = useState<string>('All')

  if (error) {
    toast.error('Failed to load gallery')
    return <div className="text-red-500 py-8 text-center">Failed to load gallery.</div>
  }
  if (!data) return <div className="py-8 text-center">Loading gallery...</div>

  // Prepare images array
  const IMAGES = data.images.map(img => ({
    src: img.cloudinaryUrl,
    datetime: img.createdAt
  }))

  // Sort descending
  const sortedImages = [...IMAGES].sort(
    (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  )

  // Build month options
  const months = Array.from(
    new Set(
      sortedImages.map(img => formatGroupLabel(img.datetime))
    )
  )

  // Filtering
  const filtered =
    filterMonth === 'All'
      ? sortedImages
      : sortedImages.filter(img => formatGroupLabel(img.datetime) === filterMonth)

  // Group by month-year
  const groups = filtered.reduce((acc, img) => {
    const label = formatGroupLabel(img.datetime)
    if (!acc[label]) acc[label] = []
    acc[label].push(img)
    return acc
  }, {} as Record<string, typeof filtered>)

  const flatImages = filtered

  const prevImage = () =>
    setLightboxIndex(idx =>
      idx === null ? null : (idx - 1 + flatImages.length) % flatImages.length
    )

  const nextImage = () =>
    setLightboxIndex(idx =>
      idx === null ? null : (idx + 1) % flatImages.length
    )

  return (
    <>
      <motion.section
        className="bg-[var(--black)] text-gray-50 mt-[64px] py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariant}
      >
        <div className="max-w-7xl h-screen mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header + filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <motion.div
              className="flex items-center justify-center"
              variants={itemVariant}
            >
              <GalleryHorizontalIcon
                color="var(--primary)"
                size={32}
                className="mr-2"
              />
              <h2 className="text-4xl font-extrabold text-white">
                Gym Gallery
              </h2>
            </motion.div>

            <select
              value={filterMonth}
              onChange={e => setFilterMonth(e.target.value)}
              className="p-2 border border-[#333] rounded-lg text-white bg-black"
            >
              <option className="bg-black text-white">All</option>
              {months.map(m => (
                <option className="bg-black text-white" key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Render grouped headers and grids */}
          {Object.entries(groups).map(([label, imgs]) => (
            <div key={label} className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">{label}</h3>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariant}
              >
                {imgs.map(({ src, datetime }, idx) => {
                  const globalIndex = flatImages.findIndex(
                    i => i.datetime === datetime && i.src === src
                  )
                  return (
                    <motion.div
                      key={idx}
                      className="relative overflow-hidden rounded-lg border border-gray-700 shadow-neon hover:shadow-[0_0_20px_var(--primary)] cursor-pointer"
                      variants={itemVariant}
                      onClick={() => setLightboxIndex(globalIndex)}
                    >
                      <Image
                        src={src}
                        alt={`Gallery image ${globalIndex + 1}`}
                        priority
                        width={800}
                        height={600}
                        quality={100}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover w-full h-64 hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                        {formatDatetime(datetime)}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setLightboxIndex(null)}
            >
              <X />
            </button>
            <div className="relative max-w-3xl max-h-full">
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl p-4"
                onClick={prevImage}
              >‹</button>
              <Image
                src={flatImages[lightboxIndex].src}
                alt={`Lightbox image ${lightboxIndex + 1}`}
                priority
                width={800}
                height={600}
                quality={100}
                className="object-contain max-h-screen"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded">
                {formatDatetime(flatImages[lightboxIndex].datetime)}
              </div>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl p-4"
                onClick={nextImage}
              >›</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}