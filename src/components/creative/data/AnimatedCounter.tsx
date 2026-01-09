'use client'

import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

interface AnimatedCounterProps {
    value: number
    label?: string
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 })
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString())

    useEffect(() => {
        spring.set(value)
    }, [value, spring])

    return (
        <div className="flex flex-col items-center p-4 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm">
            <motion.h3
                className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange to-red-500"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
                {display}
            </motion.h3>
            {label && (
                <span className="text-sm text-muted-foreground uppercase tracking-widest mt-1">
                    {label}
                </span>
            )}
        </div>
    )
}
