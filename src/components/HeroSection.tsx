"use client"
import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Dumbbell } from 'lucide-react'
import Image from 'next/image'

const HeroSection = () => {
    // Container and text animations
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3, when: 'beforeChildren' } }
    }

    const textVariant: Variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    }

    // Floating icons variants with hide state
    const iconVariants: Variants = {
        hidden: { opacity: 0, y: 0, rotate: 0 },
        visible: {
            y: [0, -10, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0, 1, 1, 0],
            transition: { duration: 4, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }
        }
    }

    return (
        <section className="relative w-full h-screen bg-[var(--black)] overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 pointer-events-none">
                <Image
                    src="/images/hero.jpg"
                    alt="Athlete deadlifting"
                    objectFit='cover'
                    fill
                    sizes="(max-width: 768px) 100vw, (min-width: 769px) 100vw"
                    quality={100}
                    className="opacity-30"
                    priority={true}
                />
            </div>


            {/* Floating icons now start hidden and animate in */}
            <motion.div
                className="absolute top-20 left-10"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
            >
                <Dumbbell className="w-16 h-16 text-[var(--primary)] opacity-60" />
            </motion.div>
            <motion.div
                className="absolute bottom-24 right-14"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1 }}
            >
                <Dumbbell className="w-20 h-20 text-[var(--primary)] opacity-50" />
            </motion.div>
            {/* Hero content */}
            <motion.div
                className="relative z-10 max-w-5xl flex flex-col items-start text-left px-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-white text-5xl md:text-7xl font-extrabold leading-tight"
                    variants={textVariant}
                >
                    GET IN SHAPE <span className="text-[var(--primary)]">TODAY</span>
                </motion.h1>
                <motion.p
                    className="mt-4 text-gray-300 text-lg md:text-xl"
                    variants={textVariant}
                >
                    Cutting-edge workouts, expert guidance, and a glowing community to help you shine.
                </motion.p>
                <motion.button
                    className="mt-8 bg-[var(--primary)] text-black font-bold px-8 py-4 rounded-lg shadow-neon"
                    initial={{ boxShadow: '0 0 10px var(--primary)', opacity: 0 }}
                    animate={{
                        opacity: 1,
                        boxShadow: ['0 0 10px var(--primary)', '0 0 20px var(--primary)', '0 0 10px var(--primary)']
                    }}
                    transition={{ duration: .5, ease: 'easeInOut', delay: 0.3 }}
                    whileHover={{
                        scale: 1.00,
                        boxShadow: '0 0 30px var(--primary)',
                        color: 'var(--primary)',
                        backgroundColor: 'var(--primary-dark)'
                    }}
                >
                    Join Now
                </motion.button>
            </motion.div>
        </section>
    )
}

export default HeroSection
