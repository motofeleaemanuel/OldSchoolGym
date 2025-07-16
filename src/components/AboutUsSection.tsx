"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const imageUrls = [
  '/images/cbum2.jpg',
  '/images/cbum3.jpg',
  '/images/cbum1.jpg',
]

export default function AboutUsSection() {
  return (
    <section className="max-w-7xl mx-auto text-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold text-white">
          Welcome to Old School Gym
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-300 mt-4">
          Founded in 2018 in Năsăud, our community-driven gym has grown into a symbol of strength and solidarity. With top-notch equipment and a passionate community, we support athletes of all levels in achieving their fitness goals.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
        variants={{ hidden: {}, visible: {} }}
      >
        {/* Main image: spans two columns on md+ */}
        <motion.div
          className="relative w-full h-80 md:col-span-2 md:h-96 rounded-lg overflow-hidden border border-gray-700 shadow-neon"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={imageUrls[0]}
            alt="Gym interior main"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Two side images stacked */}
        <div className="space-y-6">
          {[imageUrls[1], imageUrls[2]].map((src, idx) => (
            <motion.div
              key={idx}
              className="relative w-full h-40 md:h-44 rounded-lg overflow-hidden border border-gray-700 shadow-neon"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <Image
                src={src}
                alt={`Gym snapshot ${idx + 2}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}