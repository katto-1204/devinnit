'use client'

import { motion } from 'framer-motion'

interface SkillBarProps {
    name: string
    level: number
    color?: string
}

export function SkillBar({ name, level, color = '#ff7b00' }: SkillBarProps) {
    return (
        <div className="w-full">
            <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-white/80">{name}</span>
                <span className="text-sm font-mono text-white/50">{level}%</span>
            </div>

            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full relative"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    {/* Animated Shine/Flow */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            </div>
        </div>
    )
}
