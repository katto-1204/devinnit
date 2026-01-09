'use client'

export function GlassStackCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative group p-10">
            {/* Stacked Layers */}
            <div className="absolute inset-x-6 top-0 bottom-6 rounded-2xl bg-white/5 blur-sm transform scale-90 translate-y-4 group-hover:translate-y-2 group-hover:scale-95 transition-all duration-300" />
            <div className="absolute inset-x-4 top-2 bottom-4 rounded-2xl bg-white/10 backdrop-blur-sm transform scale-95 translate-y-2 group-hover:translate-y-1 group-hover:scale-[0.98] transition-all duration-300" />

            {/* Main Card */}
            <div className="relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 transition-all duration-300 group-hover:-translate-y-1">
                {children}
            </div>
        </div>
    )
}
