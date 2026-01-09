'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import { cn } from '@/lib/utils'

interface TiltCardProps {
    children: React.ReactNode
    className?: string
}

export function TiltCard({ children, className }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ['17.5deg', '-17.5deg'])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-17.5deg', '17.5deg'])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseXFromCenter = e.clientX - rect.left - width / 2
        const mouseYFromCenter = e.clientY - rect.top - height / 2

        const xPct = mouseXFromCenter / width
        const yPct = mouseYFromCenter / height

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            className={cn(
                'relative w-full rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-8 border border-white/10 shadow-xl backdrop-blur-sm transition-colors hover:border-white/20',
                className
            )}
        >
            <div
                style={{
                    transform: 'translateZ(75px)',
                    transformStyle: 'preserve-3d',
                }}
            >
                {children}
            </div>
        </motion.div>
    )
}
