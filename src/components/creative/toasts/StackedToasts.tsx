'use client'

import { motion } from 'framer-motion'

export function StackedToasts() {
    return (
        <div className="relative w-full h-24 flex items-center justify-center">
            {[2, 1, 0].map((i) => (
                <motion.div
                    key={i}
                    className="absolute bg-card border border-border p-4 rounded-xl shadow-lg w-64"
                    style={{
                        y: i * 10,
                        scale: 1 - i * 0.05,
                        zIndex: 3 - i,
                        opacity: 1 - i * 0.2
                    }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-medium text-sm">Notification {i + 1}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
