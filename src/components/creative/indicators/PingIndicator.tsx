'use client'

export function PingIndicator({ color = 'bg-green-500' }: { color?: string }) {
    return (
        <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${color}`}></span>
        </span>
    )
}
