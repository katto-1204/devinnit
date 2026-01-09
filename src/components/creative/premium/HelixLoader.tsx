'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function HelixLoader() {
    const dots = 20

    return (
        <div className="relative flex items-center justify-center h-[200px] w-full bg-slate-900 rounded-xl overflow-hidden">
            <div className="flex gap-2">
                {Array.from({ length: dots }).map((_, i) => (
                    <div key={i} className="relative w-2 h-32 flex flex-col justify-between">
                        {/* Top Strand */}
                        <motion.div
                            className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                            animate={{
                                y: [0, 100, 0],
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1],
                                zIndex: [0, 10, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.1,
                            }}
                        />

                        {/* Bottom Strand */}
                        <motion.div
                            className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]"
                            animate={{
                                y: [0, -100, 0],
                                scale: [1, 0.5, 1],
                                opacity: [1, 0.5, 1],
                                zIndex: [10, 0, 10]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.1,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
