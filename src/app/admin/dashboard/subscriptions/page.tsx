'use client';
import { SubscriptionPlan } from '@/actions/subscriptions.types';
import { Loader2, PlusCircle } from 'lucide-react';
import React, { useState } from 'react'
import useSWR from 'swr';
import { motion } from 'framer-motion';
import AdminSubscriptionCard from '@/components/AdminSubscriptionCard';
import Modal from '@/components/Modal';

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json() as Promise<SubscriptionPlan[]>;
});

const AdminSubscriptionsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: plans,
    error,
    isLoading,
  } = useSWR<SubscriptionPlan[]>("/api/v1/subscriptions", fetcher);

  const onDelete = async (id: string) => {
    setIsModalOpen(true);
    console.log(`Deleting subscription plan with id: ${id}`);

  }

  if (isLoading) {
    return (
      <section className="text-center text-white">
        <h2 className="text-4xl font-extrabold mb-6">Loading Plans...</h2>
        <Loader2 className="animate-spin mx-auto mb-4 w-8 h-8 text-[var(--primary)]" />
      </section>
    );
  }
  if (error) {
    return (
      <section className="text-center text-red-400">
        <h2 className="text-4xl font-extrabold mb-6">Error Loading Plans</h2>
        <p className="text-lg">There was an error loading the subscription plans. Please try again later. {error.message}</p>
      </section>
    );
  }

  return (
    <section className="bg-[var(--black)] text-gray-50">
      <div>
        <div className='flex items-center justify-between mb-8 flex-col md:flex-row md:mb-12'>
        <motion.h2
          className="text-4xl font-extrabold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Membership & Prices
        </motion.h2>
        <button className="flex items-center w-full justify-center md:w-auto px-4 py-2 bg-[var(--primary)] rounded-lg hover:bg-[var(--primary)]/70 text-white font-medium transition sm:px-2 sm:py-2 mt-8 md:mt-0">
          <PlusCircle/>
          <span className="ml-2">Add New Subscription</span>
        </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-8">
          {plans && plans.map((plan, idx) => (
            <AdminSubscriptionCard
              key={plan.name}
              plan={plan}
              idx={idx}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalText="Are you sure you want to delete this subscription plan?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        />
    </section>
  )
}

export default AdminSubscriptionsPage