'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

export function HolographicCard() {
    const ref = useRef<HTMLDivElement>(null)
    const [hover, setHover] = useState(false)

    // Mouse position
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 300, damping: 30 })
    const mouseY = useSpring(y, { stiffness: 300, damping: 30 })

    function handleMouseMove({ clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return
        const { left, top, width, height } = ref.current.getBoundingClientRect()
        const centerX = width / 2
        const centerY = height / 2

        const offsetX = clientX - left - centerX
        const offsetY = clientY - top - centerY

        x.set(offsetX)
        y.set(offsetY)
    }

    function handleMouseLeave() {
        setHover(false)
        x.set(0)
        y.set(0)
    }

    const rotateX = useTransform(mouseY, [-150, 150], [15, -15])
    const rotateY = useTransform(mouseX, [-150, 150], [-15, 15])

    // Holographic gradient movement
    const holoBg = useTransform(mouseX, [-150, 150], ['0% 50%', '100% 50%'])

    return (
        <div style={{ perspective: 1000 }} className="group">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d'
                }}
                className="relative w-64 h-96 rounded-xl bg-slate-900 shadow-xl transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-500/50"
            >
                {/* Content */}
                <div className="absolute inset-1 bg-black rounded-lg z-10 p-6 flex flex-col justify-between overflow-hidden">
                    <div className="w-full h-32 bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-4xl">💎</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Holographic</h3>
                        <p className="text-slate-400 text-sm">Rare Item</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-slate-500">#0042</span>
                        <span className="text-xs font-bold text-cyan-400">LEGENDARY</span>
                    </div>
                </div>

                {/* Holographic Overlay */}
                <motion.div
                    className="absolute inset-0 rounded-xl z-20 opacity-0 group-hover:opacity-40 pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
                    style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255, 219, 112, 0.8) 45%, rgba(132, 50, 255, 0.6) 50%, transparent 54%)',
                        backgroundSize: '200% 200%',
                        backgroundPosition: holoBg
                    }}
                />

                {/* Border Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-100 transition duration-500 -z-10" />
            </motion.div>
        </div>
    )
}
