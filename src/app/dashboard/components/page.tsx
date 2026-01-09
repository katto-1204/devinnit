'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Layers,
    Star,
    Copy,
    Check,
    Eye,
    Code2,
    Sun,
    Moon,
    Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { NeonCard } from '@/components/creative/visuals/NeonCard'
import { HolographicButton } from '@/components/creative/visuals/HolographicButton'
import { GlowingInput } from '@/components/creative/visuals/GlowingInput'
import { GlassModal } from '@/components/creative/visuals/GlassModal'
import { NeonToggle } from '@/components/creative/visuals/NeonToggle'
import { GlitchText } from '@/components/creative/visuals/GlitchText'
import { AnimatedCounter } from '@/components/creative/data/AnimatedCounter'
import { CircularProgress } from '@/components/creative/data/CircularProgress'
import { ActivityGraph } from '@/components/creative/data/ActivityGraph'
import { SkillBar } from '@/components/creative/data/SkillBar'
import { StatCard } from '@/components/creative/data/StatCard'
import { OrbitSpinner } from '@/components/creative/feedback/OrbitSpinner'
import { ElasticTooltip } from '@/components/creative/feedback/ElasticTooltip'
import { SuccessBurst } from '@/components/creative/feedback/SuccessBurst'
import { SwipeableItem } from '@/components/creative/feedback/SwipeableItem'
import { MagneticButton } from '@/components/creative/feedback/MagneticButton'

