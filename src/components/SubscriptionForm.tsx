'use client'
import React, { useState, FormEvent } from 'react'
import { Loader2, X, Plus, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

const SubscriptionInputSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().nonnegative('Price must be non-negative'),
    currency: z.string().length(3, 'Currency must be a 3-letter code'),
    details: z.array(z.string()),
})

type SubscriptionInput = z.infer<typeof SubscriptionInputSchema>

interface SubscriptionFormProps {
    initialData?: SubscriptionInput & { _id: string }
}

export default function SubscriptionForm({ initialData }: SubscriptionFormProps) {
    const isEditMode = Boolean(initialData)
    const router = useRouter()

    // Form state
    const [name, setName] = useState(initialData?.name || '')
    const [price, setPrice] = useState(initialData?.price.toString() || '0')
    const [currency] = useState(initialData?.currency || 'RON')
    const [details, setDetails] = useState<string[]>(initialData?.details || [''])
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Handlers for details array
    const handleDetailChange = (index: number, value: string) => {
        setDetails(prev => prev.map((d, i) => (i === index ? value : d)))
    }
    const addDetail = () => setDetails(prev => [...prev, ''])
    const removeDetail = (index: number) => setDetails(prev => prev.filter((_, i) => i !== index))

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        setSaving(true)

        const raw: SubscriptionInput = {
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
            const method = isEditMode ? 'PUT' : 'POST'
            const url = isEditMode
                ? `/api/v1/subscriptions/${initialData!._id}`
                : `/api/v1/subscriptions`

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsed.data),
            })
            if (!res.ok) throw new Error('Failed to save subscription')

            router.push('/admin/dashboard/subscriptions')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unexpected error')
        } finally {
            setSaving(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-auto">
            <button
                type="button"
                onClick={() => router.push('/admin/dashboard/subscriptions')}
                className="flex items-center mb-6 text-gray-400 hover:text-gray-200 transition"
            >
                <ArrowLeft className="w-6 h-6 mr-2" />
                <span>Back to subscriptions</span>
            </button>
            <h1 className="text-3xl font-bold">
                {isEditMode ? 'Edit Subscription' : 'Add New Subscription'}
            </h1>

            {/* Name */}
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

            {/* Price */}
            <div>
                <label htmlFor="price" className="block mb-1 text-sm font-medium">Price</label>
                <div className='flex items-center space-x-2 w-full'>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="block w-full p-3 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="0.00"
                    />
                    <div className='ml-4 text-lg font-bold'>RON</div>
                </div>

            </div>

            {/* Details */}
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
                        <button type="button" onClick={() => removeDetail(idx)}>
                            <X className="text-gray-400 hover:text-red-500" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addDetail}
                    className="flex items-center space-x-1 text-primary hover:underline"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add detail</span>
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={saving}
                className="w-full flex justify-center items-center px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg text-white font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-light"
            >
                {saving && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
                <span>{saving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Plan'}</span>
            </button>
        </form>
    )
}