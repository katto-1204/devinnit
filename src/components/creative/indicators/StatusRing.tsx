'use client'

export function StatusRing({ status = 'online' }: { status?: 'online' | 'offline' | 'busy' }) {
    const colors = {
        online: 'ring-green-500',
        offline: 'ring-slate-500',
        busy: 'ring-red-500'
    }
    return (
        <div className={`p-1 rounded-full ring-2 ${colors[status]} ring-offset-2 ring-offset-background`}>
            <div className={`w-3 h-3 rounded-full bg-current opacity-50`} />
        </div>
    )
}
