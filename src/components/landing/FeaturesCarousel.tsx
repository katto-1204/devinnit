'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Code2, Layers, Terminal, FileText, Zap } from 'lucide-react'

const features = [
    {
        icon: Code2,
        title: 'Snippet Manager',
        description: 'Store, organize, and instantly access your code snippets with syntax highlighting and version history.',
        color: '#ff5e00',
    },
    {
        icon: Layers,
        title: 'Component Gallery',
        description: 'Browse, preview, and drag React components directly into your playground or dashboard.',
        color: '#ff8c47',
    },
    {
        icon: Terminal,
        title: 'Live Playground',
        description: 'Write React code and see instant results. Hot-reload preview without losing state.',
        color: '#ffb380',
    },
    {
        icon: FileText,
        title: 'Markdown Notes',
        description: 'Split-view editor with live preview, tagging, and export to PDF/HTML.',
        color: '#ff5e00',
    },
    {
        icon: Zap,
        title: 'Dev Dashboard',
        description: 'Customizable widgets, streak tracking, confetti achievements, and quick commands.',
        color: '#ff8c47',
    },
]

export function FeaturesCarousel() {
    const [current, setCurrent] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    useEffect(() => {
        if (!isAutoPlaying) return
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % features.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [isAutoPlaying])

    const next = () => {
        setIsAutoPlaying(false)
        setCurrent((prev) => (prev + 1) % features.length)
    }

    const prev = () => {
        setIsAutoPlaying(false)
        setCurrent((prev) => (prev - 1 + features.length) % features.length)
    }

    return (
        <section className="relative py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-center mb-4"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Powerful <span className="text-orange">Features</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
                >
                    Everything you need to boost your development workflow
                </motion.p>

                <div className="relative">
                    {/* Carousel Container */}
                    <div className="relative h-[280px] overflow-hidden rounded-2xl glass border border-border">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center"
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ backgroundColor: `${features[current].color}20` }}
                                >
                                    {(() => {
                                        const Icon = features[current].icon
                                        return <Icon className="w-8 h-8" style={{ color: features[current].color }} />
                                    })()}
                                </div>
                                <h3
                                    className="text-2xl font-bold mb-3"
                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                    {features[current].title}
                                </h3>
                                <p className="text-muted-foreground max-w-md">
                                    {features[current].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:border-orange/50 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:border-orange/50 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {features.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setIsAutoPlaying(false)
                                    setCurrent(i)
                                }}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-orange' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
