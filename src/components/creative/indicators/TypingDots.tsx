'use client'

import { motion } from 'framer-motion'

export function TypingDots() {
    return (
        <div className="flex items-center gap-1 p-2 rounded-full bg-secondary w-fit">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-foreground rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}
