'use client';

import { useEffect, useRef, useState } from 'react';

interface ParticlesBgProps {
    type?: 'cobweb' | 'dots' | 'lines';
    bg?: boolean;
    num?: number;
    color?: string;
}

export default function ParticlesBg({
    type = 'cobweb',
    bg = true,
    num = 40,
    color = '#cccccc'
}: ParticlesBgProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        // Track mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Particle class
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            originalX: number;
            originalY: number;
            angle: number;
            frequency: number;
            amplitude: number;
            time: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.originalX = this.x;
                this.originalY = this.y;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 0.5;
                this.angle = Math.random() * Math.PI * 2;
                this.frequency = Math.random() * 0.05 + 0.02;
                this.amplitude = Math.random() * 30 + 20;
                this.time = Math.random() * Math.PI * 2;
            }

            update() {
                // Oscillating wave motion
                this.time += this.frequency;
                const waveX = Math.cos(this.time) * this.amplitude;
                const waveY = Math.sin(this.time * 0.7) * this.amplitude * 0.5;

                // Base movement
                this.x += this.vx + waveX * 0.01;
                this.y += this.vy + waveY * 0.01;

                // Subtle circular drift
                this.angle += 0.001;
                const driftX = Math.cos(this.angle) * 0.3;
                const driftY = Math.sin(this.angle) * 0.3;
                this.x += driftX;
                this.y += driftY;

                // Mouse repulsion effect
                const dx = this.x - mouseRef.current.x;
                const dy = this.y - mouseRef.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repulsionDistance = 150;

                if (distance < repulsionDistance) {
                    const angleToMouse = Math.atan2(dy, dx);
                    const repulsionForce = (repulsionDistance - distance) / repulsionDistance;
                    this.vx += Math.cos(angleToMouse) * repulsionForce * 1.5;
                    this.vy += Math.sin(angleToMouse) * repulsionForce * 1.5;
                }

                // Damping and friction
                this.vx *= 0.93;
                this.vy *= 0.93;

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles: Particle[] = [];
        for (let i = 0; i < num; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            // Draw connections for cobweb type
            if (type === 'cobweb') {
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 150) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            // Draw hover circle indicator
            ctx.strokeStyle = `${color}25`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.stroke();

            requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [type, num, color]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-screen"
            style={{ pointerEvents: 'none' }}
        />
    );
}