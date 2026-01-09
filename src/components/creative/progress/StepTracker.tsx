'use client'

export function StepTracker({ steps = ['Info', 'Details', 'Confirm'], current = 1 }: { steps?: string[], current?: number }) {
    return (
        <div className="flex items-center w-full">
            {steps.map((step, i) => (
                <div key={i} className="flex-1 flex items-center relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 
                        ${i <= current ? 'bg-orange text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                        <div className={`absolute left-4 w-full h-1 
                            ${i < current ? 'bg-orange' : 'bg-slate-200'}`} />
                    )}
                </div>
            ))}
        </div>
    )
}
