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
import { TiltCard } from '@/components/creative/premium/TiltCard'
import { SpotlightCard } from '@/components/creative/premium/SpotlightCard'
import { LiquidButton } from '@/components/creative/premium/LiquidButton'
import { Carousel3D } from '@/components/creative/premium/Carousel3D'
import { TextReveal } from '@/components/creative/premium/TextReveal'
import { ParticleText } from '@/components/creative/premium/ParticleText'
import { PerspectiveGrid } from '@/components/creative/premium/PerspectiveGrid'
import { GravityZone } from '@/components/creative/premium/GravityZone'
import { InfiniteMarquee } from '@/components/creative/premium/InfiniteMarquee'
import { HelixLoader } from '@/components/creative/premium/HelixLoader'
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

// Group A: Buttons
import { GradientBorderButton } from '@/components/creative/buttons/GradientBorderButton'
import { LiquidBlobButton } from '@/components/creative/buttons/LiquidBlobButton'
import { NeuButton } from '@/components/creative/buttons/NeuButton'
import { CyberButton } from '@/components/creative/buttons/CyberButton'
import { MagneticButton as MagneticButtonNew } from '@/components/creative/buttons/MagneticButton'

// Group B: Cards
import { ParallaxCard } from '@/components/creative/cards/ParallaxCard'
import { FlipCard } from '@/components/creative/cards/FlipCard'
import { GlassStackCard } from '@/components/creative/cards/GlassStackCard'
import { NeonBorderCard } from '@/components/creative/cards/NeonBorderCard'
import { PatternRevealCard } from '@/components/creative/cards/PatternRevealCard'

// Group C: Badges
import { PulseBadge } from '@/components/creative/badges/PulseBadge'
import { GradientBadge } from '@/components/creative/badges/GradientBadge'
import { GlitchBadge } from '@/components/creative/badges/GlitchBadge'
import { OutlineGlowBadge } from '@/components/creative/badges/OutlineGlowBadge'
import { StatusDotBadge } from '@/components/creative/badges/StatusDotBadge'

// Group D: Inputs
import { FloatingLabelInput } from '@/components/creative/inputs/FloatingLabelInput'
import { SpotlightInput } from '@/components/creative/inputs/SpotlightInput'
import { ShakeOnErrorInput } from '@/components/creative/inputs/ShakeOnErrorInput'
import { TypewriterInput } from '@/components/creative/inputs/TypewriterInput'
import { MaterialInput } from '@/components/creative/inputs/MaterialInput'

// Group E: Indicators
import { PingIndicator } from '@/components/creative/indicators/PingIndicator'
import { WaveIndicator } from '@/components/creative/indicators/WaveIndicator'
import { StatusRing } from '@/components/creative/indicators/StatusRing'
import { TypingDots } from '@/components/creative/indicators/TypingDots'
import { LiveIndicator } from '@/components/creative/indicators/LiveIndicator'

// Group F: Avatars
import { AvatarStack } from '@/components/creative/avatars/AvatarStack'
import { StoryRingAvatar } from '@/components/creative/avatars/StoryRingAvatar'
import { TooltipAvatar } from '@/components/creative/avatars/TooltipAvatar'
import { HexagonAvatar } from '@/components/creative/avatars/HexagonAvatar'
import { OnlineBadgeAvatar } from '@/components/creative/avatars/OnlineBadgeAvatar'

// Group G: Progress & Toasts
import { CircularGradient } from '@/components/creative/progress/CircularGradient'
import { LiquidProgressBar } from '@/components/creative/progress/LiquidProgressBar'
import { StepTracker } from '@/components/creative/progress/StepTracker'
import { SegmentedProgress } from '@/components/creative/progress/SegmentedProgress'
import { Scrubber } from '@/components/creative/progress/Scrubber'

