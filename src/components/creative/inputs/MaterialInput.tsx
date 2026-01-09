'use client'

export function MaterialInput({ label = 'Username' }: { label?: string }) {
    return (
        <div className="group relative">
            <input
                type="text"
                required
                className="peer w-full bg-transparent px-2 py-3 outline-none text-foreground"
            />
            <label className="absolute left-2 top-3 origin-[0] -translate-y-6 scale-75 transform text-sm text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-orange">
                {label}
            </label>
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-border" />
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-orange transition-all duration-300 peer-focus:w-full" />
        </div>
    )
}
