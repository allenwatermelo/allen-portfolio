"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const email = "allenjean.lagangga17@gmail.com";
const emailHref = `mailto:${email}?subject=Portfolio%20inquiry`;

export default function ContactSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDialogOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDialogOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDialogOpen]);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const senderEmail = String(formData.get("senderEmail") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const body = `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsDialogOpen(false);
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--line)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_54%_70%_at_79%_39%,rgba(207,190,241,0.58),transparent_73%),radial-gradient(ellipse_43%_56%_at_38%_54%,rgba(245,202,174,0.48),transparent_73%),radial-gradient(ellipse_64%_58%_at_57%_76%,rgba(244,220,207,0.34),transparent_77%)] dark:bg-[radial-gradient(ellipse_54%_70%_at_79%_39%,rgba(125,110,179,0.31),transparent_73%),radial-gradient(ellipse_43%_56%_at_38%_54%,rgba(171,110,88,0.25),transparent_73%),radial-gradient(ellipse_64%_58%_at_57%_76%,rgba(93,82,127,0.18),transparent_77%)]" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <ScrollReveal>
            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-[var(--muted-soft)] uppercase">
              Contact
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-[-0.045em] text-[var(--ink)] sm:text-5xl sm:leading-[1.08]">
              Let&apos;s create something worth talking about.
            </h2>
            <div className="mt-4 h-px w-10 bg-[var(--line-strong)]" aria-hidden="true" />
            <p className="mt-6 max-w-sm text-[0.98rem] leading-7 text-[var(--muted)]">
              Have an opportunity, project, collaboration, or idea in mind? I&apos;d love to hear from you.
            </p>
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="mt-7 inline-flex items-center gap-6 rounded-md bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--on-ink)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
            >
              Get in touch <span aria-hidden="true">-&gt;</span>
            </button>
          </ScrollReveal>

          <ScrollReveal delay="short">
            <div className="divide-y divide-[var(--line)]">
              <a
                href={emailHref}
                className="group flex items-center justify-between gap-5 pb-6 transition-opacity duration-300 hover:opacity-65"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[var(--ink)]">Email</span>
                  <span className="mt-1 block break-all text-sm text-[var(--muted)]">{email}</span>
                </span>
                <span className="shrink-0 text-base text-[var(--ink)]" aria-hidden="true">-&gt;</span>
              </a>

              <div className="py-6">
                <h3 className="text-sm font-semibold text-[var(--ink)]">Location</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">Davao Oriental, Philippines</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-24 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)] sm:mt-28 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-[var(--ink)]">AJLagangga</p>
          <p>Copyright {new Date().getFullYear()} Allen Jean Lagangga</p>
        </div>
      </div>

      {isDialogOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsDialogOpen(false);
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            tabIndex={-1}
            className="w-full max-w-md rounded-2xl border border-[var(--line)] bg-[var(--background)] p-6 shadow-2xl outline-none sm:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[0.65rem] font-medium tracking-[0.24em] text-[var(--muted-soft)] uppercase">Get in touch</p>
                <h2 id="contact-dialog-title" className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)]">
                  Send me a message
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="-mr-2 -mt-2 grid h-9 w-9 place-items-center rounded-full text-lg text-[var(--muted)] transition-colors duration-300 hover:bg-[var(--surface-hover)] hover:text-[var(--ink)]"
                aria-label="Close contact form"
              >
                x
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Share a few details and your email app will open with a message ready to send.
            </p>

            <form className="mt-6 space-y-3" onSubmit={submitMessage}>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="sr-only" htmlFor="contact-name">Your name</label>
                <input id="contact-name" name="name" required placeholder="Your name" className="contact-field" />
                <label className="sr-only" htmlFor="contact-email">Your email address</label>
                <input id="contact-email" name="senderEmail" type="email" required placeholder="Your email address" className="contact-field" />
              </div>
              <label className="sr-only" htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" name="subject" required placeholder="Subject" className="contact-field" />
              <label className="sr-only" htmlFor="contact-message">Your message</label>
              <textarea id="contact-message" name="message" required placeholder="Your message" rows={5} className="contact-field resize-y" />
              <button type="submit" className="flex w-full items-center justify-center gap-4 rounded-md bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--on-ink)] transition-transform duration-300 ease-out hover:-translate-y-0.5">
                Send message <span aria-hidden="true">-&gt;</span>
              </button>
            </form>

            <p className="mt-5 text-center text-xs leading-5 text-[var(--muted-soft)]">
              Your information is used only to prepare this email message.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
