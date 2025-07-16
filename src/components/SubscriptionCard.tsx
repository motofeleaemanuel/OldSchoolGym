import { Calendar, CheckCircle } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { SubscriptionPlan } from '@/actions/subscriptions.types';

const SubscriptionCard = ({ plan, idx }: { plan: SubscriptionPlan; idx: number }) => {
  return (
    <motion.div
              key={plan.name}
              className="bg-[var(--black)] border border-gray-700 rounded-2xl p-6 flex flex-col items-center text-center shadow-neon"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--primary)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.2, delay: idx * 0.1 }}
            >
              <div className="mb-4">
                <Calendar className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                {plan.name}
              </h3>
              <p className="text-3xl font-bold mb-4">
                {plan.currency} {plan.price}
              </p>
              <ul className="space-y-2 mb-6">
                {plan.details.map(detail => (
                  <li key={detail} className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-[var(--primary)]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
  )
}

export default SubscriptionCard