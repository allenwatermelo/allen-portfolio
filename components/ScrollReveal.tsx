"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: "none" | "short" | "medium";
  staggerChildren?: boolean;
  intensity?: number;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = "none",
  staggerChildren = false,
  intensity = 14,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsAnimating(true);
        observer.disconnect();
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      data-scroll-motion
      data-scroll-intensity={intensity}
      className={`scroll-reveal scroll-reveal--${delay} ${staggerChildren ? "scroll-reveal--stagger" : ""} ${isAnimating ? "scroll-reveal--animate" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
