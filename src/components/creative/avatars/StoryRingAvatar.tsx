'use client'

export function StoryRingAvatar({ src, size = 'md' }: { src?: string, size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-16 h-16' }
    return (
        <div className={`relative p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 ${sizeClasses[size]} cursor-pointer group`}>
            <div className="w-full h-full rounded-full border-2 border-background overflow-hidden relative">
                {src ? (
                    <img src={src} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
                )}
            </div>
        </div>
    )
}
