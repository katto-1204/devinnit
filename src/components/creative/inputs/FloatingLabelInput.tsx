'use client'

import React, { useState } from 'react'

export function FloatingLabelInput({ label = 'Email', placeholder = '' }: { label?: string, placeholder?: string }) {
    return (
        <div className="relative pt-4">
            <input
                type="text"
                placeholder={placeholder || ' '}
                className="peer w-full border-b-2 border-slate-300 bg-transparent py-2 px-0 text-foreground focus:border-orange focus:outline-none transition-colors"
                id="floating_input"
            />
            <label
                htmlFor="floating_input"
                className="absolute left-0 top-0 text-sm text-muted-foreground transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-orange"
            >
                {label}
            </label>
        </div>
    )
}
