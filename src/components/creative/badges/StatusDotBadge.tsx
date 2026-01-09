'use client'

export function StatusDotBadge({ status = 'online' }: { status?: 'online' | 'offline' | 'busy' }) {
    const colors = {
        online: 'bg-green-500',
        offline: 'bg-slate-500',
        busy: 'bg-red-500'
    }

    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
            <span className={`relative flex h-2 w-2`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors[status]} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${colors[status]}`}></span>
            </span>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    )
}
