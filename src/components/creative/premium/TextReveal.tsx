'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
    text: string
    className?: string
    delay?: number
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
    const words = text.split(' ')

    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {words.map((word, i) => (
                <div key={i} className="overflow-hidden">
                    <motion.span
                        initial={{ y: '100%' }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.1,
                            ease: [0.33, 1, 0.68, 1], // Cubic bezier for "cinematic" feel
                        }}
                        className="block"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </div>
    )
}
