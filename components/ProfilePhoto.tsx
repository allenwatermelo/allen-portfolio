"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photo = "/images/profile/allen-jean-dark-hair.png";

export default function ProfilePhoto() {
  const [isOpen, setIsOpen] = useState(false);
  const [isIntro, setIsIntro] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const destinationRef = useRef<string | null>(null);

  function openViewer() {
    setIsIntro(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsOpen(true);
  }

  useEffect(() => {
    if (!isOpen || !isIntro) return;
    const timer = window.setTimeout(() => setIsIntro(false), 1550);
    return () => window.clearTimeout(timer);
  }, [isOpen, isIntro]);

  function visitSection(id: string) {
    destinationRef.current = id;
    dialogRef.current?.close();
  }

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      const destination = destinationRef.current;
      destinationRef.current = null;
      if (destination) {
        window.requestAnimationFrame(() => document.getElementById(destination)?.scrollIntoView());
      }
    };
  }, [isOpen]);

  return (
    <>
      <button type="button" className="portfolio-portrait__image portrait-trigger" aria-label="Enlarge portrait of Allen Jean Lagangga" aria-haspopup="dialog" onClick={openViewer}>
        <Image src={photo} alt="Portrait of Allen Jean Lagangga" width={1545} height={1999} priority unoptimized className="relative z-10 h-auto w-full object-contain" />
        <span className="portrait-trigger__zoom" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="10" r="6.5" />
            <path d="m15 15 5 5M7 10h6M10 7v6" />
          </svg>
          <span>Zoom in</span>
        </span>
      </button>
      <dialog ref={dialogRef} className="portrait-viewer" aria-label="Portrait of Allen Jean Lagangga" data-lenis-prevent onClose={() => setIsOpen(false)} onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}>
        {isOpen && (
          <>
            {isIntro ? (
              <div className="portrait-intro">
                <button type="button" className="portrait-viewer__close" aria-label="Close photo viewer" onClick={() => dialogRef.current?.close()} autoFocus>×</button>
                <div className="portrait-intro__sequence" aria-hidden="true">
                  <span className="portrait-intro__word portrait-intro__word--one"><small>PLAYER ONE</small>HIRE ME!</span>
                  <span className="portrait-intro__word portrait-intro__word--two"><small>A NEW COLLABORATION</small>LET’S BUILD!</span>
                  <span className="portrait-intro__word portrait-intro__word--three"><small>READY WHEN YOU ARE</small>LET’S GO!</span>
                </div>
                <span className="sr-only">Introducing Allen</span>
                <div className="portrait-intro__loading" aria-hidden="true"><span /></div>
              </div>
            ) : (
            <div className="portrait-viewer__frame">
              <button type="button" className="portrait-viewer__close" aria-label="Close photo viewer" onClick={() => dialogRef.current?.close()} autoFocus>×</button>
              <Image src={photo} alt="Enlarged portrait of Allen Jean Lagangga" width={1545} height={1999} unoptimized className="portrait-viewer__photo" />
              <p className="portrait-player-status">
                <span className="portrait-player-status__dot" aria-hidden="true" />
                <span className="portrait-player-status__text">Ready to collaborate</span>
              </p>
              <div className="portrait-side-tag portrait-side-tag--hire">
                <button type="button" onClick={() => visitSection("contact")}>
                  <span className="portrait-side-tag__icon" aria-hidden="true">+</span>
                  <span>Hire me<span className="portrait-side-tag__detail">Let’s team up</span></span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
              <div className="portrait-side-tag portrait-side-tag--build">
                <button type="button" onClick={() => visitSection("projects")}>
                  <span className="portrait-side-tag__icon" aria-hidden="true">✧</span>
                  <span>Let’s build<span className="portrait-side-tag__detail">Explore my work</span></span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
              <div className="portrait-viewer__greeting">
                <div className="portrait-greeting-float">
                  <p className="portrait-greeting" aria-label="Hi, I’m Allen!">
                    <span className="portrait-greeting__wave" aria-hidden="true">+</span>
                    <span className="portrait-greeting__words" aria-hidden="true">
                      <span>Hi,</span>{" "}<span>I’m</span>{" "}<span className="portrait-greeting__name">Allen!</span>
                    </span>
                    <span className="portrait-greeting__spark" aria-hidden="true">✧</span>
                  </p>
                </div>
              </div>
            </div>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
