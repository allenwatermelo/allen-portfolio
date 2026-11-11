"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from "@/components/Icons";
import { navLinks } from "@/lib/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [activeHref, setActiveHref] = useState<string>("#home");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function onResize() {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const sections = navLinks.map((link) => ({
      href: link.href,
      element: document.getElementById(link.href.slice(1)),
    }));
    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const marker = Math.max(96, window.innerHeight * 0.25);
      let current: string = navLinks[0].href;

      for (const section of sections) {
        if (section.element && section.element.getBoundingClientRect().top <= marker) {
          current = section.href;
        }
      }

      // The last section may be too short to reach the viewport marker.
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = navLinks[navLinks.length - 1].href;
      }
      setActiveHref(current);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    }

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.body);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = !isDark;

    setIsDark(nextTheme);
    document.documentElement.classList.add("theme-transitioning");
    document.documentElement.classList.toggle("dark", nextTheme);
    window.setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 350);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--background)]/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl min-w-0 items-center justify-between gap-3 px-4 py-3.5 sm:px-8 sm:py-4"
        aria-label="Primary"
      >
        <a
          href="#home"
          className="shrink-0 text-[1.05rem] font-semibold tracking-tight text-[var(--ink)] transition-opacity duration-300 ease-out hover:opacity-70"
          onClick={() => setIsOpen(false)}
        >
          AJLagangga
        </a>

        <ul className="hidden items-center gap-6 lg:ml-auto lg:flex xl:gap-8">
          {navLinks.map((link) => {
            const isActive = link.href === activeHref;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`nav-link relative pb-1 text-sm transition-colors duration-300 ease-out ${
                    isActive
                      ? "nav-link-active font-medium text-[var(--ink)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-1 lg:ml-8">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-switch"
            role="switch"
            aria-checked={isDark}
            aria-label="Dark mode"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="theme-switch__track" aria-hidden="true">
              <span className="theme-switch__thumb" />
            </span>
            <span aria-hidden="true">
              {isDark ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
            </span>
          </button>
          <button
            type="button"
            className="inline-flex rounded-md p-2 text-[var(--ink)] transition-colors duration-300 ease-out hover:bg-[var(--surface-hover)] lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-nav lg:hidden ${isOpen ? "mobile-nav--open" : ""}`}
      >
        <div className="mobile-nav__inner">
          <ul className="space-y-1 px-5 py-3 sm:px-8">
            {navLinks.map((link) => {
              const isActive = link.href === activeHref;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-md px-2 py-2.5 text-sm transition-colors duration-300 ease-out ${
                      isActive
                        ? "bg-[var(--surface-hover)] font-medium text-[var(--ink)]"
                        : "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
