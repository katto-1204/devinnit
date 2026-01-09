'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const data = [10, 25, 18, 40, 30, 60, 45, 80, 55, 90, 70, 100]

export function ActivityGraph() {
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

    const width = 300
    const height = 100
    const padding = 10

    // Calculate path
    const points = data.map((value, i) => {
        const x = (i / (data.length - 1)) * (width - padding * 2) + padding
        const y = height - (value / 100) * (height - padding * 2) - padding
        return `${x},${y}`
    }).join(' L ')

    return (
        <div className="relative p-4 bg-black/40 rounded-xl border border-white/10 backdrop-blur-sm">
            <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                {/* Area Fill */}
                <motion.path
                    d={`M ${padding},${height} L ${points.replace(/L/g, 'L')} L ${width - padding},${height} Z`}
                    fill="url(#gradient)"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.2, pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                />

                {/* Line */}
                <motion.path
                    d={`M ${points.replace(/L/g, 'L')}`}
                    fill="none"
                    stroke="#ff7b00"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Interactive Points */}
                {data.map((value, i) => {
                    const x = (i / (data.length - 1)) * (width - padding * 2) + padding
                    const y = height - (value / 100) * (height - padding * 2) - padding

                    return (
                        <motion.circle
                            key={i}
                            cx={x}
                            cy={y}
                            r={4}
                            className="fill-white stroke-orange cursor-pointer"
                            strokeWidth={2}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.5 + i * 0.05 }}
                            whileHover={{ scale: 2 }}
                            onHoverStart={() => setHoveredPoint(i)}
                            onHoverEnd={() => setHoveredPoint(null)}
                        />
                    )
                })}

                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff7b00" />
                        <stop offset="100%" stopColor="#ff7b00" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Tooltip */}
            {hoveredPoint !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-0 right-4 bg-orange text-white text-xs font-bold px-2 py-1 rounded"
                >
                    Value: {data[hoveredPoint]}
                </motion.div>
            )}
        </div>
    )
}
