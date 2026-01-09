'use client'

import { motion } from 'framer-motion'

export function CubeCarousel() {
    return (
        <div className="perspective-1000 w-32 h-32 relative group">
            <motion.div
                className="w-full h-full transform-style-3d relative"
                animate={{ rotateY: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
                {['front', 'back', 'right', 'left'].map((face, i) => (
                    <div
                        key={face}
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 opacity-80 border border-white/20 flex items-center justify-center text-white font-bold uppercase"
                        style={{
                            transform: i === 0 ? 'translateZ(64px)' :
                                i === 1 ? 'rotateY(180deg) translateZ(64px)' :
                                    i === 2 ? 'rotateY(90deg) translateZ(64px)' :
                                        'rotateY(-90deg) translateZ(64px)'
                        }}
                    >
                        {face}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
