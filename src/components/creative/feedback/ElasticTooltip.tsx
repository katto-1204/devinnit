'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, ReactNode } from 'react'

interface ElasticTooltipProps {
    content: string
    children: ReactNode
}

export function ElasticTooltip({ content, children }: ElasticTooltipProps) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-background border border-border rounded-xl shadow-xl whitespace-nowrap z-50 pointer-events-none"
                    >
                        <span className="text-sm font-medium">{content}</span>
                        {/* Arrow */}
                        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-background border-r border-b border-border" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
