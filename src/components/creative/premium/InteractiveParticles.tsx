'use client'

export function InteractiveParticles() {
    return (
        <div className="relative w-full h-40 bg-black overflow-hidden rounded-xl flex items-center justify-center group">
            <span className="relative z-10 text-white font-bold mix-blend-difference">Hover Me</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                {/* CSS Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 2 + 1}s`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
