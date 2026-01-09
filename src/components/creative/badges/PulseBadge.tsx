'use client'

export function PulseBadge({ children = 'Live', color = 'bg-red-500' }: { children?: React.ReactNode, color?: string }) {
    return (
        <span className="relative inline-flex h-6 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl z-10 gap-2">
                <span className={`relative flex h-2 w-2 mr-1`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`}></span>
                </span>
                {children}
            </span>
        </span>
    )
}
