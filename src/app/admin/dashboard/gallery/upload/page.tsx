'use client'
import FileUploader from '@/components/FileUploader'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const GalleryUploadPage = () => {
    const router = useRouter()
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
  const handleSave = async () => {
    setIsUploading(true);
    try {
        const formData = new FormData()
        files.forEach(file => formData.append('files', file))
    
        const res = await fetch('/api/v1/gallery', {
            method: 'POST',
            body: formData,
        })
    
        if (!res.ok) {
            throw new Error('Failed to upload files')
        }
        router.push('/admin/dashboard/gallery')
        toast.success('Files uploaded successfully')
    } catch (error) {
        console.error('Error uploading files:', error)
        toast.error('Failed to upload files')
    } finally {
        setIsUploading(false);
    }
  }


    return (
        <main>
            <button
                type="button"
                onClick={() => router.push('/admin/dashboard/subscriptions')}
                className="flex items-center mb-6 text-gray-400 hover:text-gray-200 transition"
            >
                <ArrowLeft className="w-6 h-6 mr-2" />
                <span>Back to subscriptions</span>
            </button>
            <h1 className="text-2xl font-bold mb-4">Upload Gallery Images</h1>
            <p className="text-gray-400 mb-6">You can upload up to 5 images at once to the gallery.</p>
            <FileUploader multiple onChange={setFiles} />
            <div className="mt-8 flex justify-end">
<button
    type="button"
    disabled={files.length === 0 || isUploading}
    onClick={handleSave}
    className="px-4 py-2 bg-primary rounded-lg text-white disabled:opacity-50 flex items-center gap-2"
>
    {isUploading ? (
        <>
            <Loader2 className="animate-spin w-5 h-5" />
            Uploading...
        </>
    ) : (
        'Save'
    )}
</button>
</div>
        </main>
    )
}

export default GalleryUploadPage