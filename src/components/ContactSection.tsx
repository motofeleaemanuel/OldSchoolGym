"use client";

import React from 'react'
import dynamic from 'next/dynamic'
import { Mail, MapPin, Clock, Phone } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}


const LazyMap = dynamic(() => import("@/components/DynamicMap"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export function ContactSection() {
  return (
    <motion.section
      className="bg-[var(--black)] text-gray-50 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariant}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4">Get in Touch</h2>
          <p className="text-gray-300 mb-6">
            Have questions? Reach out and we&#39;ll reply ASAP.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="w-6 h-6 text-[var(--primary)] mr-2" />
              <span>Năsăud, Strada Principală, Nr. 10</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-[var(--primary)] mr-2" />
              <span>contact@gymnasaud.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-[var(--primary)] mr-2" />
              <span>+40 123 456 789</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-[var(--primary)] mr-2" />
              <span>Mon–Fri: 6 am–10 pm | Sat–Sun: 8 am–8 pm</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-80 w-full rounded-lg overflow-hidden shadow-lg">
            <LazyMap />
        </div>
      </div>
    </motion.section>
  )
}
