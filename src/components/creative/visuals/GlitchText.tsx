'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface GlitchTextProps {
    text: string
    className?: string
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
    return (
        <div className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-100 animate-pulse">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-100 animate-pulse delay-75">
                {text}
            </span>
            <motion.span
                className="absolute inset-0 bg-white mix-blend-overlay opacity-0 group-hover:opacity-20"
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
        </div>
    )
}
