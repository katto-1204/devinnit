'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function TimerToast({ duration = 5000 }: { duration?: number }) {
    const [progress, setProgress] = useState(100)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => Math.max(0, prev - 1))
        }, duration / 100)
        return () => clearInterval(timer)
    }, [duration])

    return (
        <div className="relative overflow-hidden rounded-lg border border-border bg-card p-4 shadow-md w-64">
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Auto Dismiss</span>
                <span className="text-xs text-muted-foreground">{Math.ceil((progress / 100) * (duration / 1000))}s</span>
            </div>
            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-orange"
                    initial={{ width: '100%' }}
                    animate={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}
