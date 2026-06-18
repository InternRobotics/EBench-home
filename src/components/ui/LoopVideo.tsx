import { useEffect, useRef } from "react";
import { asset } from "../../lib/asset";

interface LoopVideoProps {
  /** path relative to public root, e.g. "videos/bottle_top.mp4" */
  src: string;
  className?: string;
  rate?: number;
  rootMargin?: string;
}

/**
 * A muted, looping video that only fetches + plays while near the viewport.
 * Mirrors the lazy IntersectionObserver pattern from the original showcase.
 */
export function LoopVideo({ src, className, rate = 2.4, rootMargin = "350px 0px" }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.preload === "none") v.preload = "auto";
          v.playbackRate = rate;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin, threshold: 0.05 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [rate, rootMargin]);

  return (
    <video
      ref={ref}
      src={asset(src)}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
