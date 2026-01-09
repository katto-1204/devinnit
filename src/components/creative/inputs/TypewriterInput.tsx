'use client'

import { useState, useEffect } from 'react'

export function TypewriterInput({ placeholders = ['Search products...', 'Find categories...', 'Look for inspiration...'] }) {
    const [currentPlaceholder, setCurrentPlaceholder] = useState('')
    const [index, setIndex] = useState(0)
    const [subIndex, setSubIndex] = useState(0)
    const [reverse, setReverse] = useState(false)

    useEffect(() => {
        if (subIndex === placeholders[index].length + 1 && !reverse) {
            setReverse(true)
            return
        }

        if (subIndex === 0 && reverse) {
            setReverse(false)
            setIndex((prev) => (prev + 1) % placeholders.length)
            return
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1))
            setCurrentPlaceholder(placeholders[index].substring(0, subIndex))
        }, reverse ? 50 : 100)

        return () => clearTimeout(timeout)
    }, [subIndex, index, reverse, placeholders])

    return (
        <div className="relative">
            <input
                type="text"
                className="w-full px-4 py-2 bg-secondary/30 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange/50"
                placeholder={currentPlaceholder}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-mono opacity-50">
                Typewriter
            </span>
        </div>
    )
}
