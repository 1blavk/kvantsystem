'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface GsapScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale-up' | 'stagger-cards';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export default function GsapScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.9,
  distance = 40,
  className = '',
}: GsapScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (animation === 'stagger-cards') {
        const cards = el.children;
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: distance,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else {
        const fromVars: gsap.TweenVars = { opacity: 0 };

        if (animation === 'fade-up') {
          fromVars.y = distance;
        } else if (animation === 'fade-left') {
          fromVars.x = distance;
        } else if (animation === 'fade-right') {
          fromVars.x = -distance;
        } else if (animation === 'scale-up') {
          fromVars.scale = 0.92;
          fromVars.y = distance / 2;
        }

        gsap.fromTo(
          el,
          fromVars,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      ScrollTrigger.refresh();
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [animation, delay, duration, distance, pathname]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