import { StackedToasts } from '@/components/creative/toasts/StackedToasts'
import { TimerToast } from '@/components/creative/toasts/TimerToast'
import { InteractiveToast } from '@/components/creative/toasts/InteractiveToast'
import { GlassToast } from '@/components/creative/toasts/GlassToast'
import { ActionToast } from '@/components/creative/toasts/ActionToast'

// Group H: Premium
import { BookFlip3D } from '@/components/creative/premium/BookFlip3D'
import { HoverPerspective } from '@/components/creative/premium/HoverPerspective'
import { InteractiveParticles } from '@/components/creative/premium/InteractiveParticles'
import { CubeCarousel } from '@/components/creative/premium/CubeCarousel'
import { DistortionImage } from '@/components/creative/premium/DistortionImage'
import { HolographicCard } from '@/components/creative/premium/HolographicCard'
import { FloatingPhone } from '@/components/creative/premium/FloatingPhone'

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
    // Premium Components
    {
        id: 'premium-1',
        name: '3D Tilt Card',
        category: 'Premium & 3D',
        description: 'Card with mouse-aware 3D perspective tilt',
        code: `import { TiltCard } from '@/components/creative/premium/TiltCard'

<TiltCard>
  <h3 className="text-xl font-bold text-white">3D Card</h3>
  <p className="text-gray-300">Hover to see the effect</p>
</TiltCard>`,
        preview: 'tilt-card',
    },
    {
        id: 'premium-2',
        name: 'Spotlight Card',
        category: 'Premium & 3D',
        description: 'Card with flashlight reveal effect',
        code: `import { SpotlightCard } from '@/components/creative/premium/SpotlightCard'

<SpotlightCard>
  <h3 className="text-xl font-bold text-white">Spotlight</h3>
</SpotlightCard>`,
        preview: 'spotlight-card',
    },
    {
        id: 'premium-3',
        name: 'Liquid Button',
        category: 'Premium & 3D',
        description: 'Button with gooey morphing effect',
        code: `import { LiquidButton } from '@/components/creative/premium/LiquidButton'

<LiquidButton text="Click Me" />`,
        preview: 'liquid-button',
    },
    {
        id: 'premium-4',
        name: '3D Carousel',
        category: 'Premium & 3D',
        description: 'Rotating cylinder carousel',
        code: `import { Carousel3D } from '@/components/creative/premium/Carousel3D'

<Carousel3D />`,
        preview: 'carousel-3d',
    },
    {
        id: 'premium-5',
        name: 'Text Reveal Mask',
        category: 'Premium & 3D',
        description: 'Cinematic masked text entry',
        code: `import { TextReveal } from '@/components/creative/premium/TextReveal'

<TextReveal text="Cinematic Text Reveal Animation" className="text-3xl font-bold text-white" />`,
        preview: 'text-reveal',
    },
    {
        id: 'premium-6',
        name: 'Particle Text',
        category: 'Premium & 3D',
        description: 'Canvas-based particle disintegration',
        code: `import { ParticleText } from '@/components/creative/premium/ParticleText'

<ParticleText text="PARTICLES" />`,
        preview: 'particle-text',
    },
    {
        id: 'premium-7',
        name: 'Perspective Grid',
        category: 'Premium & 3D',
        description: 'Retro 80s style 3D floor',
        code: `import { PerspectiveGrid } from '@/components/creative/premium/PerspectiveGrid'

<PerspectiveGrid />`,
        preview: 'perspective-grid',
    },
    {
        id: 'premium-8',
        name: 'Gravity Zone',
        category: 'Premium & 3D',
        description: 'Physics-based attraction zone',
        code: `import { GravityZone } from '@/components/creative/premium/GravityZone'

<GravityZone />`,
        preview: 'gravity-zone',
    },
    {
        id: 'premium-9',
        name: 'Infinite Marquee',
        category: 'Premium & 3D',
        description: 'Looping 3D marquee text',
        code: `import { InfiniteMarquee } from '@/components/creative/premium/InfiniteMarquee'

<InfiniteMarquee />`,
        preview: 'infinite-marquee',
    },
    {
        id: 'premium-10',
        name: 'Helix Loader',
        category: 'Premium & 3D',
        description: 'DNA double helix animation',
        code: `import { HelixLoader } from '@/components/creative/premium/HelixLoader'

<HelixLoader />`,
        preview: 'helix-loader',
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
    // New Components Phase 2
    // Buttons
    {
        id: 'magnetic-button-new',
        name: 'Magnetic (Physics)',
        category: 'Buttons',
        description: 'Enhanced magnetic button with spring physics',
        code: `import { MagneticButton } from '@/components/creative/buttons/MagneticButton'\n\n<MagneticButton>Physics</MagneticButton>`,
        preview: 'magnetic-button-new'
    },
    {
        id: 'gradient-border-button',
        name: 'Gradient Border',
        category: 'Buttons',
        description: 'Animated gradient border effect',
        code: `import { GradientBorderButton } from '@/components/creative/buttons/GradientBorderButton'\n\n<GradientBorderButton text="Gradient" />`,
        preview: 'gradient-border-button'
    },
    {
        id: 'liquid-blob-button',
        name: 'Liquid Blob',
        category: 'Buttons',
        description: 'Gooey blob hover effect',
        code: `import { LiquidBlobButton } from '@/components/creative/buttons/LiquidBlobButton'\n\n<LiquidBlobButton text="Gooey" />`,
        preview: 'liquid-blob-button'
    },
    {
        id: 'neu-button',
        name: 'Neu Button',
        category: 'Buttons',
        description: 'Neumorphism style with soft shadows',
        code: `import { NeuButton } from '@/components/creative/buttons/NeuButton'\n\n<NeuButton>Soft UI</NeuButton>`,
        preview: 'neu-button'
    },
    {
        id: 'cyber-button',
        name: 'Cyber Button',
        category: 'Buttons',
        description: 'Glitch/Cyberpunk style with scanlines',
        code: `import { CyberButton } from '@/components/creative/buttons/CyberButton'\n\n<CyberButton text="CYBER" />`,
        preview: 'cyber-button'
    },

    // Cards
    {
        id: 'parallax-card',
        name: 'Parallax Card',
        category: 'Cards',
        description: 'Mouse-aware depth effect',
        code: `import { ParallaxCard } from '@/components/creative/cards/ParallaxCard'\n\n<ParallaxCard>\n  <h3 className="text-xl font-bold text-white">Parallax</h3>\n  <p className="text-indigo-200">Move mouse to see depth.</p>\n</ParallaxCard>`,
        preview: 'parallax-card'
    },
    {
        id: 'flip-card',
        name: 'Flip Card',
        category: 'Cards',
        description: '3D flip interaction on click',
        code: `import { FlipCard } from '@/components/creative/cards/FlipCard'\n\n<FlipCard \n  frontContent={<span>Front</span>} \n  backContent={<span>Back</span>} \n/>`,
        preview: 'flip-card'
    },
    {
        id: 'glass-stack-card',
        name: 'Glass Stack',
        category: 'Cards',
        description: 'Stacked glass layers with hover effect',
        code: `import { GlassStackCard } from '@/components/creative/cards/GlassStackCard'\n\n<GlassStackCard>\n  <h3 className="text-xl font-bold">Glass Stack</h3>\n</GlassStackCard>`,
        preview: 'glass-stack-card'
    },
    {
        id: 'neon-border-card',
        name: 'Neon Border',
        category: 'Cards',
        description: 'Glowing gradient border animation',
        code: `import { NeonBorderCard } from '@/components/creative/cards/NeonBorderCard'\n\n<NeonBorderCard>\n  <h3 className="text-xl font-bold">Neon</h3>\n</NeonBorderCard>`,
        preview: 'neon-border-card'
    },
    {
        id: 'pattern-reveal-card',
        name: 'Pattern Reveal',
        category: 'Cards',
        description: 'Reveal pattern on hover with spotlight',
        code: `import { PatternRevealCard } from '@/components/creative/cards/PatternRevealCard'\n\n<PatternRevealCard />`,
        preview: 'pattern-reveal-card'
    },

    // Badges
    {
        id: 'pulse-badge',
        name: 'Pulse Badge',
        category: 'Badges',
        description: 'Pulsing status badge',
        code: `import { PulseBadge } from '@/components/creative/badges/PulseBadge'\n\n<PulseBadge>Live</PulseBadge>`,
        preview: 'pulse-badge'
    },
    {
        id: 'gradient-badge',
        name: 'Gradient Badge',
        category: 'Badges',
        description: 'Gradient background badge',
        code: `import { GradientBadge } from '@/components/creative/badges/GradientBadge'\n\n<GradientBadge text="New" />`,
        preview: 'gradient-badge-new'
    },
    {
        id: 'glitch-badge',
        name: 'Glitch Badge',
        category: 'Badges',
        description: 'Glitch effect badge',
        code: `import { GlitchBadge } from '@/components/creative/badges/GlitchBadge'\n\n<GlitchBadge text="ERROR" />`,
        preview: 'glitch-badge'
    },
    {
        id: 'outline-glow-badge',
        name: 'Outline Glow',
        category: 'Badges',
        description: 'Glowing outline badge',
        code: `import { OutlineGlowBadge } from '@/components/creative/badges/OutlineGlowBadge'\n\n<OutlineGlowBadge text="Glow" />`,
        preview: 'outline-glow-badge'
    },
    {
        id: 'status-dot-badge',
        name: 'Status Dot',
        category: 'Badges',
        description: 'Status indicator with dot',
        code: `import { StatusDotBadge } from '@/components/creative/badges/StatusDotBadge'\n\n<StatusDotBadge status="online" />`,
        preview: 'status-dot-badge'
    },

    // Inputs
    {
        id: 'floating-label-input',
        name: 'Floating Label',
        category: 'Inputs',
        description: 'Animated label input',
        code: `import { FloatingLabelInput } from '@/components/creative/inputs/FloatingLabelInput'\n\n<FloatingLabelInput label="Username" />`,
        preview: 'floating-label-input'
    },
    {
        id: 'spotlight-input',
        name: 'Spotlight Input',
        category: 'Inputs',
        description: 'Cursor spotlight effect input',
        code: `import { SpotlightInput } from '@/components/creative/inputs/SpotlightInput'\n\n<SpotlightInput placeholder="Spotlight..." />`,
        preview: 'spotlight-input'
    },
    {
        id: 'shake-error-input',
        name: 'Shake Error',
        category: 'Inputs',
        description: 'Shakes on error keyword',
        code: `import { ShakeOnErrorInput } from '@/components/creative/inputs/ShakeOnErrorInput'\n\n<ShakeOnErrorInput placeholder="Type 'error'..." />`,
        preview: 'shake-error-input'
    },
    {
        id: 'typewriter-input',
        name: 'Typewriter Input',
        category: 'Inputs',
        description: 'Rotating typewriter placeholder',
        code: `import { TypewriterInput } from '@/components/creative/inputs/TypewriterInput'\n\n<TypewriterInput />`,
        preview: 'typewriter-input'
    },
    {
        id: 'material-input',
        name: 'Material Input',
        category: 'Inputs',
        description: 'Material ripple line input',
        code: `import { MaterialInput } from '@/components/creative/inputs/MaterialInput'\n\n<MaterialInput label="Username" />`,
        preview: 'material-input'
    },

    // Indicators
    {
        id: 'ping-indicator',
        name: 'Ping Indicator',
        category: 'Indicators',
        description: 'Pinging status dot',
        code: `import { PingIndicator } from '@/components/creative/indicators/PingIndicator'\n\n<PingIndicator />`,
        preview: 'ping-indicator'
    },
    {
        id: 'wave-indicator',
        name: 'Wave Indicator',
        category: 'Indicators',
        description: 'Ripple wave effect',
        code: `import { WaveIndicator } from '@/components/creative/indicators/WaveIndicator'\n\n<WaveIndicator />`,
        preview: 'wave-indicator'
    },
    {
        id: 'status-ring',
        name: 'Status Ring',
        category: 'Indicators',
        description: 'Ring status indicator',
        code: `import { StatusRing } from '@/components/creative/indicators/StatusRing'\n\n<StatusRing status="online" />`,
        preview: 'status-ring'
    },
    {
        id: 'typing-dots',
        name: 'Typing Dots',
        category: 'Indicators',
        description: 'Typing animation dots',
        code: `import { TypingDots } from '@/components/creative/indicators/TypingDots'\n\n<TypingDots />`,
        preview: 'typing-dots'
    },
    {
        id: 'live-indicator',
        name: 'Live Indicator',
        category: 'Indicators',
        description: 'Live status badge',
        code: `import { LiveIndicator } from '@/components/creative/indicators/LiveIndicator'\n\n<LiveIndicator />`,
        preview: 'live-indicator'
    },

    // Avatars
    {
        id: 'avatar-stack',
        name: 'Avatar Stack',
        category: 'Avatars',
        description: 'Stacked avatar group',
        code: `import { AvatarStack } from '@/components/creative/avatars/AvatarStack'\n\n<AvatarStack images={['/img1.jpg', '/img2.jpg']} />`,
        preview: 'avatar-stack-new'
    },
    {
        id: 'story-ring-avatar',
        name: 'Story Ring',
        category: 'Avatars',
        description: 'Instagram-like story ring',
        code: `import { StoryRingAvatar } from '@/components/creative/avatars/StoryRingAvatar'\n\n<StoryRingAvatar src="/img.jpg" />`,
        preview: 'story-ring-avatar'
    },
    {
        id: 'tooltip-avatar',
        name: 'Tooltip Avatar',
        category: 'Avatars',
        description: 'Name tooltip on hover',
        code: `import { TooltipAvatar } from '@/components/creative/avatars/TooltipAvatar'\n\n<TooltipAvatar src="/img.jpg" name="User" />`,
        preview: 'tooltip-avatar'
    },
    {
        id: 'hexagon-avatar',
        name: 'Hexagon Avatar',
        category: 'Avatars',
        description: 'Hexagon clip-path avatar',
        code: `import { HexagonAvatar } from '@/components/creative/avatars/HexagonAvatar'\n\n<HexagonAvatar src="/img.jpg" />`,
        preview: 'hexagon-avatar'
    },
    {
        id: 'online-badge-avatar',
        name: 'Online Badge',
        category: 'Avatars',
        description: 'Avatar with status dot',
        code: `import { OnlineBadgeAvatar } from '@/components/creative/avatars/OnlineBadgeAvatar'\n\n<OnlineBadgeAvatar src="/img.jpg" status="online" />`,
        preview: 'online-badge-avatar'
    },

    // Progress
    {
        id: 'circular-gradient',
        name: 'Circular Gradient',
        category: 'Progress',
        description: 'Gradient ring chart',
        code: `import { CircularGradient } from '@/components/creative/progress/CircularGradient'\n\n<CircularGradient progress={75} />`,
        preview: 'circular-gradient'
    },
    {
        id: 'liquid-progress',
        name: 'Liquid Progress',
        category: 'Progress',
        description: 'Liquid fill effect',
        code: `import { LiquidProgressBar } from '@/components/creative/progress/LiquidProgressBar'\n\n<LiquidProgressBar progress={60} />`,
        preview: 'liquid-progress'
    },
    {
        id: 'step-tracker',
        name: 'Step Tracker',
        category: 'Progress',
        description: 'Step progress bar',
        code: `import { StepTracker } from '@/components/creative/progress/StepTracker'\n\n<StepTracker current={1} />`,
        preview: 'step-tracker'
    },
    {
        id: 'segmented-progress',
        name: 'Segmented Bar',
        category: 'Progress',
        description: 'Segmented progress bar',
        code: `import { SegmentedProgress } from '@/components/creative/progress/SegmentedProgress'\n\n<SegmentedProgress current={3} total={5} />`,
        preview: 'segmented-progress'
    },
    {
        id: 'scrubber',
        name: 'Scrubber',
        category: 'Progress',
        description: 'Interactive scrubber',
        code: `import { Scrubber } from '@/components/creative/progress/Scrubber'\n\n<Scrubber initial={50} />`,
        preview: 'scrubber'
    },

    // Toasts
    {
        id: 'stacked-toasts',
        name: 'Stacked Toasts',
        category: 'Toasts',
        description: 'Stacked notification cards',
        code: `import { StackedToasts } from '@/components/creative/toasts/StackedToasts'\n\n<StackedToasts />`,
        preview: 'stacked-toasts'
    },
    {
        id: 'timer-toast',
        name: 'Timer Toast',
        category: 'Toasts',
        description: 'Toast with timer bar',
        code: `import { TimerToast } from '@/components/creative/toasts/TimerToast'\n\n<TimerToast duration={5000} />`,
        preview: 'timer-toast'
    },
    {
        id: 'interactive-toast',
        name: 'Interactive Toast',
        category: 'Toasts',
        description: 'Toast with actions',
        code: `import { InteractiveToast } from '@/components/creative/toasts/InteractiveToast'\n\n<InteractiveToast />`,
        preview: 'interactive-toast'
    },
    {
        id: 'glass-toast',
        name: 'Glass Toast',
        category: 'Toasts',
        description: 'Glassmorphism toast',
        code: `import { GlassToast } from '@/components/creative/toasts/GlassToast'\n\n<GlassToast />`,
        preview: 'glass-toast'
    },
    {
        id: 'action-toast',
        name: 'Action Toast',
        category: 'Toasts',
        description: 'Toast with undo action',
        code: `import { ActionToast } from '@/components/creative/toasts/ActionToast'\n\n<ActionToast />`,
        preview: 'action-toast'
    },

    // Premium
    {
        id: 'book-flip-3d',
        name: 'Book Flip 3D',
        category: 'Premium & 3D',
        description: '3D Book Flip',
        code: `import { BookFlip3D } from '@/components/creative/premium/BookFlip3D'\n\n<BookFlip3D />`,
        preview: 'book-flip-3d'
    },
    {
        id: 'hover-perspective',
        name: 'Hover Perspective',
        category: 'Premium & 3D',
        description: '3D Image Tilt',
        code: `import { HoverPerspective } from '@/components/creative/premium/HoverPerspective'\n\n<HoverPerspective />`,
        preview: 'hover-perspective'
    },
    {
        id: 'interactive-particles',
        name: 'Interactive Particles',
        category: 'Premium & 3D',
        description: 'Interactive Particles',
        code: `import { InteractiveParticles } from '@/components/creative/premium/InteractiveParticles'\n\n<InteractiveParticles />`,
        preview: 'interactive-particles'
    },
    {
        id: 'cube-carousel',
        name: 'Cube Carousel',
        category: 'Premium & 3D',
        description: '3D Rotating Cube',
        code: `import { CubeCarousel } from '@/components/creative/premium/CubeCarousel'\n\n<CubeCarousel />`,
        preview: 'cube-carousel'
    },
    {
        id: 'distortion-image',
        name: 'Distortion Image',
        category: 'Premium & 3D',
        description: 'Image Distortion Effect',
        code: `import { DistortionImage } from '@/components/creative/premium/DistortionImage'\n\n<DistortionImage />`,
        preview: 'distortion-image'
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
            case 'tilt-card':
                return (
                    <div className="flex justify-center p-8">
                        <TiltCard className="max-w-sm">
                            <h3 className="text-2xl font-bold text-white mb-2">3D Tilt Effect</h3>
                            <p className="text-gray-300">Move your mouse over this card to see the 3D perspective effect in action.</p>
                        </TiltCard>
                    </div>
                )
            case 'spotlight-card':
                return (
                    <div className="flex justify-center p-8">
                        <SpotlightCard className="max-w-sm">
                            <h3 className="text-2xl font-bold text-white mb-2">Spotlight Reveal</h3>
                            <p className="text-gray-400">The border and background are revealed by a moving spotlight gradient matching your cursor.</p>
                        </SpotlightCard>
                    </div>
                )
            case 'liquid-button':
                return <div className="flex justify-center p-10"><LiquidButton text="Hover Me" /></div>
            case 'carousel-3d':
                return <div className="py-10"><Carousel3D /></div>
            case 'text-reveal':
                return <div className="bg-black p-8 rounded-xl"><TextReveal text="Cinematic Text Reveal Animation" className="text-3xl font-bold text-white" /></div>
            case 'particle-text':
                return <div className="bg-black rounded-xl overflow-hidden"><ParticleText text="DEVINNIT" colors={['#3b82f6', '#ec4899', '#ffffff']} /></div>
            case 'perspective-grid':
                return (
                    <div className="w-full h-[200px] relative overflow-hidden rounded-xl">
                        <PerspectiveGrid />
                    </div>
                )
            case 'gravity-zone':
                return (
                    <div className="w-full h-full min-h-[300px] relative overflow-hidden rounded-xl bg-slate-900">
                        <GravityZone />
                    </div>
                )
            case 'infinite-marquee':
                return (
                    <div className="w-full h-[200px] bg-black rounded-xl overflow-hidden flex items-center justify-center">
                        <div className="scale-50 origin-center w-full">
                            <InfiniteMarquee />
                        </div>
                    </div>
                )
            case 'helix-loader':
                return <HelixLoader />
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

            // New Cases Phase 2
            case 'magnetic-button-new':
                return <div className="flex justify-center p-8"><MagneticButtonNew>Physics</MagneticButtonNew></div>
            case 'gradient-border-button':
                return <div className="flex justify-center p-8"><GradientBorderButton text="Gradient" /></div>
            case 'liquid-blob-button':
                return <div className="flex justify-center p-8"><LiquidBlobButton text="Gooey" /></div>
            case 'neu-button':
                return <div className="flex justify-center p-8"><NeuButton>Soft UI</NeuButton></div>
            case 'cyber-button':
                return <div className="flex justify-center p-8"><CyberButton text="CYBER" /></div>

            case 'parallax-card':
                return <div className="flex justify-center p-8"><ParallaxCard><h3 className="text-xl font-bold text-white">Parallax</h3></ParallaxCard></div>
            case 'flip-card':
                return <div className="flex justify-center p-8 h-80"><FlipCard frontContent={<span>Front</span>} backContent={<span>Back</span>} /></div>
            case 'glass-stack-card':
                return <div className="flex justify-center p-8"><GlassStackCard><h3 className="text-xl font-bold">Glass Stack</h3></GlassStackCard></div>
            case 'neon-border-card':
                return <div className="flex justify-center p-8"><NeonBorderCard><h3 className="text-xl font-bold">Neon</h3></NeonBorderCard></div>
            case 'pattern-reveal-card':
                return <div className="flex justify-center p-8"><PatternRevealCard /></div>

            case 'pulse-badge':
                return <div className="flex justify-center p-8"><PulseBadge>Live</PulseBadge></div>
            case 'gradient-badge-new':
                return <div className="flex justify-center p-8"><GradientBadge text="New" /></div>
            case 'glitch-badge':
                return <div className="flex justify-center p-8"><GlitchBadge text="ERROR" /></div>
            case 'outline-glow-badge':
                return <div className="flex justify-center p-8"><OutlineGlowBadge text="Glow" /></div>
            case 'status-dot-badge':
                return <div className="flex justify-center p-8 gap-2"><StatusDotBadge status="online" /><StatusDotBadge status="busy" /></div>

            case 'floating-label-input':
                return <div className="flex justify-center p-8 w-64"><FloatingLabelInput label="Username" /></div>
            case 'spotlight-input':
                return <div className="flex justify-center p-8 w-64"><SpotlightInput placeholder="Spotlight..." /></div>
            case 'shake-error-input':
                return <div className="flex justify-center p-8 w-64"><ShakeOnErrorInput placeholder="Type 'error'..." /></div>
            case 'typewriter-input':
                return <div className="flex justify-center p-8 w-64"><TypewriterInput /></div>
            case 'material-input':
                return <div className="flex justify-center p-8 w-64"><MaterialInput /></div>

            case 'ping-indicator':
                return <div className="flex justify-center p-8"><PingIndicator /></div>
            case 'wave-indicator':
                return <div className="flex justify-center p-8"><WaveIndicator /></div>
            case 'status-ring':
                return <div className="flex justify-center p-8"><StatusRing /></div>
            case 'typing-dots':
                return <div className="flex justify-center p-8"><TypingDots /></div>
            case 'live-indicator':
                return <div className="flex justify-center p-8"><LiveIndicator /></div>

            case 'avatar-stack-new':
                return <div className="flex justify-center p-8"><AvatarStack images={['https://i.pravatar.cc/100?img=1', 'https://i.pravatar.cc/100?img=2', 'https://i.pravatar.cc/100?img=3']} /></div>
            case 'story-ring-avatar':
                return <div className="flex justify-center p-8"><StoryRingAvatar src="https://i.pravatar.cc/100?img=5" /></div>
            case 'tooltip-avatar':
                return <div className="flex justify-center p-8"><TooltipAvatar src="https://i.pravatar.cc/100?img=8" name="User" /></div>
            case 'hexagon-avatar':
                return <div className="flex justify-center p-8"><HexagonAvatar src="https://i.pravatar.cc/100?img=9" /></div>
            case 'online-badge-avatar':
                return <div className="flex justify-center p-8"><OnlineBadgeAvatar src="https://i.pravatar.cc/100?img=10" /></div>

            case 'circular-gradient':
                return <div className="flex justify-center p-8"><CircularGradient /></div>
            case 'liquid-progress':
                return <div className="flex justify-center p-8 w-64"><LiquidProgressBar /></div>
            case 'step-tracker':
                return <div className="flex justify-center p-8 w-64"><StepTracker /></div>
            case 'segmented-progress':
                return <div className="flex justify-center p-8 w-64"><SegmentedProgress /></div>
            case 'scrubber':
                return <div className="flex justify-center p-8 w-64"><Scrubber /></div>

            case 'stacked-toasts':
                return <div className="flex justify-center p-8"><StackedToasts /></div>
            case 'timer-toast':
                return <div className="flex justify-center p-8"><TimerToast /></div>
            case 'interactive-toast':
                return <div className="flex justify-center p-8"><InteractiveToast /></div>
            case 'glass-toast':
                return <div className="flex justify-center p-8"><GlassToast /></div>
            case 'action-toast':
                return <div className="flex justify-center p-8"><ActionToast /></div>

            case 'book-flip-3d':
                return <div className="flex justify-center p-8"><BookFlip3D /></div>
            case 'hover-perspective':
                return <div className="flex justify-center p-8"><HoverPerspective /></div>
            case 'interactive-particles':
                return <div className="flex justify-center p-8 w-full max-w-sm"><InteractiveParticles /></div>
            case 'cube-carousel':
                return <div className="flex justify-center p-8 h-48"><CubeCarousel /></div>
            case 'cube-carousel':
                return <div className="flex justify-center p-8 h-48"><CubeCarousel /></div>
            case 'distortion-image':
                return <div className="flex justify-center p-8"><DistortionImage /></div>
            case 'holographic-card':
                return <div className="flex justify-center p-8"><HolographicCard /></div>
            case 'floating-phone':
                return <div className="flex justify-center p-8"><FloatingPhone /></div>

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
