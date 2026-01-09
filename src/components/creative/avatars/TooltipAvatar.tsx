'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function TooltipAvatar({ name = 'User', src }: { name?: string, src?: string }) {
    const [hover, setHover] = useState(false)
    return (
        <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden cursor-pointer">
                {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : null}
            </div>
            <AnimatePresence>
                {hover && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-50 pointer-events-none"
                    >
                        {name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
