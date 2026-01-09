'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const items = [
    { id: 1, color: '#ff7b00', title: 'Item 1' },
    { id: 2, color: '#eab308', title: 'Item 2' },
    { id: 3, color: '#ec4899', title: 'Item 3' },
    { id: 4, color: '#8b5cf6', title: 'Item 4' },
    { id: 5, color: '#06b6d4', title: 'Item 5' },
]

export function Carousel3D() {
    const [rotation, setRotation] = useState(0)
    const theta = 360 / items.length

    const rotate = (dir: 'left' | 'right') => {
        setRotation((prev) => prev + (dir === 'left' ? theta : -theta))
    }

    return (
        <div className="relative h-[300px] w-full flex items-center justify-center perspective-[1000px] overflow-hidden">
            <div
                className="relative w-[150px] h-[200px] preserve-3d transition-transform duration-700 ease-out"
                style={{
                    transform: `rotateY(${rotation}deg)`,
                    transformStyle: 'preserve-3d',
                }}
            >
                {items.map((item, i) => (
                    <div
                        key={item.id}
                        className="absolute inset-0 flex items-center justify-center rounded-xl text-white font-bold text-2xl shadow-xl border border-white/20"
                        style={{
                            background: `linear-gradient(135deg, ${item.color}, #000)`,
                            transform: `rotateY(${i * theta}deg) translateZ(250px)`,
                            backfaceVisibility: 'visible', // Show backface for full 3D feel? Or hidden.
                        }}
                    >
                        {item.title}
                    </div>
                ))}
            </div>

            <div className="absolute bottom-4 flex gap-4">
                <button
                    onClick={() => rotate('left')}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                    onClick={() => rotate('right')}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    )
}
