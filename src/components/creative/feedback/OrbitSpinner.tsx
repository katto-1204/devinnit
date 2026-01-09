'use client'

import { motion } from 'framer-motion'

export function OrbitSpinner() {
    return (
        <div className="relative w-20 h-20 flex items-center justify-center perspective-[500px]">
            {/* Core */}
            <motion.div
                className="w-4 h-4 bg-orange rounded-full shadow-[0_0_20px_#ff7b00]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Ring 1 */}
            <motion.div
                className="absolute inset-0 border-2 border-cyan-500/50 rounded-full"
                style={{ rotateX: 60, rotateY: 30 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                <div className="h-2 w-2 bg-cyan-500 rounded-full absolute -top-1 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#06b6d4]" />
            </motion.div>

            {/* Ring 2 */}
            <motion.div
                className="absolute inset-0 border-2 border-purple-500/50 rounded-full"
                style={{ rotateX: 60, rotateY: -30 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
                <div className="h-2 w-2 bg-purple-500 rounded-full absolute -top-1 left-1/2 -translate-x-1/2 shadow-[0_0_10px_#a855f7]" />
            </motion.div>

            {/* Ring 3 */}
            <motion.div
                className="absolute inset-2 border border-white/20 rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </div>
    )
}
