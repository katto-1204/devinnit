'use client'

import { motion } from 'framer-motion'

interface CircularProgressProps {
    progress: number
    size?: number
    strokeWidth?: number
    color?: string
}

export function CircularProgress({
    progress,
    size = 120,
    strokeWidth = 8,
    color = '#ff7b00'
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-white/10"
                />

                {/* Progress Circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
            </svg>

            {/* Percentage Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">{progress}%</span>
            </div>

            {/* Glow Effect */}
            <div
                className="absolute inset-0 rounded-full blur-xl opacity-20 pointer-events-none"
                style={{ background: color }}
            />
        </div>
    )
}
