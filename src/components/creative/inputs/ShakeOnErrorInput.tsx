'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function ShakeOnErrorInput({ placeholder = 'Type "error" to shake' }: { placeholder?: string }) {
    const [value, setValue] = useState('')
    const [isShaking, setIsShaking] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setValue(val)
        if (val.toLowerCase().includes('error')) {
            setIsShaking(true)
            setTimeout(() => setIsShaking(false), 500)
        }
    }

    return (
        <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
        >
            <input
                type="text"
                value={value}
                onChange={handleChange}
                className={`w-full px-4 py-2 border-2 rounded-lg outline-none transition-colors ${isShaking ? 'border-red-500 text-red-500' : 'border-slate-200 focus:border-blue-500'
                    }`}
                placeholder={placeholder}
            />
        </motion.div>
    )
}
