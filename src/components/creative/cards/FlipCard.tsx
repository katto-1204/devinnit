'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function FlipCard({ frontContent, backContent }: { frontContent: React.ReactNode, backContent: React.ReactNode }) {
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <div
            className="w-64 h-80 perspective-1000 cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full transform-style-3d transition-all duration-500"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
            >
                {/* Front Side */}
                <div
                    className="absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 flex flex-col items-center justify-center shadow-2xl text-white"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="w-16 h-16 bg-blue-500 rounded-full mb-4 flex items-center justify-center text-2xl animate-bounce">
                        👋
                    </div>
                    {frontContent}
                    <p className="mt-4 text-xs text-slate-400 uppercase tracking-widest font-bold">Click to Flip</p>
                </div>

                {/* Back Side */}
                <div
                    className="absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-orange to-red-600 p-6 flex flex-col items-center justify-center shadow-2xl text-white rotate-y-180"
                    style={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    <div className="w-16 h-16 bg-white/20 rounded-full mb-4 flex items-center justify-center text-2xl">
                        ✨
                    </div>
                    {backContent}
                    <button className="mt-6 px-4 py-2 bg-white text-orange rounded-lg text-sm font-bold shadow-lg hover:scale-105 transition-transform">
                        Action
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
