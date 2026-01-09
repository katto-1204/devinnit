'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'

const demoCode = `function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-2xl font-bold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
}`

export function InteractiveDemo() {
    const [count, setCount] = useState(0)
    const [highlighted, setHighlighted] = useState('')

    useEffect(() => {
        const html = Prism.highlight(demoCode, Prism.languages.tsx, 'tsx')
        setHighlighted(html)
    }, [])

    return (
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-center mb-4"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    Live <span className="text-orange">Preview</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
                >
                    Write code and see it come to life instantly
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    {/* Code Panel */}
                    <div className="relative rounded-xl overflow-hidden border border-border bg-[#0d0d0d]">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/50">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="ml-2 text-xs text-muted-foreground font-mono">Counter.tsx</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm">
                            <code
                                className="language-tsx"
                                dangerouslySetInnerHTML={{ __html: highlighted }}
                            />
                        </pre>
                    </div>

                    {/* Preview Panel */}
                    <div className="relative rounded-xl overflow-hidden border border-border bg-card">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
                            <span className="text-xs text-muted-foreground font-mono">Preview</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-green-500">Live</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center min-h-[300px] p-6">
                            <div className="flex flex-col items-center gap-6">
                                <motion.h2
                                    key={count}
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-6xl font-black text-orange"
                                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                                >
                                    {count}
                                </motion.h2>
                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setCount((c) => c - 1)}
                                        className="w-14 h-14 rounded-xl bg-secondary border-2 border-border text-2xl font-bold hover:border-orange/50 transition-colors"
                                    >
                                        −
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setCount((c) => c + 1)}
                                        className="w-14 h-14 rounded-xl bg-orange text-white text-2xl font-bold hover:glow-orange-sm transition-all"
                                    >
                                        +
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
