'use client'

import { useUserPreferences } from '@/lib/stores'
import { Sidebar } from '@/components/layout/Sidebar'
import { motion } from 'framer-motion'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const { sidebarCollapsed } = useUserPreferences()

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <motion.main
                initial={false}
                animate={{
                    marginLeft: sidebarCollapsed ? 72 : 260,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="min-h-screen"
            >
                {children}
            </motion.main>
        </div>
    )
}
