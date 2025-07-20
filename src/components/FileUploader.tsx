// components/FileUploader.tsx
'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { UploadCloud, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface UploadFile {
  file: File
  progress: number
  preview?: string
}

interface FileUploaderProps {
  multiple?: boolean
  onChange?: (files: File[]) => void
  maxFiles?: number // Add optional maxFiles prop
}

// Helper to format file size
const formatSize = (size: number) => {
  if (size >= 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + ' MB'
  } else if (size >= 1024) {
    return (size / 1024).toFixed(2) + ' kB'
  }
  return size + ' B'
}

export default function FileUploader({ multiple = true, onChange, maxFiles = 5 }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploads, setUploads] = useState<UploadFile[]>([])
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml'
  ]

  // Notify parent on upload change
  useEffect(() => {
    onChange?.(uploads.map(u => u.file))
  }, [uploads, onChange])

  const startUpload = (file: File) => {
    const reader = new FileReader()
    const isImage = file.type.startsWith('image/')
    const preview = isImage ? URL.createObjectURL(file) : undefined
    const upload: UploadFile = { file, progress: 0, preview }
    setUploads(prev => multiple ? [...prev, upload] : [upload])

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100)
        setUploads(prev => prev.map(u =>
          u.file === file ? { ...u, progress: percent } : u
        ))
      }
    }
    reader.onloadend = () => {
      setUploads(prev => prev.map(u =>
        u.file === file ? { ...u, progress: 100 } : u
      ))
    }
    reader.readAsArrayBuffer(file)
  }

  const handleFiles = (fileList: FileList) => {
    const fileArray = Array.from(fileList)
    const filtered = fileArray.filter(f => validTypes.includes(f.type))
    const availableSlots = multiple
      ? maxFiles - uploads.length
      : maxFiles

    if (availableSlots <= 0) return

    const toUpload = filtered.slice(0, availableSlots)
    toUpload.forEach(startUpload)
  }

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
      e.dataTransfer.clearData()
    }
  }, [uploads.length])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files)
  }

  const removeFile = (index: number) => {
    const newUploads = uploads.filter((_, i) => i !== index)
    setUploads(newUploads)
    onChange?.(newUploads.map(u => u.file))
  }

  const isAtMax = uploads.length >= maxFiles

  return (
    <div>
      <div
        className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition focus:outline-none ${
          dragActive ? 'border-[var(--primary)] bg-[#222]' : 'border-gray-600 bg-black'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          id="file-upload-input"
          type="file"
          accept={validTypes.join(',')}
          multiple={multiple}
          disabled={isAtMax}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleInputChange}
        />
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center text-center"
        >
          <UploadCloud className="w-12 h-12 text-[var(--primary)] mb-2" />
          <p className="text-gray-300">
            {isAtMax
              ? `Maximum of ${maxFiles} files reached`
              : 'Drag & drop files here or'}
          </p>
          {!isAtMax && (
            <label
              htmlFor="file-upload-input"
              className="mt-2 px-4 py-2 bg-[var(--primary)] rounded-lg text-white font-medium cursor-pointer hover:bg-[var(--primary)]/80"
            >
              Browse Files
            </label>
          )}
        </motion.div>
      </div>

      {uploads.length > 0 && (
        <ul className="mt-4 space-y-4">
          {uploads.map((upload, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between p-4 bg-[#222] rounded-lg"
            >
              <div className="flex-1 flex items-center">
                {upload.preview && (
                  <Image
                    src={upload.preview}
                    alt={upload.file.name}
                    width={0}
                    height={0}
                    className="mr-4 rounded h-[50px] w-auto"
                    loading='lazy'
                  />
                )}
                <div className="overflow-hidden w-full">
                  <p className="text-white truncate">{upload.file.name}</p>
                  <p className="text-gray-400 text-sm">
                    {formatSize(upload.file.size)}
                  </p>
                  <div className="w-full h-1 bg-[#222] rounded mt-2 overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)]"
                      style={{ width: `${upload.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFile(idx)}
                className="ml-4 text-gray-400 hover:text-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
