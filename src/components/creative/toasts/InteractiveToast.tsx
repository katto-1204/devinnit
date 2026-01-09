'use client'

export function InteractiveToast() {
    return (
        <div className="p-4 rounded-xl bg-card border border-border shadow-lg space-y-3 w-64">
            <p className="font-medium text-sm">Accept cookies?</p>
            <div className="flex gap-2">
                <button className="flex-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90">Accept</button>
                <button className="flex-1 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80">Decline</button>
            </div>
        </div>
    )
}
