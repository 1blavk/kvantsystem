import { useEffect, useRef, useState } from "react";
import { Loader } from "lucide-react";

export default function LazyImage({
    src,
    alt = "",
    width = "100%",
    height = "auto",
    className = "",
    loaderColor = "#999",
    loaderSize = 22,
    style = {},
}) {
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
            style={{ width, height, ...style }}
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

                    <img
                        src={src}
                        alt={alt}
                        onLoad={() => setLoaded(true)}
                        onError={() => setLoaded(true)}
                        style={{ width: "100%", height: "100%" }}
                        className={`rounded-lg transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"
                            }`}
                    />
                </>
            )}
        </div>
    );
}
