'use client'

export function GradientBadge({ text = 'Premium', gradient = 'from-purple-500 to-pink-500' }: { text?: string, gradient?: string }) {
    return (
        <span className={`px-3 py-1 text-xs font-semibold text-white uppercase tracking-wider rounded-full bg-gradient-to-r ${gradient} shadow-lg shadow-purple-500/30`}>
            {text}
        </span>
    )
}