// Sample components for the gallery
const components = [
    {
        id: '1',
        name: 'Animated Button',
        category: 'Buttons',
        description: 'A button with hover scale and glow effect',
        code: `<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange/30 transition-shadow"
>
  Click Me
</motion.button>`,
        preview: 'button',
    },
    {
        id: '2',
        name: 'Glass Card',
        category: 'Cards',
        description: 'A card with glassmorphism effect',
        code: `<div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
  <h3 className="text-xl font-bold mb-2">Glass Card</h3>
  <p className="text-muted-foreground">
    Beautiful glassmorphism effect
  </p>
</div>`,
        preview: 'card',
    },
    {
        id: '3',
        name: 'Gradient Badge',
        category: 'Badges',
        description: 'A badge with gradient background',
        code: `<span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-gradient-to-r from-orange to-pink-500">
  New Feature
</span>`,
        preview: 'badge',
    },
    {
        id: '4',
        name: 'Floating Input',
        category: 'Inputs',
        description: 'Input with floating label animation',
        code: `<div className="relative">
  <input
    type="text"
    id="floating"
    className="peer w-full px-4 py-3 bg-transparent border-2 border-border rounded-xl outline-none focus:border-orange transition-colors"
    placeholder=" "
  />
  <label
    htmlFor="floating"
    className="absolute left-4 top-3 text-muted-foreground peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-orange peer-focus:bg-background peer-focus:px-2 transition-all"
  >
    Email
  </label>
</div>`,
        preview: 'input',
    },
    {
        id: '5',
        name: 'Pulse Dot',
        category: 'Indicators',
        description: 'Animated pulse indicator',
        code: `<div className="flex items-center gap-2">
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
  </span>
  <span className="text-sm">Online</span>
</div>`,
        preview: 'indicator',
    },
    {
        id: '6',
        name: 'Avatar Stack',
        category: 'Avatars',
        description: 'Overlapping avatar group',
        code: `<div className="flex -space-x-3">
  {[1, 2, 3, 4].map((i) => (
    <div
      key={i}
      className="w-10 h-10 rounded-full bg-gradient-to-br from-orange to-pink-500 border-2 border-background flex items-center justify-center text-white text-sm font-medium"
    >
      {String.fromCharCode(64 + i)}
    </div>
  ))}
  <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-sm">
    +5
  </div>
</div>`,
        preview: 'avatars',
    },
    {
        id: '7',
        name: 'Progress Ring',
        category: 'Progress',
        description: 'Circular progress indicator',
        code: `<svg className="w-20 h-20 -rotate-90">
  <circle
    cx="40"
    cy="40"
    r="36"
    fill="none"
    stroke="currentColor"
    strokeWidth="8"
    className="text-muted"
  />
  <circle
    cx="40"
    cy="40"
    r="36"
    fill="none"
    stroke="currentColor"
    strokeWidth="8"
    strokeDasharray="226"
    strokeDashoffset="56"
    strokeLinecap="round"
    className="text-orange"
  />
</svg>`,
        preview: 'progress',
    },
    {
        id: '8',
        name: 'Notification Toast',
        category: 'Toasts',
        description: 'Animated notification component',
        code: `<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-lg"
>
  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
    <Check className="w-5 h-5 text-green-500" />
  </div>
  <div>
    <p className="font-semibold">Success!</p>
    <p className="text-sm text-muted-foreground">Your action was completed.</p>
  </div>
</motion.div>`,
        preview: 'toast',
    },

    {
        id: 'visual-1',
        name: 'Neon Card',
        category: 'Visuals',
        description: 'Glassmorphism card with neon glow',
        code: `import { NeonCard } from '@/components/creative/visuals/NeonCard'

<NeonCard color="#ff7b00">
  <h3 className="text-xl font-bold text-white mb-2">Neon Card</h3>
  <p className="text-gray-400">Hover me to see the glow effect!</p>
</NeonCard>`,
        preview: 'neon-card',
    },
    {
        id: 'visual-2',
        name: 'Holo Button',
        category: 'Visuals',
        description: 'Button with glitch effect',
        code: `import { HolographicButton } from '@/components/creative/visuals/HolographicButton'

<HolographicButton text="INITIALIZE" />`,
        preview: 'holo-button',
    },
    {
        id: 'visual-3',
        name: 'Glowing Input',
        category: 'Visuals',
        description: 'Input with animated border',
        code: `import { GlowingInput } from '@/components/creative/visuals/GlowingInput'

<GlowingInput placeholder="Search..." />`,
        preview: 'glowing-input',
    },
    {
        id: 'visual-4',
        name: 'Glass Modal',
        category: 'Visuals',
        description: 'Modal with backdrop blur',
        code: `import { GlassModal } from '@/components/creative/visuals/GlassModal'
        
// State management required
<GlassModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Glass Modal">
  <p>This is a beautiful glass modal.</p>
</GlassModal>`,
        preview: 'glass-modal',
    },
    {
        id: 'visual-6',
        name: 'Glitch Text',
        category: 'Visuals',
        description: 'Text with RGB split glitch effect',
        code: `import { GlitchText } from '@/components/creative/visuals/GlitchText'

<GlitchText text="HOVER_ME" className="text-4xl font-bold text-white" />`,
        preview: 'glitch-text',
    },
    {
        id: 'visual-5',
        name: 'Neon Toggle',
        category: 'Visuals',
        description: 'Cyberpunk style toggle',
        code: `import { NeonToggle } from '@/components/creative/visuals/NeonToggle'

<NeonToggle isOn={true} onToggle={() => {}} />`,
        preview: 'neon-toggle',
    },
    {
        id: 'data-1',
        name: 'Animated Counter',
        category: 'Interactive Data',
        description: 'Rolling number counter',
        code: `import { AnimatedCounter } from '@/components/creative/data/AnimatedCounter'

<AnimatedCounter value={1234} label="Total Users" />`,
        preview: 'animated-counter',
    },
    {
        id: 'data-2',
        name: 'Circular Progress',
        category: 'Interactive Data',
        description: 'Animated SVG ring',
        code: `import { CircularProgress } from '@/components/creative/data/CircularProgress'

<CircularProgress progress={75} color="#ff7b00" />`,
        preview: 'circular-progress',
    },
    {
        id: 'data-3',
        name: 'Activity Graph',
        category: 'Interactive Data',
        description: 'Interactive SVG area chart',
        code: `import { ActivityGraph } from '@/components/creative/data/ActivityGraph'

<ActivityGraph />`,
        preview: 'activity-graph',
    },
    {
        id: 'data-4',
        name: 'Skill Bar',
        category: 'Interactive Data',
        description: 'Progress bar with liquid fill',
        code: `import { SkillBar } from '@/components/creative/data/SkillBar'

<SkillBar name="React" level={90} color="#61dafb" />`,
        preview: 'skill-bar',
    },
    {
        id: 'data-5',
        name: 'Stat Card',
        category: 'Interactive Data',
        description: 'Card with reveal effect',
        code: `import { StatCard } from '@/components/creative/data/StatCard'

<StatCard title="Revenue" value="$45,231" change={12.5} />`,
        preview: 'stat-card',
    },
    {
        id: 'feedback-1',
        name: 'Orbit Spinner',
        category: 'Feedback',
        description: '3D galaxy loading animation',
        code: `import { OrbitSpinner } from '@/components/creative/feedback/OrbitSpinner'

<OrbitSpinner />`,
        preview: 'orbit-spinner',
    },
    {
        id: 'feedback-2',
        name: 'Elastic Tooltip',
        category: 'Feedback',
        description: 'Tooltip with spring physics',
        code: `import { ElasticTooltip } from '@/components/creative/feedback/ElasticTooltip'

<ElasticTooltip content="I am elastic!">
  <button className="btn">Hover Me</button>
</ElasticTooltip>`,
        preview: 'elastic-tooltip',
    },
    {
        id: 'feedback-3',
        name: 'Success Burst',
        category: 'Feedback',
        description: 'Checkmark with particle burst',
        code: `import { SuccessBurst } from '@/components/creative/feedback/SuccessBurst'

<SuccessBurst />`,
        preview: 'success-burst',
    },
    {
        id: 'feedback-4',
        name: 'Swipeable Item',
        category: 'Feedback',
        description: 'List item with swipe actions',
        code: `import { SwipeableItem } from '@/components/creative/feedback/SwipeableItem'

<SwipeableItem title="New Message" subtitle="Swipe me left or right" />`,
        preview: 'swipeable-item',
    },
    {
        id: 'feedback-5',
        name: 'Magnetic Button',
        category: 'Feedback',
        description: 'Button that attracts to cursor',
        code: `import { MagneticButton } from '@/components/creative/feedback/MagneticButton'

<MagneticButton />`,
        preview: 'magnetic-button',
    },
]

