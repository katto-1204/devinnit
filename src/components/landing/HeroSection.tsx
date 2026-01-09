'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange/15 rounded-full blur-[120px] animate-pulse delay-1000" />

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange/20 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-orange" />
                    <span className="text-sm font-medium text-orange">Next-Level Developer Productivity</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black tracking-tight mb-6"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    <span className="text-foreground">DEV</span>
                    <span className="text-orange text-glow-orange">INNIT</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Your Interactive Developer Cockpit
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-lg text-muted-foreground/80 max-w-xl mx-auto mb-12"
                >
                    Build, Learn, Explore — all in one powerful suite with live playgrounds,
                    snippet management, and real-time collaboration.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative px-8 py-4 bg-orange text-white font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:glow-orange"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Using Devinnit
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-orange-light to-orange"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 glass border border-orange/30 text-foreground font-semibold text-lg rounded-xl hover:border-orange/60 transition-all duration-300"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                        Explore Features
                    </motion.button>
                </motion.div>

                {/* Feature Pills */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-3 mt-16"
                >
                    {['Snippets', 'Components', 'Playground', 'Git Tools', 'Notes'].map((feature, i) => (
                        <motion.span
                            key={feature}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                            className="px-4 py-2 text-sm font-medium bg-secondary/50 text-muted-foreground rounded-full border border-border hover:border-orange/40 hover:text-orange transition-all duration-300 cursor-default"
                        >
                            {feature}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
