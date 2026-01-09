'use client'

import { motion } from 'framer-motion'

export function GradientBorderButton({ text = 'Gradient Border', onClick }: { text?: string, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="relative p-[2px] rounded-xl group overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient bg-300% group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-50 group-hover:opacity-100 transition-opacity animate-gradient bg-300%" />
            <div className="relative px-6 py-3 bg-black rounded-[10px] items-center justify-center flex">
                <span className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-200 group-hover:to-pink-200 transition-all">
                    {text}
                </span>
            </div>
        </button>
    )
}
