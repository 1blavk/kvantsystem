'use client'

import React, { useRef, useEffect, useState } from 'react'
import { ParticlesNotFoundProps } from './types';

const L404 = "M257.245 0H207.09L119.724 115.332H171.496L93.8376 217.668H145.61L232.976 100.712H182.822L257.245 0Z M155.317 0H103.545L0 131.576L53.3904 198.176L80.8947 165.688L53.3904 131.576L155.317 0Z";

export default function LOGO404() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const mousePositionRef = useRef({ x: 0, y: 0 })
    const isTouchingRef = useRef(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            setIsMobile(window.innerWidth < 768)
        }

        updateCanvasSize()

        let particles: ParticlesNotFoundProps[] = []
        let textImageData: ImageData | null = null

        /* ===================== LOGO IMAGE ===================== */

        function createTextImage() {
            if (!ctx || !canvas) return 1

            ctx.fillStyle = 'white'
            ctx.save()

            const logoHeight = isMobile ? 60 : 80
            const logoWidth = logoHeight * (253 / 140)

            ctx.translate(
                canvas.width / 2 - logoWidth / 2,
                canvas.height / 2 - logoHeight / 2
            )

            const scale = logoHeight / 140
            ctx.scale(scale, scale)

            ctx.fill(new Path2D(L404))
            ctx.restore()

            textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            return scale
        }

        /* ===================== PARTICLES ===================== */

        function createParticle(scale: number): ParticlesNotFoundProps | null {
            if (!textImageData || !canvas) return null

            const data = textImageData.data

            for (let attempt = 0; attempt < 100; attempt++) {
                const x = Math.floor(Math.random() * canvas.width)
                const y = Math.floor(Math.random() * canvas.height)

                if (data[(y * canvas.width + x) * 4 + 3] > 128) {
                    return {
                        x,
                        y,
                        baseX: x,
                        baseY: y,
                        size: Math.random() * 1 + 0.5,
                        color: '#ccc',
                        scatteredColor: '#01C38E',
                        life: Math.random() * 100 + 50
                    }
                }
            }
            return null
        }

        function createInitialParticles(scale: number) {
            if (!canvas) return

            const baseParticleCount = 5000
            const particleCount = Math.floor(
                baseParticleCount *
                Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
            )

            for (let i = 0; i < particleCount; i++) {
                const p = createParticle(scale)
                if (p) particles.push(p)
            }
        }

        /* ===================== ANIMATION ===================== */

        let animationFrameId = 0

        function animate(scale: number) {
            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const { x: mx, y: my } = mousePositionRef.current
            const maxDistance = 200

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]
                const dx = mx - p.x
                const dy = my - p.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < maxDistance && (isTouchingRef.current || !('ontouchstart' in window))) {
                    const force = (maxDistance - distance) / maxDistance
                    const angle = Math.atan2(dy, dx)
                    p.x = p.baseX - Math.cos(angle) * force * 60
                    p.y = p.baseY - Math.sin(angle) * force * 60
                    ctx.fillStyle = p.scatteredColor
                } else {
                    p.x += (p.baseX - p.x) * 0.1
                    p.y += (p.baseY - p.y) * 0.1
                    ctx.fillStyle = p.color
                }

                ctx.fillRect(p.x, p.y, p.size, p.size)

                p.life--
                if (p.life <= 0) {
                    const np = createParticle(scale)
                    if (np) particles[i] = np
                }
            }

            const targetCount = Math.floor(
                300 * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
            )

            while (particles.length < targetCount) {
                const np = createParticle(scale)
                if (np) particles.push(np)
            }

            animationFrameId = requestAnimationFrame(() => animate(scale))
        }

        /* ===================== EVENTS ===================== */

        const scale = createTextImage()
        createInitialParticles(scale)
        animate(scale)

        const handleResize = () => {
            updateCanvasSize()
            particles = []
            const newScale = createTextImage()
            createInitialParticles(newScale)
        }

        const handleMove = (x: number, y: number) => {
            mousePositionRef.current = { x, y }
        }

        canvas.addEventListener('mousemove', e => handleMove(e.clientX, e.clientY))
        canvas.addEventListener('mouseleave', () => handleMove(0, 0))

        canvas.addEventListener('touchstart', () => (isTouchingRef.current = true))
        canvas.addEventListener('touchend', () => {
            isTouchingRef.current = false
            handleMove(0, 0)
        })
        canvas.addEventListener(
            'touchmove',
            e => {
                e.preventDefault()
                if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY)
            },
            { passive: false }
        )

        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', handleResize)
        }
    }, [isMobile])

    return (
        <canvas
            ref={canvasRef}
            aria-label="KVANT-SYSTEM FOR 404 PAGE"
        />
    )
}
