"use client"

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { ArrowRight, Megaphone } from 'lucide-react'
import Link from 'next/link'

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

// Announcements Section
export function AnnouncementsSection() {
  const announcements = [
    { date: 'Aug 2025', title: 'New Treadmill Lineup', details: 'Arriving soon with the latest tech for your training.' },
    { date: 'July 2025', title: 'AC Upgrade Complete', details: 'Enjoy cooler workouts with our new air conditioning.' },
    { date: 'Jul 30, 2025', title: 'Free Training Tips Event', details: 'Community event with expert tips and demos.' },
  ];

  return (
    <motion.section
      className="relative bg-[var(--black)] text-gray-50 py-20 overflow-visible"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariant}
    >
      {/* Neon diffuse circles background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-[var(--primary)] opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-8 w-48 h-48 bg-[var(--primary)] opacity-15 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-[var(--primary)] opacity-10 rounded-full blur-2xl animate-pulse" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-12">
          <Megaphone className="w-8 h-8 text-[var(--primary)] mr-2" />
          <h2 className="text-3xl font-extrabold">Announcements</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {announcements.map((item, idx) => (
            <motion.div
              key={item.title}
              className="bg-[var(--black)] border border-gray-700 rounded-2xl p-6 shadow-neon flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <span className="text-sm text-[var(--primary)] mb-2">{item.date}</span>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-300 flex-grow">{item.details}</p>
              <Link href="#" className="mt-4 self-start text-primary font-semibold flex items-center justify-center">
                Read More
                <ArrowRight className="inline-block mr-1" size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}