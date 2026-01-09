'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Ball {
    id: number
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    color: string
}

export function GravityZone() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [balls, setBalls] = useState<Ball[]>([])
    const requestRef = useRef<number | undefined>(undefined)

    useEffect(() => {
        // Initialize balls
        const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
        const initialBalls = Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            x: Math.random() * 300 + 50,
            y: Math.random() * 200 + 50,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            radius: Math.random() * 15 + 10,
            color: colors[i % colors.length],
        }))
        setBalls(initialBalls)
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        setBalls((prevBalls) =>
            prevBalls.map((ball) => {
                const dx = mouseX - ball.x
                const dy = mouseY - ball.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const force = 1000 / (distance * distance + 100) // Attraction force

                return {
                    ...ball,
                    vx: ball.vx + (dx / distance) * force,
                    vy: ball.vy + (dy / distance) * force,
                }
            })
        )
    }

    useEffect(() => {
        const update = () => {
            if (!containerRef.current) return
            const { width, height } = containerRef.current.getBoundingClientRect()

            setBalls((prevBalls) =>
                prevBalls.map((ball) => {
                    let nextX = ball.x + ball.vx
                    let nextY = ball.y + ball.vy
                    let nextVx = ball.vx * 0.98 // Friction
                    let nextVy = ball.vy * 0.98

                    // Bounds checking
                    if (nextX - ball.radius < 0) {
                        nextX = ball.radius
                        nextVx *= -0.8
                    } else if (nextX + ball.radius > width) {
                        nextX = width - ball.radius
                        nextVx *= -0.8
                    }

                    if (nextY - ball.radius < 0) {
                        nextY = ball.radius
                        nextVy *= -0.8
                    } else if (nextY + ball.radius > height) {
                        nextY = height - ball.radius
                        nextVy *= -0.8
                    }

                    return { ...ball, x: nextX, y: nextY, vx: nextVx, vy: nextVy }
                })
            )
            requestRef.current = requestAnimationFrame(update)
        }

        requestRef.current = requestAnimationFrame(update)
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[400px] bg-slate-900 overflow-hidden rounded-xl border border-slate-700 cursor-crosshair"
        >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <p className="text-white text-xl">Move mouse to attract</p>
            </div>
            {balls.map((ball) => (
                <div
                    key={ball.id}
                    className="absolute rounded-full shadow-lg"
                    style={{
                        left: ball.x - ball.radius,
                        top: ball.y - ball.radius,
                        width: ball.radius * 2,
                        height: ball.radius * 2,
                        backgroundColor: ball.color,
                        boxShadow: `0 0 10px ${ball.color}`,
                    }}
                />
            ))}
        </div>
    )
}
