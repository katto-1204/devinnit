'use client'

import { ParticleBackground } from '@/components/landing/ParticleBackground'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesCarousel } from '@/components/landing/FeaturesCarousel'
import { InteractiveDemo } from '@/components/landing/InteractiveDemo'
import { motion } from 'framer-motion'
import { Github, Twitter, Heart } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              <span className="text-foreground">DEV</span>
              <span className="text-orange">INNIT</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </motion.button>
              </Link>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-orange text-white text-sm font-semibold rounded-lg hover:glow-orange-sm transition-all"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <HeroSection />

        {/* Features Carousel */}
        <FeaturesCarousel />

        {/* Interactive Demo */}
        <InteractiveDemo />

        {/* Footer */}
        <footer className="relative py-12 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Built with</span>
                <Heart className="w-4 h-4 text-orange fill-orange" />
                <span>by developers, for developers</span>
              </div>

              <div className="flex items-center gap-4">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-orange/50 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:border-orange/50 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </div>

              <p className="text-sm text-muted-foreground">
                © 2026 Devinnit. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
