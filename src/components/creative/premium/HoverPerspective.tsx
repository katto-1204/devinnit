'use client'

import { motion, useSpring, useMotionValue } from 'framer-motion'

export function HoverPerspective({ src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', title = 'NIKE' }: { src?: string, title?: string }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 })
    const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 })

    function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect()
        const xPos = e.clientX - rect.left - rect.width / 2
        const yPos = e.clientY - rect.top - rect.height / 2
        rotateX.set(-yPos / 10)
        rotateY.set(xPos / 10)
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={onMouseMove}
            onMouseLeave={() => { rotateX.set(0); rotateY.set(0) }}
            className="w-64 h-80 bg-slate-900 rounded-xl overflow-hidden relative"
        >
            <div className="absolute inset-4 border border-white/20 z-20" />
            <img src={src} alt="Shoe" className="w-full h-full object-cover opacity-80" />
            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-black text-white italic z-10 mix-blend-overlay">{title}</h1>
        </motion.div>
    )
}
