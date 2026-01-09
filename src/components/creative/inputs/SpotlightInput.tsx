'use client'

import React, { useState, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

export function SpotlightInput({ placeholder = 'Spotlight Search...' }: { placeholder?: string }) {
    const radius = 100
    const [visible, setVisible] = useState(false)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <motion.div
            style={{
                background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="p-[2px] rounded-lg transition-all duration-300 group"
        >
            <input
                type="text"
                className="w-full px-4 py-2 rounded-[6px] bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-800 focus:outline-none focus:ring-0 focus:bg-slate-900 transition-colors"
                placeholder={placeholder}
            />
        </motion.div>
    )
}
