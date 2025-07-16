"use client"

import React from 'react'
import { motion } from 'framer-motion'
import SubscriptionCard from './SubscriptionCard'
import { SubscriptionPlan } from '@/actions/subscriptions.types';
import { Loader2 } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json() as Promise<SubscriptionPlan[]>;
});

export default function PricingSection() {

  const {
    data: plans,
    error,
    isLoading,
  } = useSWR<SubscriptionPlan[]>("/api/v1/subscriptions", fetcher);

  if (isLoading) {
    return (
      <section className="py-20 text-center text-white">
        <h2 className="text-4xl font-extrabold mb-6">Loading Plans...</h2>
        <Loader2 className="animate-spin mx-auto mb-4 w-8 h-8 text-[var(--primary)]" />
      </section>
    );
  }
  if (error) {
    return (
      <section className="py-20 text-center text-red-400">
        <h2 className="text-4xl font-extrabold mb-6">Error Loading Plans</h2>
        <p className="text-lg">There was an error loading the subscription plans. Please try again later. {error.message}</p>
      </section>
    );
  }

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
          {plans && plans.map((plan, idx) => (
            <SubscriptionCard
              key={plan.name}
              plan={plan}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </section>
  )
}