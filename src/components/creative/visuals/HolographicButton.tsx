'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface HolographicButtonProps {
    text: string
    onClick?: () => void
}

export function HolographicButton({ text, onClick }: HolographicButtonProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.button
            className="relative px-8 py-3 bg-transparent group"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
        >
            {/* Background Layers */}
            <span className="absolute inset-0 border border-cyan-500/50 rounded-lg group-hover:bg-cyan-500/10 transition-colors" />

            {/* Glitch Layers - Only visible on hover */}
            {isHovered && (
                <>
                    <motion.span
                        className="absolute inset-0 border border-red-500 rounded-lg opacity-50"
                        animate={{
                            x: [-2, 2, -1, 0],
                            y: [1, -1, 0]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    />
                    <motion.span
                        className="absolute inset-0 border border-blue-500 rounded-lg opacity-50"
                        animate={{
                            x: [2, -2, 1, 0],
                            y: [-1, 1, 0]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
                    />
                </>
            )}

            {/* Text */}
            <span className="relative font-mono font-bold tracking-widest text-cyan-500 group-hover:text-white transition-colors uppercase">
                {text}
            </span>
        </motion.button>
    )
}
