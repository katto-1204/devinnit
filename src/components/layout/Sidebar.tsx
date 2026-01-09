'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserPreferences } from '@/lib/stores'
import { useTheme } from '@/components/providers/ThemeProvider'
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Code2,
    Layers,
    FileText,
    Terminal,
    Play,
    Sun,
    Moon,
    Settings,
    Pin,
} from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'snippets', label: 'Snippets', icon: Code2, href: '/dashboard/snippets' },
    { id: 'components', label: 'Components', icon: Layers, href: '/dashboard/components' },
    { id: 'playground', label: 'Playground', icon: Play, href: '/dashboard/playground' },
    { id: 'notes', label: 'Notes', icon: FileText, href: '/dashboard/notes' },
    { id: 'git-tools', label: 'Git Tools', icon: Terminal, href: '/dashboard/git-tools' },
]

export function Sidebar() {
    const pathname = usePathname()
    const { sidebarCollapsed, toggleSidebar } = useUserPreferences()
    const { theme, setTheme } = useTheme()
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)

    return (
        <TooltipProvider delayDuration={0}>
            <motion.aside
                initial={false}
                animate={{ width: sidebarCollapsed ? 72 : 260 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-sidebar border-r border-sidebar-border"
            >
                {/* Logo */}
                <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-orange flex items-center justify-center flex-shrink-0">
                            <span className="text-xl font-black text-white">D</span>
                        </div>
                        <AnimatePresence>
                            {!sidebarCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-xl font-black tracking-tight"
                                    style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                                >
                                    <span className="text-foreground">EV</span>
                                    <span className="text-orange">INNIT</span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3 overflow-y-auto scrollbar-hide">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                            const Icon = item.icon

                            return (
                                <li key={item.id}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link href={item.href}>
                                                <motion.div
                                                    onHoverStart={() => setHoveredItem(item.id)}
                                                    onHoverEnd={() => setHoveredItem(null)}
                                                    className={`
                            relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors
                            ${isActive
                                                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                                                        }
                          `}
                                                >
                                                    {/* Active Indicator */}
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="activeIndicator"
                                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange rounded-r-full"
                                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                        />
                                                    )}

                                                    {/* Hover Glow */}
                                                    <AnimatePresence>
                                                        {hoveredItem === item.id && !isActive && (
                                                            <motion.div
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="absolute inset-0 bg-orange/5 rounded-xl"
                                                            />
                                                        )}
                                                    </AnimatePresence>

                                                    <Icon
                                                        className={`w-5 h-5 flex-shrink-0 relative z-10 ${isActive ? 'text-orange' : ''}`}
                                                    />

                                                    <AnimatePresence>
                                                        {!sidebarCollapsed && (
                                                            <motion.span
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: -10 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="relative z-10 font-medium"
                                                            >
                                                                {item.label}
                                                            </motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            </Link>
                                        </TooltipTrigger>
                                        {sidebarCollapsed && (
                                            <TooltipContent side="right" className="font-medium">
                                                {item.label}
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                </li>
                            )
                        })}
                    </ul>

                    {/* Pinned Section */}
                    {!sidebarCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-6 pt-4 border-t border-sidebar-border"
                        >
                            <div className="flex items-center gap-2 px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                <Pin className="w-3 h-3" />
                                Pinned
                            </div>
                            <p className="px-3 text-sm text-muted-foreground/60">
                                No pinned items yet
                            </p>
                        </motion.div>
                    )}
                </nav>

                {/* Bottom Actions */}
                <div className="p-3 border-t border-sidebar-border space-y-1">
                    {/* Theme Toggle */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <motion.button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-5 h-5 flex-shrink-0"
                                >
                                    {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                </motion.div>
                                <AnimatePresence>
                                    {!sidebarCollapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="font-medium"
                                        >
                                            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </TooltipTrigger>
                        {sidebarCollapsed && (
                            <TooltipContent side="right">Toggle Theme</TooltipContent>
                        )}
                    </Tooltip>

                    {/* Settings */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/dashboard/settings">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
                                >
                                    <Settings className="w-5 h-5 flex-shrink-0" />
                                    <AnimatePresence>
                                        {!sidebarCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="font-medium"
                                            >
                                                Settings
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>
                        </TooltipTrigger>
                        {sidebarCollapsed && (
                            <TooltipContent side="right">Settings</TooltipContent>
                        )}
                    </Tooltip>
                </div>

                {/* Collapse Button */}
                <motion.button
                    onClick={toggleSidebar}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:border-orange/50 transition-colors"
                >
                    <motion.div
                        initial={false}
                        animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </motion.div>
                </motion.button>
            </motion.aside>
        </TooltipProvider>
    )
}
