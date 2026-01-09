'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
    title: string
    value: string
    change?: number
    icon?: ReactNode
}

export function StatCard({ title, value, change, icon }: StatCardProps) {
    return (
        <motion.div
            className="relative overflow-hidden bg-card border border-border p-6 rounded-2xl group cursor-default"
            whileHover={{ y: -5 }}
        >
            {/* Background Gradient Reveal */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-black">{value}</h3>

                    {change !== undefined && (
                        <div className={`flex items-center gap-1 mt-2 text-sm font-bold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            <span>{change > 0 ? '+' : ''}{change}%</span>
                        </div>
                    )}
                </div>

                {icon && (
                    <div className="p-3 bg-secondary/50 rounded-xl text-foreground group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                        {icon}
                    </div>
                )}
            </div>

            {/* Corner Decorative */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent -mr-8 -mt-8 rounded-full blur-xl" />
        </motion.div>
    )
}
