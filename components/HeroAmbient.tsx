"use client";

import { useEffect, useRef } from "react";

export default function HeroAmbient() {
  const ambientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ambient = ambientRef.current;
    const hero = ambient?.closest<HTMLElement>("#home");

    if (!ambient || !hero) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let isTracking = false;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;

    const render = () => {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;
      ambient.style.setProperty("--ambient-x", `${currentX.toFixed(2)}%`);
      ambient.style.setProperty("--ambient-y", `${currentY.toFixed(2)}%`);

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        frameId = window.requestAnimationFrame(render);
      } else {
        frameId = 0;
      }
    };

    const requestRender = () => {
      if (!frameId) frameId = window.requestAnimationFrame(render);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      targetX = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      targetY = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
      requestRender();
    };

    const handlePointerLeave = () => {
      targetX = 50;
      targetY = 50;
      requestRender();
    };

    const stopTracking = () => {
      if (!isTracking) return;

      isTracking = false;
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      ambient.style.removeProperty("--ambient-x");
      ambient.style.removeProperty("--ambient-y");
    };

    const startTracking = () => {
      if (isTracking || !finePointer.matches || reducedMotion.matches) return;

      isTracking = true;
      hero.addEventListener("pointermove", handlePointerMove, { passive: true });
      hero.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    };

    const updateTracking = () => {
      stopTracking();
      startTracking();
    };

    updateTracking();
    finePointer.addEventListener("change", updateTracking);
    reducedMotion.addEventListener("change", updateTracking);

    return () => {
      stopTracking();
      finePointer.removeEventListener("change", updateTracking);
      reducedMotion.removeEventListener("change", updateTracking);
    };
  }, []);

  return (
    <div className="hero-ambient-wrap" aria-hidden="true">
      <div ref={ambientRef} className="hero-ambient" />
    </div>
  );
}
