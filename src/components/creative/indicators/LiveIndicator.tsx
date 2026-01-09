'use client'

export function LiveIndicator() {
    return (
        <div className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            LIVE
        </div>
    )
}
