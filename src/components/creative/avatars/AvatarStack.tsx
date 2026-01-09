'use client'

export function AvatarStack({ images = [], limit = 4 }: { images?: string[], limit?: number }) {
    const displayImages = images.slice(0, limit)
    const remaining = Math.max(0, images.length - limit)

    return (
        <div className="flex -space-x-4">
            {displayImages.map((src, i) => (
                <div key={i} className="relative w-10 h-10 rounded-full border-2 border-background overflow-hidden hover:-translate-y-1 transition-transform z-0 hover:z-10">
                    <img src={src} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                </div>
            ))}
            {remaining > 0 && (
                <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium hover:-translate-y-1 transition-transform relative z-0 hover:z-10">
                    +{remaining}
                </div>
            )}
            {/* Fallback demo if no images provided */}
            {images.length === 0 && [1, 2, 3].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-indigo-400 to-purple-400`} />
            ))}
        </div>
    )
}
