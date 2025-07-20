'use client'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { Loader2, PlusCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import AdminSubscriptionCard from '@/components/AdminSubscriptionCard'
import Modal from '@/components/Modal'
import { SubscriptionPlan } from '@/actions/subscriptions.types'
import { useRouter } from 'next/navigation'

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok")
    return res.json() as Promise<SubscriptionPlan[]>
  })

export default function AdminSubscriptionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const router = useRouter();

  const { data: plans, error, isLoading } = useSWR<SubscriptionPlan[]>(
    '/api/v1/subscriptions',
    fetcher
  )

  // Called when trash icon clicked on a card
  const handleDeleteClick = (id: string) => {
    setSelectedId(id)
    setIsModalOpen(true)
  }

  // Called when user confirms in modal
  const handleConfirmDelete = async () => {
    if (!selectedId) return
    try {
      const res = await fetch(`/api/v1/subscriptions/${selectedId}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      mutate('/api/v1/subscriptions')
    } catch (err) {
      console.error(err)
    } finally {
      setIsModalOpen(false)
      setSelectedId(null)
    }
  }

  if (isLoading) return (
    <section className="text-center text-white">
      <h2 className="text-4xl font-extrabold mb-6">Loading Plans…</h2>
      <Loader2 className="animate-spin mx-auto mb-4 w-8 h-8 text-[var(--primary)]" />
    </section>
  )
  if (error) return (
    <section className="text-center text-red-400">
      <h2 className="text-4xl font-extrabold mb-6">Error Loading Plans</h2>
      <p className="text-lg">Error: {error.message}</p>
    </section>
  )

  return (
    <section className="bg-[var(--black)] text-gray-50">
       <div className='flex items-center justify-between mb-8 flex-col md:flex-row md:mb-12 md:items-center'>
        <motion.h2
          className="text-4xl font-extrabold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Membership & Prices
        </motion.h2>
        <button className="flex items-center w-full justify-center md:w-auto md:mt-0 px-4 py-2 bg-[var(--primary)] rounded-lg hover:bg-[var(--primary)]/70 text-white font-medium transition sm:px-2 sm:py-2 mt-8 lg:mt-0"
        onClick={() => router.push(`/admin/dashboard/subscriptions/add`)}>
          <PlusCircle />
          <span className="ml-2">Add New Subscription</span>
        </button>
      </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-8">
        {plans?.map((plan, idx) => (
          <AdminSubscriptionCard
            key={plan._id}
            plan={plan}
            idx={idx}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedId(null)
        }}
        modalText="Are you sure you want to delete this subscription plan?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
      />
    </section>
  )
}