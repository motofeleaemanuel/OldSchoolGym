"use client"
import React, { useState, useEffect, FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'
import useSWR from 'swr'
import { Loader2, X, Plus, ArrowLeft } from 'lucide-react'
import { z } from 'zod'

// Zod schemas
const SubscriptionPlanSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, 'Name is required'),
  price: z.number().nonnegative('Price must be non-negative'),
  currency: z.string().length(3, 'Currency must be a 3-letter code'),
  details: z.array(z.string()),
})

const SubscriptionInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().nonnegative('Price must be non-negative'),
  currency: z.string().length(3, 'Currency must be a 3-letter code'),
  details: z.array(z.string()),
})

type PlanType = z.infer<typeof SubscriptionPlanSchema>

type InputType = z.infer<typeof SubscriptionInputSchema>

const fetcher = async (url: string): Promise<PlanType> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Network response was not ok')
  const data = await res.json()
  return SubscriptionPlanSchema.parse(data)
}

export default function EditSubscriptionPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const { data: plan, error: fetchError, isLoading } = useSWR(
    id ? `/api/v1/subscriptions/${id}` : null,
    fetcher
  )

  // Form state
  const [name, setName] = useState('')
  const [price, setPrice] = useState('0')
  const [currency, setCurrency] = useState('')
  const [details, setDetails] = useState<string[]>([''])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Populate form
  useEffect(() => {
    if (plan) {
      setName(plan.name)
      setPrice(plan.price.toString())
      setCurrency(plan.currency)
      setDetails(plan.details.length ? plan.details : [''])
    }
  }, [plan])

  const handleDetailChange = (index: number, value: string) => {
    setDetails(prev => prev.map((d, i) => i === index ? value : d))
  }

  const addDetail = () => setDetails(prev => [...prev, ''])
  const removeDetail = (index: number) => setDetails(prev => prev.filter((_, i) => i !== index))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const raw: InputType = {
      name,
      price: parseFloat(price),
      currency,
      details: details.map(d => d.trim()).filter(Boolean),
    }

    const parsed = SubscriptionInputSchema.safeParse(raw)
    if (!parsed.success) {
      setError(parsed.error.issues.map(i => i.message).join(', '))
      setSaving(false)
      return
    }

    try {
      const res = await fetch(`/api/v1/subscriptions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      if (!res.ok) throw new Error('Failed to update')
      router.push('/admin/dashboard/subscriptions')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) return <Loader2 className="animate-spin text-primary mx-auto my-10" />
  if (fetchError) return <p className="text-red-500 text-center mt-10">{fetchError.message}</p>

  return (
    <main className="p-6">
      <button
        type="button"
        onClick={() => router.push('/admin/dashboard/subscriptions')}
        className="flex items-center mb-6 text-gray-400 hover:text-gray-200 transition"
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
        <span>Back to subscriptions</span>
      </button>
      <h1 className="text-3xl font-bold mb-6">Edit Subscription</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium">Name</label>
          <input
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="block w-full p-3 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter plan name"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1 text-sm font-medium">Price</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="block w-full p-3 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.00"
          />
        </div>
        <div>
          <label htmlFor="currency" className="block mb-1 text-sm font-medium">Currency</label>
          <input
            id="currency"
            value={currency}
            onChange={e => setCurrency(e.target.value.toUpperCase())}
            className="block w-full p-3 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="USD"
            maxLength={3}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Details</label>
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-center space-x-2 mb-2">
              <input
                value={detail}
                onChange={e => handleDetailChange(idx, e.target.value)}
                className="flex-1 p-3 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Feature detail"
              />
              <button
                type="button"
                onClick={() => removeDetail(idx)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <X />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDetail}
            className="flex items-center space-x-1 text-primary hover:underline focus:outline-none"
          >
            <Plus className="w-5 h-5" />
            <span>Add detail</span>
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={saving}
          className="w-full flex justify-center items-center px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg text-white font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-light"
        >
          {saving ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : null}
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </form>
    </main>
  )
}
