'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Check, Copy, Code2 } from 'lucide-react'
import { toast } from 'sonner'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import { useEffect } from 'react'

const snippets = [
    {
        id: 'use-mouse-position',
        title: 'useMousePosition Hook',
        description: 'Track mouse coordinates for interactive effects',
        language: 'typescript',
        code: `import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
}`
    },
    {
        id: 'glass-effect',
        title: 'Glassmorphism Utility',
        description: 'Tailwind utility class for glass effect',
        language: 'css',
        code: `@layer utilities {
  .glass {
    @apply bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl;
  }
  
  .glass-dark {
    @apply bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl;
  }
}`
    },
    {
        id: 'gradient-text',
        title: 'Gradient Text',
        description: 'Animated gradient text component',
        language: 'tsx',
        code: `export const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient bg-300%">
    {children}
  </span>
);`
    },
    {
        id: 'smooth-reveal',
        title: 'Smooth Reveal',
        description: 'Framer Motion variant for scrolling reveal',
        language: 'typescript',
        code: `export const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Usage:
// <motion.div
//   initial="hidden"
//   whileInView="visible"
//   viewport={{ once: true }}
//   variants={revealVariants}
// >`
    }
]

export default function SnippetsPage() {
    const [copiedId, setCopiedId] = useState<string | null>(null)

    useEffect(() => {
        Prism.highlightAll()
    }, [])

    const copyToClipboard = async (text: string, id: string) => {
        await navigator.clipboard.writeText(text)
        setCopiedId(id)
        toast.success('Snippet copied!')
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className="p-6 lg:p-8 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-4xl font-black mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
                    Creative Snippets
                </h1>
                <p className="text-muted-foreground">
                    Copy-paste ready utilities for your next project
                </p>
            </motion.div>

            <div className="grid gap-6">
                {snippets.map((snippet, i) => (
                    <motion.div
                        key={snippet.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl border border-border bg-card overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                            <div>
                                <h3 className="font-bold text-lg">{snippet.title}</h3>
                                <p className="text-sm text-muted-foreground">{snippet.description}</p>
                            </div>
                            <button
                                onClick={() => copyToClipboard(snippet.code, snippet.id)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background border border-border hover:border-orange/50 transition-colors text-sm font-medium"
                            >
                                {copiedId === snippet.id ? (
                                    <>
                                        <Check size={14} className="text-green-500" />
                                        <span>Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={14} />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="relative">
                            <pre className="p-6 overflow-x-auto bg-[#0d0d0d] m-0">
                                <code className={`language-${snippet.language} text-sm`}>
                                    {snippet.code}
                                </code>
                            </pre>
                            <div className="absolute top-4 right-4 text-xs font-mono text-white/30 uppercase">
                                {snippet.language}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
