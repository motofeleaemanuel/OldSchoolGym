"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(prev => !prev);
  const MotionLink = motion.create(Link);
  const router = useRouter();
  const linkHoverColor = 'var(--primary)';

  const menuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.2 } },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  }
  const linkHover = { color: linkHoverColor, transition: { duration: 0.2 } }
  const links = [{ link: '/pages/home', label: 'Home' }, { link: '/pages/gallery', label: 'Gallery' }, { link: '/pages/blog', label: "Blog" }]

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[var(--black)] bg-opacity-50 md:bg-transparent md:bg-opacity-0 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 py-2">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/')}>
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
              priority
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map(item => (
              <MotionLink
                href={item.link}
                key={item.label}
                whileHover={linkHover}
                className="no-underline"
              >
                {item.label}
              </MotionLink>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden overflow-hidden bg-[var(--black)] bg-opacity-90"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black">
              {links.map(item => (
                <MotionLink
                  key={item.label}
                  href={item.link}
                  whileHover={linkHover}
                  className="block px-3 py-2 rounded-md text-base font-medium no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </MotionLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navigation
