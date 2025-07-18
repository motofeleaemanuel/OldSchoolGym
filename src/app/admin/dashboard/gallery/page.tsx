"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { GalleryHorizontalIcon, X, PlusCircle, Trash2 } from 'lucide-react'
import Modal from '@/components/Modal'

// Mock images as in original GallerySection
const IMAGES = [
  { src: '/images/logo.jpg', datetime: '2025-07-10T14:30:00' },
  { src: '/images/logo.jpg', datetime: '2025-07-12T09:15:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-07-13T17:50:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-07-08T11:05:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-07-14T20:00:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-06-30T08:00:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-06-25T19:30:00' },
  { src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80', datetime: '2025-06-07T07:45:00' }
]

// Animation variants
const containerVariant: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }
const itemVariant: Variants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } } }

export default function AdminGalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null)
  const [filterMonth, setFilterMonth] = useState('All')
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 6

  // Sort descending
  const sorted = [...IMAGES].sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())

  // Build month options
  const months = Array.from(new Set(sorted.map(img => new Date(img.datetime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))))

  // Filter
  const filtered = filterMonth === 'All'
    ? sorted
    : sorted.filter(img => new Date(img.datetime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) === filterMonth)

  // Pagination data slice
  const paged = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  // Group paged
  const grouped = paged.reduce((acc, img) => {
    const label = new Date(img.datetime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    if (!acc[label]) acc[label] = []
    acc[label].push(img)
    return acc
  }, {} as Record<string, typeof paged>)

  const openDelete = (idx: number) => { setPendingDeleteIndex(idx); setIsModalOpen(true) }
  const confirmDelete = () => {
    if (pendingDeleteIndex !== null) {
      const globalIdx = page * PAGE_SIZE + pendingDeleteIndex
      sorted.splice(globalIdx, 1)
      setPendingDeleteIndex(null)
    }
    setIsModalOpen(false)
  }
  const prevImage = () => setLightboxIndex(idx => (idx === null ? null : (idx - 1 + sorted.length) % sorted.length))
  const nextImage = () => setLightboxIndex(idx => (idx === null ? null : (idx + 1) % sorted.length))

  return (
    <>
      <section className="bg-[var(--black)] text-gray-50 min-h-screen">
        <div>
          {/* Header + filter + add */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between mb-8">
            <div className="flex items-center space-x-4">
              <motion.div initial="hidden" animate="visible" variants={itemVariant} className="flex items-center">
                <GalleryHorizontalIcon size={32} color="var(--primary)" className="mr-2" />
                <h2 className="text-4xl font-extrabold">Gallery</h2>
              </motion.div>
              <select
                value={filterMonth}
                onChange={e => { setFilterMonth(e.target.value); setPage(0) }}
                className="p-2 border border-gray-600 rounded-lg text-white"
              >
                <option className='bg-black text-white'>All</option>
                {months.map(m => <option className='bg-black text-white' key={m}>{m}</option>)}
              </select>
            </div>
            <button
              onClick={() => {/* trigger add workflow */}}
              className="flex items-center justify-center w-full sm:w-auto px-3 py-2 bg-[var(--primary)] hover:bg-[var(--primary)]/80 rounded-lg text-white transition"
            >
              <PlusCircle className="w-6 h-6" />
              <span className="ml-2 hidden sm:inline">Add Image</span>
            </button>
          </div>

          {/* Gallery Grid */}
          {Object.entries(grouped).map(([label, imgs]) => (
            <div key={label} className="mb-12">
              <h3 className="text-2xl font-bold mb-4">{label}</h3>
              <motion.div initial="hidden" animate="visible" variants={containerVariant} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {imgs.map((img, idx) => (
                  <motion.div key={idx} variants={itemVariant} className="relative overflow-hidden rounded-lg border border-gray-700 shadow-neon hover:shadow-[0_0_20px_var(--primary)]">
                    <Image
                      src={img.src}
                      alt=""
                      width={800} height={600}
                      className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setLightboxIndex(page * PAGE_SIZE + idx)}
                    />
                    <button onClick={() => openDelete(idx)} className="absolute top-2 right-2 bg-black/50 p-1 rounded text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <button disabled={page === 0} onClick={() => setPage(p => Math.max(p-1,0))} className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50">Previous</button>
            <span>Page {page+1} of {totalPages || 1}</span>
            <button disabled={page+1 >= totalPages} onClick={() => setPage(p => Math.min(p+1,totalPages-1))} className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50">Next</button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setLightboxIndex(null)}><X /></button>
            <div className="relative max-w-3xl max-h-full">
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl p-4" onClick={prevImage}>‹</button>
              <Image src={sorted[lightboxIndex].src} alt="" width={800} height={600} className="object-contain max-h-screen" />
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl p-4" onClick={nextImage}>›</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} cancelText="Cancel" confirmText="Delete" modalText="Are you sure you want to delete this image?" />
    </>
  )
}
