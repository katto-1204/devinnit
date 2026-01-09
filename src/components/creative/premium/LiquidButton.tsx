'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
}

export function LiquidButton({ text = 'Click Me', className, ...props }: LiquidButtonProps) {
    return (
        <div className="relative group">
            <svg
                className="absolute hidden"
                width="0"
                height="0"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
            <button
                className={cn(
                    'relative z-10 px-8 py-3 bg-indigo-600 text-white font-bold rounded-full overflow-hidden transition-transform active:scale-95 hover:bg-indigo-500',
                    className
                )}
                style={{ filter: 'url(#gooey)' }}
                {...props}
            >
                <span className="relative z-20">{text}</span>
                <span className="absolute inset-0 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-50 transition-opacity blur-md" />

                {/* Blobs */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-8 h-8 bg-indigo-400 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                    animate={{
                        x: [0, 40, -40, 0],
                        y: [0, -20, 20, 0],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'mirror',
                    }}
                />
            </button>
        </div>
    )
}
