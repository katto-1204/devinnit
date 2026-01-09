'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function BookFlip3D() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="perspective-1000 w-40 h-52 cursor-pointer" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <motion.div
                className="relative w-full h-full transform-style-3d transition-transform duration-700"
                animate={{ rotateY: isOpen ? -160 : 0 }}
            >
                <div className="absolute inset-0 bg-blue-900 rounded-lg p-4 flex items-center justify-center border-l-4 border-l-white/20 shadow-xl z-20">
                    <span className="text-white font-serif text-xl font-bold">The Book</span>
                </div>
                <div className="absolute inset-0 bg-white rounded-lg p-4 text-xs text-slate-800 rotate-y-180 flex items-center justify-center transform -scale-x-100 z-10 shadow-lg border border-slate-200">
                    <p>Once upon a time in a digital world far away...</p>
                </div>
            </motion.div>
        </div>
    )
}
