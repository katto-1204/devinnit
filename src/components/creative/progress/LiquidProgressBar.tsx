'use client'

import { motion } from 'framer-motion'

export function LiquidProgressBar({ progress = 60 }: { progress?: number }) {
    return (
        <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
                className="absolute top-0 left-0 h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-shimmer bg-[length:200%_100%]" />
            </motion.div>
        </div>
    )
}
