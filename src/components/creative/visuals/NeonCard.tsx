'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface NeonCardProps {
    children: ReactNode
    className?: string
    color?: string
}

export function NeonCard({ children, className = '', color = '#ff7b00' }: NeonCardProps) {
    return (
        <div className="relative group">
            {/* Glow Effect */}
            <div
                className="absolute -inset-0.5 rounded-2xl opacity-75 blur-lg transition duration-1000 group-hover:duration-200 group-hover:opacity-100"
                style={{
                    backgroundImage: `linear-gradient(to right, ${color}40, ${color}, ${color}40)`
                }}
            />

            {/* Main Card */}
            <div className={`relative h-full bg-black/90 rounded-2xl p-6 ring-1 ring-white/10 backdrop-blur-xl ${className}`}>
                <div className="relative z-10">
                    {children}
                </div>

                {/* Shine Effect */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `linear-gradient(45deg, transparent 40%, white 50%, transparent 60%)`
                    }}
                />
            </div>
        </div>
    )
}
