'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function ParallaxCard({ children }: { children?: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 100, damping: 20 })
    const mouseY = useSpring(y, { stiffness: 100, damping: 20 })

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
        x.set(0)
        y.set(0)
    }

    // Rotations based on mouse position
    const rotateX = useTransform(mouseY, [-150, 150], [15, -15]) // Inverted Y for natural tilt
    const rotateY = useTransform(mouseX, [-150, 150], [-15, 15])

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
            className="relative w-80 h-96 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 p-8 shadow-2xl cursor-pointer group"
        >
            {/* Floating 3D Elements */}
            <motion.div
                style={{ z: 50, transform: 'translateZ(50px)' }}
                className="absolute top-8 left-8 text-white font-bold text-3xl z-20 pointer-events-none"
            >
                Parallax
            </motion.div>

            <motion.div
                style={{ z: 30, transform: 'translateZ(30px)' }}
                className="absolute bottom-8 left-8 text-white/80 z-20 max-w-[200px] pointer-events-none"
            >
                {children || "Hover over this card to see the 3D depth effect."}
            </motion.div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_2px,transparent_2px)] bg-[length:24px_24px] rounded-3xl pointer-events-none" />

            {/* Glare/Sheen Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-3xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    backgroundPosition: useTransform(mouseX, [-150, 150], ['0% 0%', '100% 100%'])
                }}
            />
        </motion.div>
    )
}
