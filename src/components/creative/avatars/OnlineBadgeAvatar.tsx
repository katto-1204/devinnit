'use client'

export function OnlineBadgeAvatar({ src, status = 'online' }: { src?: string, status?: 'online' | 'busy' | 'away' }) {
    const colors = {
        online: 'bg-green-500',
        busy: 'bg-red-500',
        away: 'bg-yellow-500'
    }
    return (
        <div className="relative inline-block">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                {src && <img src={src} alt="Avatar" className="w-full h-full object-cover" />}
            </div>
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${colors[status]}`} />
        </div>
    )
}
