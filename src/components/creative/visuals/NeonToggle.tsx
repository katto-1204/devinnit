'use client'

import { motion } from 'framer-motion'

interface NeonToggleProps {
    isOn: boolean
    onToggle: () => void
}

export function NeonToggle({ isOn, onToggle }: NeonToggleProps) {
    return (
        <div
            onClick={onToggle}
            className={`cursor-pointer w-20 h-10 rounded-full p-1 transition-all duration-300 ${isOn ? 'bg-[#1a1a1a] shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-[#1a1a1a]'
                }`}
        >
            <div className="relative w-full h-full">
                {/* Track Glow */}
                <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isOn ? 'opacity-100' : 'opacity-0'
                    } bg-green-500/10`} />

                {/* Knob */}
                <motion.div
                    className={`h-8 w-8 rounded-full shadow-md flex items-center justify-center relative z-10`}
                    initial={false}
                    animate={{
                        x: isOn ? 40 : 0,
                        backgroundColor: isOn ? '#22c55e' : '#525252'
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                    {/* Knob Icon/Detail */}
                    <div className={`w-2 h-2 rounded-full ${isOn ? 'bg-white' : 'bg-gray-400'}`} />

                    {/* Trail Effect on Move */}
                    {isOn && (
                        <motion.div
                            layoutId="glow"
                            className="absolute inset-0 rounded-full bg-green-400 blur-md opacity-50"
                        />
                    )}
                </motion.div>
            </div>
        </div>
    )
}
