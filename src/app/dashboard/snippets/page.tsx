'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Check, Copy, Code2, Search, Filter, Terminal } from 'lucide-react'
import { toast } from 'sonner'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

const snippets = [
  // Hooks
  {
    id: 'use-mouse-position',
    title: 'useMousePosition',
    category: 'Hooks',
    description: 'Track mouse coordinates for interactive effects.',
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
    id: 'use-window-size',
    title: 'useWindowSize',
    category: 'Hooks',
    description: 'Track window dimensions for responsive layouts.',
    language: 'typescript',
    code: `export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}`
  },
  {
    id: 'use-scroll-progress',
    title: 'useScrollProgress',
    category: 'Hooks',
    description: 'Track scroll percentage (0-1).',
    language: 'typescript',
    code: `export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}`
  },
  {
    id: 'use-click-outside',
    title: 'useClickOutside',
    category: 'Hooks',
    description: 'Detect clicks outside a specific element.',
    language: 'typescript',
    code: `export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}`
  },
  {
    id: 'use-media-query',
    title: 'useMediaQuery',
    category: 'Hooks',
    description: 'React hook for programmatic CSS media queries.',
    language: 'typescript',
    code: `export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}`
  },
  {
    id: 'use-clipboard',
    title: 'useClipboard',
    category: 'Hooks',
    description: 'Copy text to clipboard with success state.',
    language: 'typescript',
    code: `export function useClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text) => {
    if (!navigator?.clipboard) return false;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
      return true;
    } catch (error) {
      return false;
    }
  };

  return { isCopied, copyToClipboard };
}`
  },
  {
    id: 'use-debounce',
    title: 'useDebounce',
    category: 'Hooks',
    description: 'Delay execution of a value update.',
    language: 'typescript',
    code: `export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`
  },
  {
    id: 'use-local-storage',
    title: 'useLocalStorage',
    category: 'Hooks',
    description: 'Persist state to localStorage.',
    language: 'typescript',
    code: `export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {}
  };

  return [storedValue, setValue];
}`
  },
  {
    id: 'use-throttle',
    title: 'useThrottle',
    category: 'Hooks',
    description: 'Limit frequency of value updates.',
    language: 'typescript',
    code: `export function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const [lastRan, setLastRan] = useState(Date.now());

  useEffect(() => {
    const handler = setTimeout(function() {
      if (Date.now() - lastRan >= limit) {
        setThrottledValue(value);
        setLastRan(Date.now());
      }
    }, limit - (Date.now() - lastRan));

    return () => clearTimeout(handler);
  }, [value, limit, lastRan]);

  return throttledValue;
}`
  },

  // Visuals
  {
    id: 'glass-effect',
    title: 'Glassmorphism',
    category: 'Visuals',
    description: 'Tailwind utility class for glass effect.',
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
    category: 'Visuals',
    description: 'Animated gradient text component.',
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
    category: 'Visuals',
    description: 'Framer Motion variant for scrolling reveal.',
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
};`
  },
  {
    id: 'shimmer-effect',
    title: 'Shimmer CSS',
    category: 'Visuals',
    description: 'CSS Keyframes for shimmer loading effect.',
    language: 'css',
    code: `@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.animate-shimmer {
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}`
  },
  {
    id: 'noise-overlay',
    title: 'Noise Overlay',
    category: 'Visuals',
    description: 'SVG-based noise texture overlay.',
    language: 'css',
    code: `.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
}`
  },
  {
    id: 'glass-style',
    title: 'Glass Object',
    category: 'Visuals',
    description: 'React style object for dynamic glass.',
    language: 'typescript',
    code: `export const glassStyle = (opacity = 10, blur = 10) => ({
  background: \`rgba(255, 255, 255, \${opacity / 100})\`,
  backdropFilter: \`blur(\${blur}px)\`,
  WebkitBackdropFilter: \`blur(\${blur}px)\`,
  border: '1px solid rgba(255, 255, 255, 0.2)',
});`
  },

  // Utilities
  {
    id: 'format-currency',
    title: 'formatCurrency',
    category: 'Utilities',
    description: 'Format numbers as localized currency.',
    language: 'typescript',
    code: `export const formatCurrency = (amount, locale = 'en-US', currency = 'USD') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}`
  },
  {
    id: 'random-gradient',
    title: 'randomGradient',
    category: 'Utilities',
    description: 'Generate a random linear gradient string.',
    language: 'typescript',
    code: `export const randomGradient = () => {
  const colors = ['#ff7b00', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
  const c1 = colors[Math.floor(Math.random() * colors.length)];
  const c2 = colors[Math.floor(Math.random() * colors.length)];
  const angle = Math.floor(Math.random() * 360);
  return \`linear-gradient(\${angle}deg, \${c1}, \${c2})\`;
}`
  }
]

const categories = ['All', 'Hooks', 'Visuals', 'Utilities']

export default function SnippetsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    Prism.highlightAll()
  }, [selectedCategory, searchQuery])

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success('Snippet copied!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || snippet.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black mb-2" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
            Creative Snippets
          </h1>
          <p className="text-muted-foreground">
            Ready-to-use hooks and utilities for your next project.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:border-orange/50 transition-colors w-full sm:w-64"
            />
          </div>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide"
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === category
                ? 'bg-orange text-white shadow-lg shadow-orange/25'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div
        layout
        className="grid md:grid-cols-2 xl:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredSnippets.map((snippet, i) => (
            <motion.div
              layout
              key={snippet.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-orange/40 transition-colors"
            >
              <div className="p-5 border-b border-border bg-muted/30 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-foreground">{snippet.title}</h3>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-orange/10 text-orange">
                      {snippet.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{snippet.description}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(snippet.code, snippet.id)}
                  className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-background border border-border hover:border-orange/50 hover:bg-orange/10 transition-colors"
                  title="Copy code"
                >
                  {copiedId === snippet.id ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-muted-foreground group-hover:text-orange transition-colors" />
                  )}
                </button>
              </div>

              <div className="relative flex-1 bg-[#0d0d0d] group-hover:bg-[#121212] transition-colors">
                <div className="absolute right-4 top-3 flex items-center gap-2 pointer-events-none z-10">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                  </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                  <pre className="p-5 text-sm m-0 bg-transparent">
                    <code className={`language-${snippet.language} !bg-transparent !p-0 !m-0 !text-sm leading-relaxed`}>
                      {snippet.code}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredSnippets.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-muted-foreground"
        >
          <Terminal className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No snippets found matching "{searchQuery}"</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-4 text-orange hover:underline"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  )
}
