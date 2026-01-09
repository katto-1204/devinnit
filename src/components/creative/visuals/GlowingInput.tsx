'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GlowingInputProps {
    placeholder?: string
    type?: string
}

export function GlowingInput({ placeholder = 'Enter text...', type = 'text' }: GlowingInputProps) {
    const [focused, setFocused] = useState(false)

    return (
        <div className="relative w-full max-w-sm group">
            {/* Animated Gradient Border */}
            <motion.div
                className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"
                animate={{
                    backgroundPosition: focused ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
                    opacity: focused ? 1 : 0
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ backgroundSize: "200% 200%" }}
            />

            {/* Input Container */}
            <div className="relative bg-[#0a0a0a] rounded-xl p-[1px]">
                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-[#0a0a0a] rounded-xl text-white placeholder-gray-500 outline-none focus:bg-[#1a1a1a] transition-all"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />

                {/* Search Icon or Indicator */}
                <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors duration-300 ${focused ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-gray-600'}`} />
            </div>
        </div>
    )
}
