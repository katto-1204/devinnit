'use client'

export function GlassToast() {
    return (
        <div className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-3 text-white">
            <span className="text-xl">🍸</span>
            <div>
                <p className="font-bold text-sm">Glass Mode</p>
                <p className="text-xs opacity-80">Activated successfully</p>
            </div>
        </div>
    )
}