const categories = ['All', ...Array.from(new Set(components.map((c) => c.category)))]

// Wrapper component for NeonToggle preview to avoid hook violation in switch statement
function NeonTogglePreview() {
    const [isOn, setIsOn] = useState(true)
    return <NeonToggle isOn={isOn} onToggle={() => setIsOn(!isOn)} />
}

export default function ComponentsPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [favorites, setFavorites] = useState<string[]>([])
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const [previewComponent, setPreviewComponent] = useState<typeof components[0] | null>(null)
    const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('dark')
    // Modal state for the demo
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

    const filteredComponents = selectedCategory === 'All'
        ? components
        : components.filter((c) => c.category === selectedCategory)

    const toggleFavorite = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        )
    }

    const handleCopy = async (component: typeof components[0]) => {
        await navigator.clipboard.writeText(component.code)
        setCopiedId(component.id)
        toast.success('Copied to clipboard!')
        setTimeout(() => setCopiedId(null), 2000)
    }

    const renderPreview = (type: string) => {
        switch (type) {
            case 'button':
                return (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-orange text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange/30 transition-shadow"
                    >
                        Click Me
                    </motion.button>
                )
            case 'card':
                return (
                    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl max-w-xs">
                        <h3 className="text-xl font-bold mb-2">Glass Card</h3>
                        <p className="text-muted-foreground text-sm">
                            Beautiful glassmorphism effect
                        </p>
                    </div>
                )
            case 'badge':
                return (
                    <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-gradient-to-r from-orange to-pink-500">
                        New Feature
                    </span>
                )
            case 'input':
                return (
                    <div className="relative w-64">
                        <input
                            type="text"
                            id="floating"
                            className="peer w-full px-4 py-3 bg-transparent border-2 border-border rounded-xl outline-none focus:border-orange transition-colors"
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating"
                            className="absolute left-4 top-3 text-muted-foreground peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm peer-focus:text-orange peer-focus:bg-background peer-focus:px-2 transition-all pointer-events-none"
                        >
                            Email
                        </label>
                    </div>
                )
            case 'indicator':
                return (
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm">Online</span>
                    </div>
                )
            case 'avatars':
                return (
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-orange to-pink-500 border-2 border-background flex items-center justify-center text-white text-sm font-medium"
                            >
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-sm">
                            +5
                        </div>
                    </div>
                )
            case 'progress':
                return (
                    <svg className="w-20 h-20 -rotate-90">
                        <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-muted"
                        />
                        <circle
                            cx="40"
                            cy="40"
                            r="36"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeDasharray="226"
                            strokeDashoffset="56"
                            strokeLinecap="round"
                            className="text-orange"
                        />
                    </svg>
                )
            case 'toast':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl shadow-lg"
                    >
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <p className="font-semibold">Success!</p>
                            <p className="text-sm text-muted-foreground">Your action was completed.</p>
                        </div>
                    </motion.div>
                )
            case 'neon-card':
                return (
                    <NeonCard color="#ff7b00" className="w-64">
                        <h3 className="text-xl font-bold text-white mb-2">Neon Card</h3>
                        <p className="text-gray-400 text-sm">Hover me to see the glow effect!</p>
                    </NeonCard>
                )
            case 'holo-button':
                return <HolographicButton text="INITIALIZE" />
            case 'glowing-input':
                return <GlowingInput placeholder="Search..." />
            case 'glass-modal':
                return (
                    <div className="flex flex-col items-center gap-2">
                        <Button onClick={() => setIsDemoModalOpen(true)}>Open Modal</Button>
                        <GlassModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} title="Glass Modal">
                            <p className="mb-4">This is a beautiful glass modal with backdrop blur and entrance animation.</p>
                            <div className="flex justify-end">
                                <Button onClick={() => setIsDemoModalOpen(false)} variant="secondary">Close</Button>
                            </div>
                        </GlassModal>
                    </div>
                )
            case 'glitch-text':
                return <GlitchText text="HOVER_ME" className="text-4xl font-bold text-white" />
            case 'neon-toggle':
                return <NeonTogglePreview />
            case 'animated-counter':
                return <AnimatedCounter value={1234} label="Total Users" />
            case 'circular-progress':
                return <CircularProgress progress={75} />
            case 'activity-graph':
                return <div className="w-full max-w-xs"><ActivityGraph /></div>
            case 'skill-bar':
                return <div className="w-full max-w-xs"><SkillBar name="React" level={90} /></div>
            case 'stat-card':
                return <div className="w-full max-w-xs"><StatCard title="Revenue" value="$45,231" change={12.5} /></div>
            case 'orbit-spinner':
                return <OrbitSpinner />
            case 'elastic-tooltip':
                return (
                    <ElasticTooltip content="I am elastic!">
                        <Button variant="outline">Hover Me</Button>
                    </ElasticTooltip>
                )
            case 'success-burst':
                return <SuccessBurst />
            case 'swipeable-item':
                return <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg"><SwipeableItem title="New Message" subtitle="Swipe me left or right" /></div>
            case 'magnetic-button':
                return <MagneticButton />
            default:
                return null
        }
    }

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
                    Components
                </h1>
                <p className="text-muted-foreground">
                    Browse and copy ready-to-use React components
                </p>
            </motion.div>

            {/* Category Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2"
            >
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'ghost'}
                        className={selectedCategory === category ? 'bg-orange hover:bg-orange-dark text-white' : ''}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </motion.div>

            {/* Components Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
                <AnimatePresence mode="popLayout">
                    {filteredComponents.map((component, i) => (
                        <motion.div
                            key={component.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="group p-4 rounded-xl bg-card border border-border hover:border-orange/40 transition-all cursor-pointer"
                        >
                            {/* Preview Area */}
                            <div
                                className="h-32 mb-4 rounded-lg bg-secondary/30 flex items-center justify-center overflow-hidden"
                                onClick={() => setPreviewComponent(component)}
                            >
                                {renderPreview(component.preview)}
                            </div>

                            {/* Info */}
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="font-semibold">{component.name}</h3>
                                    <Badge variant="secondary" className="text-xs mt-1">
                                        {component.category}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            toggleFavorite(component.id)
                                        }}
                                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                                    >
                                        <Star
                                            className={`w-4 h-4 ${favorites.includes(component.id)
                                                ? 'text-yellow-500 fill-yellow-500'
                                                : 'text-muted-foreground hover:text-yellow-500'
                                                }`}
                                        />
                                    </motion.button>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">{component.description}</p>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex-1 gap-1"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setPreviewComponent(component)
                                    }}
                                >
                                    <Eye className="w-4 h-4" />
                                    Preview
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex-1 gap-1"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleCopy(component)
                                    }}
                                >
                                    {copiedId === component.id ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                    Copy
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewComponent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setPreviewComponent(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-4xl rounded-2xl bg-card border border-border overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-orange/20 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-orange" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold">{previewComponent.name}</h2>
                                        <Badge variant="secondary" className="text-xs">
                                            {previewComponent.category}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
                                    >
                                        {previewTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                    </Button>
                                    <Button
                                        onClick={() => handleCopy(previewComponent)}
                                        className="bg-orange hover:bg-orange-dark text-white gap-2"
                                    >
                                        {copiedId === previewComponent.id ? (
                                            <Check className="w-4 h-4" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="grid md:grid-cols-2">
                                {/* Live Preview */}
                                <div className={`p-8 flex items-center justify-center min-h-[300px] ${previewTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
                                    }`}>
                                    <div className={previewTheme === 'dark' ? '' : 'text-black'}>
                                        {renderPreview(previewComponent.preview)}
                                    </div>
                                </div>

                                {/* Code */}
                                <div className="border-l border-border">
                                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/50">
                                        <Code2 className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground font-mono">Code</span>
                                    </div>
                                    <pre className="p-4 overflow-x-auto text-sm max-h-[300px] bg-[#0d0d0d]">
                                        <code className="language-jsx text-muted-foreground">
                                            {previewComponent.code}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
