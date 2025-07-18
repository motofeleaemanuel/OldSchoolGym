"use client"
import React from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ isOpen, onClose, onConfirm, cancelText, confirmText, modalText }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cancelText: string;
  confirmText: string;
  modalText: string;
}) {
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
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <p>{modalText}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Usage example:
// const [open, setOpen] = useState(false)
// <Modal isOpen={open} onClose={() => setOpen(false)}>Your content here</Modal>

// Let me know if you want modal variants for forms, confirmations, or destructive actions for your upcoming admin interfaces this week.
