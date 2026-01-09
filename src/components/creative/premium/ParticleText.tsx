'use client'

import React, { useRef, useEffect, useState } from 'react'

interface ParticleTextProps {
    text: string
    className?: string
    colors?: string[]
}

export function ParticleText({ text, className = '', colors = ['#fff', '#ccc', '#888'] }: ParticleTextProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []

        const width = canvas.width
        const height = canvas.height

        class Particle {
            x: number
            y: number
            originX: number
            originY: number
            color: string
            size: number
            vx: number
            vy: number
            force: number
            angle: number
            distance: number
            friction: number
            ease: number

            constructor(x: number, y: number) {
                this.x = x
                this.y = y
                this.originX = x
                this.originY = y
                this.color = colors[Math.floor(Math.random() * colors.length)]
                this.size = Math.random() * 2 + 1
                this.vx = 0
                this.vy = 0
                this.force = 0
                this.angle = 0
                this.distance = 0
                this.friction = 0.98
                this.ease = 0.1
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, this.size, this.size)
            }

            update(mouse: { x: number; y: number; radius: number }) {
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                this.distance = dx * dx + dy * dy
                this.force = -mouse.radius / this.distance

                if (this.distance < mouse.radius) {
                    this.angle = Math.atan2(dy, dx)
                    this.vx += this.force * Math.cos(this.angle)
                    this.vy += this.force * Math.sin(this.angle)
                }

                this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease
                this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease
            }
        }

        const init = () => {
            particles = []
            ctx.clearRect(0, 0, width, height)
            ctx.fillStyle = 'white'
            ctx.font = 'bold 80px Verdana'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(text, width / 2, height / 2)

            const pixels = ctx.getImageData(0, 0, width, height).data
            ctx.clearRect(0, 0, width, height)

            for (let y = 0; y < height; y += 4) {
                for (let x = 0; x < width; x += 4) {
                    const index = (y * width + x) * 4
                    const alpha = pixels[index + 3]
                    if (alpha > 0) {
                        particles.push(new Particle(x, y))
                    }
                }
            }
        }

        const mouse = {
            x: 0,
            y: 0,
            radius: 3000,
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height)
            particles.forEach((particle) => {
                particle.draw()
                particle.update(mouse)
            })
            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
        }

        const handleMouseLeave = () => {
            mouse.x = 0
            mouse.y = 0
        }

        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            cancelAnimationFrame(animationFrameId)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [text, colors])

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={200}
            className={className}
        />
    )
}
