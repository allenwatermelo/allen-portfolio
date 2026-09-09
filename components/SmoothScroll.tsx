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
      prevent: (node) => node.closest('[role="dialog"]') !== null,
    });

    const motionElements = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-motion]"));
    // Modal overflow locks must also stop Lenis's in-flight scroll animation.
    const syncScrollLock = () => {
      const locked = document.documentElement.style.overflow === "hidden" || document.body.style.overflow === "hidden";
      if (locked && !lenis.isStopped) lenis.stop();
      else if (!locked && lenis.isStopped) lenis.start();
    };
    const scrollLockObserver = new MutationObserver(syncScrollLock);
    scrollLockObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    scrollLockObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    syncScrollLock();
    let layout: { element: HTMLElement; center: number; intensity: number }[] = [];

    const measureLayout = () => {
      layout = motionElements.map((element) => {
        // Layout offsets exclude transforms, so parallax cannot feed back into itself.
        let top = 0;
        let ancestor: HTMLElement | null = element;
        while (ancestor) {
          top += ancestor.offsetTop;
          ancestor = ancestor.offsetParent as HTMLElement | null;
        }
        const baseIntensity = Number(element.dataset.scrollIntensity ?? 14);
        return {
          element,
          center: top + element.offsetHeight / 2,
          intensity: window.innerWidth < 768 ? baseIntensity * 0.55 : baseIntensity,
        };
      });
    };

    const updateScrollMotion = () => {
      if (reducedMotion.matches) return;

      const viewportCenter = window.innerHeight / 2;
      const viewportHeight = window.innerHeight;

      layout.forEach(({ element, center, intensity }) => {
        const distance = (center - window.scrollY - viewportCenter) / viewportHeight;
        const shift = Math.max(-intensity, Math.min(intensity, distance * -intensity));

        element.style.setProperty("--scroll-shift", `${shift.toFixed(2)}px`);
      });
    };

    const resetScrollMotion = () => {
      motionElements.forEach((element) => {
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

    const handleResize = () => {
      measureLayout();
      handleMotionPreference();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);
    motionElements.forEach((element) => resizeObserver.observe(element));

    lenis.on("scroll", updateScrollMotion);
    window.addEventListener("resize", handleResize, { passive: true });
    reducedMotion.addEventListener("change", handleMotionPreference);
    handleResize();

    return () => {
      lenis.off("scroll", updateScrollMotion);
      scrollLockObserver.disconnect();
      lenis.destroy();
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return children;
}
