'use client'

import { useState } from 'react'

export function DistortionImage({ src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853' }: { src?: string }) {
    const [hover, setHover] = useState(false)
    return (
        <div
            className="relative w-64 h-40 overflow-hidden rounded-xl cursor-crosshair"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform"
                style={{
                    backgroundImage: `url(${src})`,
                    transform: hover ? 'scale(1.2)' : 'scale(1)',
                    filter: hover ? 'hue-rotate(90deg) contrast(1.2)' : 'none'
                }}
            />
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-mono text-xl tracking-widest font-bold mix-blend-overlay">GLITCH</span>
            </div>
        </div>
    )
}
