
export const formatCurrency = (amount: number, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount)
}

export const randomGradient = () => {
    const colors = [
        '#ff7b00', '#ec4899', '#8b5cf6', '#06b6d4',
        '#10b981', '#f59e0b', '#ef4444', '#3b82f6'
    ]
    const c1 = colors[Math.floor(Math.random() * colors.length)]
    const c2 = colors[Math.floor(Math.random() * colors.length)]
    const angle = Math.floor(Math.random() * 360)
    return `linear-gradient(${angle}deg, ${c1}, ${c2})`
}

export const shimmerEffect = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .animate-shimmer {
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
`

export const glassStyle = (opacity = 10, blur = 10) => ({
    background: `rgba(255, 255, 255, ${opacity / 100})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
})

export const noiseOverlay = `
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
`
