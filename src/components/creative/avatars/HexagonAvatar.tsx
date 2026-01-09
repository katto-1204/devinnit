'use client'

export function HexagonAvatar({ src }: { src?: string }) {
    return (
        <div
            className="w-12 h-12 bg-slate-300 relative overflow-hidden group hover:scale-110 transition-transform"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
            {src && <img src={src} alt="Hex Avatar" className="w-full h-full object-cover" />}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        </div>
    )
}
