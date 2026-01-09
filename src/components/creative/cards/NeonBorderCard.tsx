'use client'

export function NeonBorderCard({ children, color = '#ec4899' }: { children: React.ReactNode, color?: string }) {
    return (
        <div className="relative group rounded-xl p-[2px] overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 animate-border-rotate"
                style={{ color, backgroundSize: '200% 200%' }}
            />
            {/* Simple static border that glows on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"
                style={{ background: `conic-gradient(from 0deg, transparent, ${color}, transparent)` }}
            />

            <div className="relative h-full bg-card rounded-[10px] p-6 border border-border group-hover:border-transparent transition-colors z-10">
                {children}
            </div>
        </div>
    )
}
