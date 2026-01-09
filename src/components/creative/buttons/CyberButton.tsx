'use client'

import { motion } from 'framer-motion'

export function CyberButton({ text = 'CYBER_PUNK', onClick }: { text?: string, onClick?: () => void }) {
    return (
        <motion.button
            whileHover="hover"
            onClick={onClick}
            className="relative px-8 py-3 bg-transparent border border-cyan-500 text-cyan-500 font-mono tracking-widest uppercase text-sm group overflow-hidden"
        >
            <div className="absolute inset-0 bg-cyan-950/20" />

            {/* Glitch layers */}
            <motion.div
                className="absolute inset-0 bg-cyan-500/20 translate-x-[-100%]"
                variants={{ hover: { translateX: '100%' } }}
                transition={{ duration: 0.3, ease: 'linear' }}
            />

            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500" />

            {/* Text with glitch effect on hover */}
            <span className="relative z-10 flex items-center gap-2">
                <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
                {text}
            </span>

            {/* Scanline */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
        </motion.button>
    )
}
