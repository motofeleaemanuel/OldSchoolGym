'use client'
import React from 'react'
import useSWR from 'swr'
import { Loader2 } from 'lucide-react'
import SubscriptionForm from '@/components/SubscriptionForm'
import { z } from 'zod'
import { useParams } from 'next/navigation'

// Zod schema for fetching and parsing existing plan
const SubscriptionPlanSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  currency: z.string(),
  details: z.array(z.string()),
})

type PlanType = z.infer<typeof SubscriptionPlanSchema>

const fetcher = async (url: string): Promise<PlanType> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Network response was not ok')
  const data = await res.json()
  return SubscriptionPlanSchema.parse(data)
}

export default function EditSubscriptionPage() {
  const { id } = useParams() as { id?: string }
  const { data: plan, error, isLoading } = useSWR(
    id ? `/api/v1/subscriptions/${id}` : null,
    fetcher
  )

  if (isLoading) return <Loader2 className="animate-spin text-primary mx-auto my-10" />
  if (error)     return <p className="text-red-500 text-center mt-10">{error.message}</p>

  if (!plan) return null;

  const initialData = {
    _id: plan._id,
    name: plan.name,
    price: plan.price,
    currency: plan.currency,
    details: plan.details,
  }

  return (
    <main className='w-auto'>
      <SubscriptionForm initialData={initialData} />
    </main>
  )
}
