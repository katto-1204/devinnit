'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import { X } from 'lucide-react'

interface GlassModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
}

export function GlassModal({ isOpen, onClose, title, children }: GlassModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
                    >
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl">
                            {/* Glass Reflection */}
                            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                            {/* Header */}
                            <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10">
                                <h3 className="text-xl font-bold text-white tracking-wide">{title || 'Modal'}</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-6 text-white/80">
                                {children}
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
