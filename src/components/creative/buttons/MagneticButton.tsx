'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function MagneticButton({ children = 'Magnetic', className = '' }: { children?: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLButtonElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current!.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2

        x.set(clientX - centerX)
        y.set(clientY - centerY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY }}
            className={`relative px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg overflow-hidden group ${className}`}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
            <motion.div
                className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"
                layoutId="magnetic-hover"
            />
        </motion.button>
    )
}
