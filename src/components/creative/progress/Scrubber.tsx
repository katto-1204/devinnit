'use client'

import { useState } from 'react'

export function Scrubber({ initial = 50 }: { initial?: number }) {
    const [value, setValue] = useState(initial)
    return (
        <div className="relative w-full h-6 flex items-center group cursor-pointer">
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange" style={{ width: `${value}%` }} />
            </div>
            <div
                className="absolute w-4 h-4 bg-white border-2 border-orange rounded-full shadow-md transition-transform group-hover:scale-125"
                style={{ left: `calc(${value}% - 8px)` }}
            />
        </div>
    )
}
