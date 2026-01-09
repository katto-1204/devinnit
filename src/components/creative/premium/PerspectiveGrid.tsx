'use client'

import React from 'react'

export function PerspectiveGrid() {
    return (
        <div className="relative w-full h-[300px] overflow-hidden bg-black perspective-[50vh]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

            <div
                className="absolute w-[200%] h-[200%] -left-[50%] -top-[50%] animate-grid-move"
                style={{
                    transform: 'rotateX(60deg)',
                    backgroundSize: '40px 40px',
                    backgroundImage: `
                        linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                }}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80px] z-20">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-blue-600 animate-pulse">
                    RETRO 3D
                </h2>
            </div>

            <style jsx>{`
                @keyframes grid-move {
                    0% { transform: rotateX(60deg) translateY(0); }
                    100% { transform: rotateX(60deg) translateY(40px); }
                }
                .animate-grid-move {
                    animation: grid-move 1s linear infinite;
                }
            `}</style>
        </div>
    )
}
