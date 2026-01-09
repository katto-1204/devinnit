'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Trash2, Archive, Mail } from 'lucide-react'

interface SwipeableItemProps {
    title: string
    subtitle: string
}

export function SwipeableItem({ title, subtitle }: SwipeableItemProps) {
    const x = useMotionValue(0)
    const opacity = useTransform(x, [-100, -50, 0, 50, 100], [1, 0.5, 0, 0.5, 1])
    const bg = useTransform(x, [-100, 0, 100], ['#ef4444', '#171717', '#3b82f6'])

    return (
        <div className="relative w-full h-[80px] bg-card overflow-hidden">
            {/* Background Actions */}
            <motion.div className="absolute inset-0 flex items-center justify-between px-6" style={{ backgroundColor: bg }}>
                <Trash2 className="text-white" />
                <Archive className="text-white" />
            </motion.div>

            {/* Foreground Item */}
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                style={{ x }}
                className="absolute inset-0 bg-card border-b border-border flex items-center px-4 cursor-grab active:cursor-grabbing"
            >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-4">
                    <Mail size={18} />
                </div>
                <div>
                    <h4 className="font-semibold text-foreground">{title}</h4>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>
            </motion.div>
        </div>
    )
}
