'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function PatternRevealCard({ title = 'Hover Me', description = 'To reveal the pattern' }: { title?: string, description?: string }) {
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            className="relative w-full max-w-sm h-64 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 group"
        >
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Spotlight that reveals pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(250px circle at ${hoverPos.x}px ${hoverPos.y}px, rgba(255,255,255,0.1), transparent 80%)`
                }}
            />

            <div className="relative z-10 p-8 h-full flex flex-col justify-end pointer-events-none">
                <h3 className="text-2xl font-bold text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{title}</h3>
                <p className="text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 delay-75">{description}</p>
            </div>
        </div>
    )
}
