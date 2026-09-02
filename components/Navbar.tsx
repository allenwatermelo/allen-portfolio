"use client";

import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/Icons";
import { navLinks } from "@/lib/site";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--background)]/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Primary"
      >
        <a
          href="#home"
          className="text-[1.05rem] font-semibold tracking-tight text-[var(--ink)] transition-opacity duration-200 hover:opacity-70"
        >
          AJLagangga
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isHome = link.label === "Home";

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative pb-1 text-sm transition-colors duration-200 ${
                    isHome
                      ? "font-medium text-[var(--ink)] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-5 after:-translate-x-1/2 after:bg-[var(--ink)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="inline-flex rounded-md p-2 text-[var(--ink)] transition-colors duration-200 hover:bg-black/[0.04] md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <ul
          id="mobile-menu"
          className="space-y-1 border-t border-[var(--line)] px-5 py-3 md:hidden"
        >
          {navLinks.map((link) => {
            const isHome = link.label === "Home";

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-md px-2 py-2 text-sm transition-colors duration-200 ${
                    isHome
                      ? "font-medium text-[var(--ink)]"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </header>
  );
}
