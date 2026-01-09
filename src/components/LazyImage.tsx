'use client';

import { useEffect, useRef, useState } from "react";
import { Loader } from "lucide-react";
import Image from "next/image";

type LazyImageProps = {
    src: string;
    alt?: string;
    w?: number;
    h?: number;
    className?: string;
    loaderColor?: string;
    loaderSize?: number;
    style?: React.CSSProperties;
};

export default function LazyImage({
    src,
    alt = "",
    w,
    h,
    className = "",
    loaderColor = "#999",
    loaderSize = 22,
    style = {},
}: LazyImageProps) {

    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    // Visibility observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ ...style }}
            className={`relative flex items-center justify-center rounded-lg ${className}`}
        >
            {/* Loader when not visible */}
            {!visible && (
                <Loader
                    className="animate-spin"
                    strokeWidth={2.25}
                    color={loaderColor}
                    size={loaderSize}
                />
            )}

            {/* Fade-in image */}
            {visible && (
                <>
                    {!loaded && (
                        <Loader
                            className="absolute animate-spin"
                            strokeWidth={2.25}
                            color={loaderColor}
                            size={loaderSize}
                        />
                    )}

                    <Image
                        loading="lazy"
                        src={src}
                        alt={alt}
                        onLoad={() => setLoaded(true)}
                        onError={() => setLoaded(true)}
                        width={w}
                        height={h}
                    />
                </>
            )}
        </div>
    );
}
