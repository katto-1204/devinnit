'use client'

export function WaveIndicator({ color = 'border-blue-500' }: { color?: string }) {
    return (
        <div className="relative flex items-center justify-center w-8 h-8">
            <div className={`absolute w-full h-full rounded-full border-2 ${color} opacity-0 animate-ping`} style={{ animationDuration: '2s' }} />
            <div className={`absolute w-full h-full rounded-full border-2 ${color} opacity-0 animate-ping`} style={{ animationDuration: '2s', animationDelay: '0.6s' }} />
            <div className={`w-2 h-2 rounded-full bg-current`} />
        </div>
    )
}
