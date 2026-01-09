'use client'

import { motion } from 'framer-motion'

export function FloatingPhone() {
    return (
        <div className="w-full h-80 flex items-center justify-center perspective-1000">
            <motion.div
                className="w-48 h-80 bg-black rounded-[30px] border-4 border-slate-700 shadow-2xl relative transform-style-3d"
                initial={{ rotateY: -20, rotateX: 10 }}
                animate={{
                    rotateY: [-20, 20, -20],
                    rotateX: [10, -10, 10],
                    y: [-10, 10, -10]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Screen */}
                <div className="absolute inset-1 bg-slate-900 rounded-[26px] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="h-6 w-full flex justify-center items-center gap-1 mt-1">
                        <div className="w-12 h-4 bg-black rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 grid gap-2 overflow-hidden">
                        <div className="w-full h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl" />
                        <div className="flex gap-2">
                            <div className="w-full h-20 bg-slate-800 rounded-xl" />
                            <div className="w-full h-20 bg-slate-800 rounded-xl" />
                        </div>
                        <div className="w-full h-8 bg-slate-800 rounded-lg animate-pulse" />
                        <div className="w-3/4 h-8 bg-slate-800 rounded-lg animate-pulse" />
                    </div>

                    {/* Dock */}
                    <div className="p-2 mb-2 flex justify-around">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-8 h-8 rounded-lg bg-slate-700" />
                        ))}
                    </div>
                </div>

                {/* Side Buttons (CSS 3D) */}
                <div className="absolute -right-1 top-20 w-1 h-8 bg-slate-600 rounded-r-md transform translate-z-1" />
                <div className="absolute -left-1 top-20 w-1 h-6 bg-slate-600 rounded-l-md transform translate-z-1" />
                <div className="absolute -left-1 top-32 w-1 h-12 bg-slate-600 rounded-l-md transform translate-z-1" />
            </motion.div>
        </div>
    )
}
