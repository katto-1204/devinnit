'use client'

export function GlitchBadge({ text = 'SYSTEM_ERR' }: { text?: string }) {
    return (
        <div className="relative inline-block group">
            <span className="absolute inset-0 bg-red-600 translate-x-[2px] opacity-0 group-hover:opacity-100 transition-opacity mix-blend-screen" aria-hidden="true">{text}</span>
            <span className="absolute inset-0 bg-blue-600 -translate-x-[2px] opacity-0 group-hover:opacity-100 transition-opacity mix-blend-screen" aria-hidden="true">{text}</span>
            <span className="relative px-2 py-0.5 bg-black border border-white/20 text-white font-mono text-xs uppercase tracking-tight">
                {text}
            </span>
        </div>
    )
}
