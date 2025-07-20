'use client'
import React from 'react'
import { Loader2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  cancelText: string
  confirmText: string
  modalText: string
  isLoading?: boolean
}

export default function Modal({ isOpen, onClose, onConfirm, cancelText, confirmText, modalText, isLoading }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black rounded-2xl p-6 relative max-w-lg w-full mx-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <p>{modalText}</p>
            <div className="mt-6 flex justify-end">
              <button onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition">
                {cancelText}
              </button>
              <button onClick={onConfirm} disabled={isLoading} className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition">
                {isLoading ? <div className='flex items-center'> <Loader2 className="animate-spin w-5 h-5" /> Deleting...</div> : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}