'use client'

import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

export function SuccessBurst() {
    const [isPlaying, setIsPlaying] = useState(false)
    const controls = useAnimation()

    const trigger = async () => {
        setIsPlaying(true)
        await controls.start("visible")
        setTimeout(() => {
            setIsPlaying(false)
            controls.start("hidden")
        }, 2000)
    }

    return (
        <div className="relative flex items-center justify-center p-8">
            <button
                onClick={trigger}
                className="px-6 py-2 bg-green-500 rounded-full text-white font-bold hover:bg-green-600 active:scale-95 transition-all"
            >
                {isPlaying ? 'Success!' : 'Complete Action'}
            </button>

            {/* Particles */}
            {isPlaying && Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: ['#f87171', '#fbbf24', '#34d399', '#60a5fa'][i % 4] }}
                    initial={{ x: 0, y: 0, scale: 0 }}
                    animate={{
                        x: Math.cos(i * 30 * (Math.PI / 180)) * 60,
                        y: Math.sin(i * 30 * (Math.PI / 180)) * 60,
                        scale: [1, 0],
                        opacity: [1, 0]
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            ))}

            {/* Center Burst */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10 shadow-lg border-2 border-white pointer-events-none"
                    >
                        <Check className="text-white w-6 h-6" strokeWidth={3} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
