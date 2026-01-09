'use client'

export function SegmentedProgress({ total = 5, current = 3 }: { total?: number, current?: number }) {
    return (
        <div className="flex gap-1 w-full max-w-xs">
            {Array.from({ length: total }).map((_, i) => (
                <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-colors duration-300 ${i < current ? 'bg-orange' : 'bg-slate-200'}`}
                />
            ))}
        </div>
    )
}
