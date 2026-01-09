'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useUserPreferences } from '@/lib/stores'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
}

type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme)
    const [mounted, setMounted] = useState(false)
    const { theme: storedTheme, setTheme: setStoredTheme } = useUserPreferences()

    useEffect(() => {
        setMounted(true)
        setTheme(storedTheme || defaultTheme)
    }, [storedTheme, defaultTheme])

    useEffect(() => {
        if (!mounted) return

        const root = window.document.documentElement
        root.classList.remove('light', 'dark')

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            root.classList.add(systemTheme)
        } else {
            root.classList.add(theme)
        }
    }, [theme, mounted])

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            setTheme(newTheme)
            if (newTheme !== 'system') {
                setStoredTheme(newTheme)
            }
        },
    }

    if (!mounted) {
        return null
    }

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
