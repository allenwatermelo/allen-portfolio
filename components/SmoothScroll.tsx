"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lenis = new Lenis({
      anchors: { offset: -88 },
      autoRaf: true,
      lerp: window.innerWidth < 768 ? 0.14 : 0.1,
      respectReducedMotion: true,
      smoothWheel: true,
      syncTouch: false,
    });

    const updateScrollMotion = () => {
      if (reducedMotion.matches) return;

      const viewportCenter = window.innerHeight / 2;
      const viewportHeight = window.innerHeight;

      document.querySelectorAll<HTMLElement>("[data-scroll-motion]").forEach((element) => {
        const rect = element.getBoundingClientRect();
        const baseIntensity = Number(element.dataset.scrollIntensity ?? 14);
        const intensity = window.innerWidth < 768 ? baseIntensity * 0.55 : baseIntensity;
        const distance = (rect.top + rect.height / 2 - viewportCenter) / viewportHeight;
        const shift = Math.max(-intensity, Math.min(intensity, distance * -intensity));

        element.style.setProperty("--scroll-shift", `${shift.toFixed(2)}px`);
      });
    };

    const resetScrollMotion = () => {
      document.querySelectorAll<HTMLElement>("[data-scroll-motion]").forEach((element) => {
        element.style.setProperty("--scroll-shift", "0px");
      });
    };

    const handleMotionPreference = () => {
      if (reducedMotion.matches) {
        resetScrollMotion();
        return;
      }

      updateScrollMotion();
    };

    lenis.on("scroll", updateScrollMotion);
    window.addEventListener("resize", updateScrollMotion, { passive: true });
    reducedMotion.addEventListener("change", handleMotionPreference);
    handleMotionPreference();

    return () => {
      lenis.off("scroll", updateScrollMotion);
      lenis.destroy();
      window.removeEventListener("resize", updateScrollMotion);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return children;
}
