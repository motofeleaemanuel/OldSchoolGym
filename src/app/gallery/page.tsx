"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { GalleryHorizontalIcon, X } from 'lucide-react'

// Format datetime with fixed locale to avoid SSR/client mismatch
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

// Format month-year header
const formatGroupLabel = (iso: string) => {
  const date = new Date(iso)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// Gallery images with datetime metadata
const images = [
  { src: '/images/logo.jpg', datetime: '2025-07-10T14:30:00' },
  { src: '/images/logo.jpg', datetime: '2025-07-12T09:15:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-07-13T17:50:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-07-08T11:05:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-07-14T20:00:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-06-30T08:00:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-06-25T19:30:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-06-07T07:45:00' }
]

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
}

const itemVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Sort array by datetime descending
  const sortedImages = [...images].sort(
    (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  )

  // Group by month-year
  const groups = sortedImages.reduce((acc, img) => {
    const label = formatGroupLabel(img.datetime)
    if (!acc[label]) acc[label] = []
    acc[label].push(img)
    return acc
  }, {} as Record<string, typeof sortedImages>)

  const prevImage = () => {
    setLightboxIndex(idx => (idx === null ? null : (idx - 1 + sortedImages.length) % sortedImages.length))
  }
  const nextImage = () => {
    setLightboxIndex(idx => (idx === null ? null : (idx + 1) % sortedImages.length))
  }

  const flatImages = sortedImages

  return (
    <>
      <motion.section
        className="bg-[var(--black)] text-gray-50 mt-[64px] py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariant}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 flex items-center justify-center"
            variants={itemVariant}
          >
            <GalleryHorizontalIcon color='var(--primary)' size={32} className='mr-2'/>
            <h2 className="text-4xl font-extrabold text-white">
              Gym Gallery
            </h2>
          </motion.div>

          {/* Render grouped headers and grids */}
          {Object.entries(groups).map(([label, imgs]) => (
            <div key={label} className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">{label}</h3>
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariant}>
                {imgs.map(({ src, datetime }, idx) => {
                  const globalIndex = flatImages.findIndex(i => i.datetime === datetime && i.src === src)
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
    </>
  )
}
