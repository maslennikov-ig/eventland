'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg)');
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        setGlarePosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    const handleMouseLeave = () => {
        setTransform('perspective(800px) rotateX(0deg) rotateY(0deg)');
        setIsHovering(false);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    // Check for prefers-reduced-motion (SSR safe)
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden transition-transform duration-200 ease-out ${className}`}
            style={{
                transform: prefersReducedMotion ? undefined : transform,
                willChange: 'transform',
            }}
            onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            {children}
            {/* Glare overlay */}
            <div
                className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
                style={{
                    opacity: isHovering && !prefersReducedMotion ? 0.15 : 0,
                    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                }}
            />
        </div>
    );
}
