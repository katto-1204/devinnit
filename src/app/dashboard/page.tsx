'use client'

import { motion } from 'framer-motion'
import {
    Code2,
    Layers,
    Play,
    FileText,
    Terminal,
    Zap,
    TrendingUp,
    Clock,
    Calendar,
    CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import { useSnippets, useNotes } from '@/lib/stores'

const quickActions = [
    { label: 'New Snippet', icon: Code2, href: '/dashboard/snippets', color: '#ff5e00' },
    { label: 'Components', icon: Layers, href: '/dashboard/components', color: '#ff8c47' },
    { label: 'Playground', icon: Play, href: '/dashboard/playground', color: '#ffb380' },
    { label: 'Notes', icon: FileText, href: '/dashboard/notes', color: '#ff5e00' },
    { label: 'Git Tools', icon: Terminal, href: '/dashboard/git-tools', color: '#ff8c47' },
]

const stats = [
    { label: 'Snippets', value: '0', icon: Code2, trend: '+0 this week' },
    { label: 'Components', value: '12', icon: Layers, trend: 'Available' },
    { label: 'Notes', value: '0', icon: FileText, trend: '+0 this week' },
    { label: 'Streak', value: '1', icon: Zap, trend: 'days' },
]

export default function DashboardPage() {
    const { snippets } = useSnippets()
    const { notes } = useNotes()

    const currentStats = [
        { label: 'Snippets', value: snippets.length.toString(), icon: Code2, trend: `${snippets.length} saved` },
        { label: 'Components', value: '12', icon: Layers, trend: 'Available' },
        { label: 'Notes', value: notes.length.toString(), icon: FileText, trend: `${notes.length} saved` },
        { label: 'Streak', value: '1', icon: Zap, trend: 'day' },
    ]

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1
                    className="text-4xl font-black mb-2"
                    style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                >
                    Welcome back! 👋
                </h1>
                <p className="text-muted-foreground">
                    Your developer cockpit is ready. What will you build today?
                </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
                {currentStats.map((stat, i) => {
                    const Icon = stat.icon
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 rounded-xl bg-card border border-border hover:border-orange/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-orange" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground/70">{stat.trend}</p>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <h2
                    className="text-xl font-bold mb-4"
                    style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                >
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {quickActions.map((action, i) => {
                        const Icon = action.icon
                        return (
                            <Link key={action.label} href={action.href}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.05 }}
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="p-4 rounded-xl bg-card border border-border hover:border-orange/40 transition-all cursor-pointer group"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center transition-all group-hover:glow-orange-sm"
                                        style={{ backgroundColor: `${action.color}15` }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: action.color }} />
                                    </div>
                                    <p className="font-semibold text-sm">{action.label}</p>
                                </motion.div>
                            </Link>
                        )
                    })}
                </div>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-xl bg-card border border-border"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2
                            className="text-lg font-bold"
                            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                        >
                            Recent Activity
                        </h2>
                        <Clock className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {snippets.length === 0 && notes.length === 0 ? (
                        <div className="py-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-muted-foreground/50" />
                            </div>
                            <p className="text-muted-foreground">No recent activity</p>
                            <p className="text-sm text-muted-foreground/60">Start by creating a snippet or note</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {snippets.slice(-3).reverse().map((snippet) => (
                                <div key={snippet.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                                    <Code2 className="w-4 h-4 text-orange" />
                                    <span className="text-sm">{snippet.title}</span>
                                </div>
                            ))}
                            {notes.slice(-3).reverse().map((note) => (
                                <div key={note.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                                    <FileText className="w-4 h-4 text-orange" />
                                    <span className="text-sm">{note.title}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* To-Do Widget */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-xl bg-card border border-border"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2
                            className="text-lg font-bold"
                            style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                        >
                            Quick Tasks
                        </h2>
                        <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="space-y-3">
                        {[
                            { text: 'Create your first snippet', done: snippets.length > 0 },
                            { text: 'Try the playground', done: false },
                            { text: 'Write a note', done: notes.length > 0 },
                            { text: 'Explore components', done: false },
                        ].map((task, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${task.done ? 'bg-green-500/10' : 'bg-secondary/30'
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.done
                                        ? 'bg-green-500 border-green-500'
                                        : 'border-muted-foreground/30'
                                    }`}>
                                    {task.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                                </div>
                                <span className={`text-sm ${task.done ? 'line-through text-muted-foreground' : ''}`}>
                                    {task.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Calendar Widget */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 p-6 rounded-xl bg-card border border-border"
            >
                <div className="flex items-center justify-between mb-4">
                    <h2
                        className="text-lg font-bold"
                        style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                    >
                        Today
                    </h2>
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-5xl font-black text-orange">
                        {new Date().getDate()}
                    </div>
                    <div>
                        <p className="font-semibold">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
