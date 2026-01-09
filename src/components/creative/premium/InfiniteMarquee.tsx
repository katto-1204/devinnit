'use client'

import React from 'react'

interface InfiniteMarqueeProps {
    items?: string[]
    speed?: number
    direction?: 'left' | 'right'
}

export function InfiniteMarquee({
    items = ['CREATIVE', 'INNOVATIVE', 'FUTURE', 'DESIGN', 'MOTION', '3D', 'NEXT.JS', 'REACT', 'TAILWIND'],
    speed = 20,
    direction = 'left',
}: InfiniteMarqueeProps) {
    return (
        <div className="relative w-full h-[200px] flex items-center justify-center overflow-hidden perspective-[1000px] bg-black">
            <div
                className="relative flex gap-8 whitespace-nowrap"
                style={{
                    transform: 'rotateX(20deg) rotateZ(-10deg) skewX(20deg)',
                    transformStyle: 'preserve-3d',
                }}
            >
                <div className="flex gap-8 animate-marquee">
                    {items.map((item, i) => (
                        <span
                            key={i}
                            className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 stroke-text"
                            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
                        >
                            {item}
                        </span>
                    ))}
                </div>
                {/* Duplicate for infinite loop */}
                <div className="flex gap-8 animate-marquee">
                    {items.map((item, i) => (
                        <span
                            key={`dup-${i}`}
                            className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 stroke-text"
                            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee ${speed}s linear infinite;
                }
            `}</style>
        </div>
    )
}
