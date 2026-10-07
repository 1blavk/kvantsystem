'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TeamScrollGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = gridRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const cards = el.children;
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      ScrollTrigger.refresh();
    }, gridRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div
      ref={gridRef}
      className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 grid-cols-2 md:gap-8 gap-4 mt-12"
    >
      {children}
    </div>
  );
}
