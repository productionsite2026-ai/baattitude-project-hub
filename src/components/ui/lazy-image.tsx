import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  placeholderSrc?: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * LazyImage Component - Optimized for Core Web Vitals
 * 
 * - Explicit width/height to prevent CLS
 * - Lazy loading for below-the-fold images
 * - Priority mode for above-the-fold images
 * - Intersection Observer for performance
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  placeholderSrc,
  className,
  wrapperClassName,
  priority = false,
  sizes,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Priority images don't need intersection observer
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const aspectStyle = width && height 
    ? { aspectRatio: `${width}/${height}` }
    : undefined;

  return (
    <div 
      className={cn("relative overflow-hidden", wrapperClassName)}
      style={aspectStyle}
    >
      {/* Placeholder skeleton */}
      <div
        className={cn(
          "absolute inset-0 bg-muted transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100 animate-pulse"
        )}
        aria-hidden="true"
      />
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? src : placeholderSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        {...props}
      />
    </div>
  );
}
