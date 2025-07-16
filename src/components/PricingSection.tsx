"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Calendar, Clock, DollarSign } from 'lucide-react'

const plans = [
  {
    title: 'Unlimited Monthly',
    price: 'RON 149.99',
    features: ['Unlimited entries', 'All Access'],
    icon: <Calendar className="w-8 h-8 text-[var(--primary)]" />, 
  },
  {
    title: '3x Week Pass',
    price: 'RON 99.99',
    features: ['3 entries per week', 'All Access',],
    icon: <Clock className="w-8 h-8 text-[var(--primary)]" />, 
  },
  {
    title: '2-Week Unlimited',
    price: 'RON 99.99',
    features: ['Unlimited 2 weeks', 'All Access'],
    icon: <Calendar className="w-8 h-8 text-[var(--primary)]" />, 
  },
  {
    title: 'Single Entry',
    price: 'RON 4.00',
    features: ['One-time entry', 'All Access'],
    icon: <DollarSign className="w-8 h-8 text-[var(--primary)]" />, 
  },
]

export default function PricingSection() {
  return (
    <section className="bg-[var(--black)] text-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-extrabold text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Membership & Prices
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.title}
              className="bg-[var(--black)] border border-gray-700 rounded-2xl p-6 flex flex-col items-center text-center shadow-neon"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--primary)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.2, delay: idx * 0.1 }}
            >
              <div className="mb-4">
                {plan.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                {plan.title}
              </h3>
              <p className="text-3xl font-bold mb-4">
                {plan.price}
              </p>
              <ul className="space-y-2 mb-6">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-[var(--primary)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}