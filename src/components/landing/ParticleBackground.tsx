'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
}

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animationRef = useRef<number>(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const initParticles = () => {
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
            particlesRef.current = Array.from({ length: particleCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            }))
        }

        const drawParticle = (p: Particle) => {
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 94, 0, ${p.opacity})`
            ctx.fill()
        }

        const drawConnections = () => {
            const particles = particlesRef.current
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 120) {
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(255, 94, 0, ${0.15 * (1 - dist / 120)})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }
        }

        const updateParticles = () => {
            particlesRef.current.forEach((p) => {
                p.x += p.vx
                p.y += p.vy

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1
            })
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            updateParticles()
            drawConnections()
            particlesRef.current.forEach(drawParticle)

            animationRef.current = requestAnimationFrame(animate)
        }

        resizeCanvas()
        initParticles()
        animate()

        window.addEventListener('resize', () => {
            resizeCanvas()
            initParticles()
        })

        return () => {
            cancelAnimationFrame(animationRef.current)
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return (
        <motion.canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        />
    )
}
