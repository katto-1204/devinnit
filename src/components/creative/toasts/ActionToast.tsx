'use client'

export function ActionToast() {
    return (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-900 text-white shadow-lg w-fit">
            <span>Item deleted</span>
            <button className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase transition-colors text-orange">
                Undo
            </button>
        </div>
    )
}
