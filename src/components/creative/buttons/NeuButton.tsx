'use client'

import { motion } from 'framer-motion'

export function NeuButton({ children = 'Soft UI' }: { children?: React.ReactNode }) {
    return (
        <motion.button
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#e0e5ec] text-slate-600 font-bold rounded-2xl shadow-[9px_9px_16px_rgb(163,177,198,-0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] active:shadow-[inset_6px_6px_10px_0_rgba(163,177,198,0.7),inset_-6px_-6px_10px_0_rgba(255,255,255,0.8)] transition-shadow"
            style={{
                background: 'linear-gradient(145deg, #ffffff, #e6e6e6)' // Subtle lighting adjustment
            }}
        >
            {children}
        </motion.button>
    )
}
