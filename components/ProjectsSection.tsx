"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import EmailAutomationGraphic from "@/components/EmailAutomationGraphic";

const retailProject = {
  category: "Data Analysis",
  title: "Retail Sales & Customer Analytics Dashboard",
  image: "/images/projects/PROJECT_001.png",
  sheetUrl:
    "https://docs.google.com/spreadsheets/d/1fwCaFpUriPEOIVT16t6Yuw5UUcSneEgmHZ9mrlFRhgw/edit?usp=sharing",
};

const automationProject = {
  category: "Automation Project",
  title: "AI-Powered Email Management Automation",
  image: "/images/projects/PROJECT_002.png",
  description: "An AI-powered n8n workflow that analyzes incoming Gmail messages, classifies and prioritizes them, logs structured data to Google Sheets, and creates draft replies when a response is needed.",
  overview: "Built a self-hosted n8n automation that monitors incoming Gmail messages and uses Google Gemini to classify emails, determine priority, identify companies, summarize requests, and generate suggested replies.",
  stack: ["n8n", "Google Gemini", "Gmail API", "Google Sheets", "Apps Script", "JavaScript", "Docker"],
  features: [
    "Automatically monitors incoming Gmail messages",
    "Uses Gemini AI to classify, prioritize, and summarize emails",
    "Extracts structured information such as sender, company, and category",
    "Logs analyzed emails into Google Sheets",
    "Automatically organizes emails into category-specific sheets",
    "Creates Gmail draft replies only when a response is needed",
    "Keeps the final send action under human review",
  ],
};

const projects = [retailProject, automationProject];

type ModalState = "closed" | "opening" | "open" | "closing";

export default function ProjectsSection() {
  const [project, setProject] = useState<(typeof projects)[number]>(retailProject);
  const [modalState, setModalState] = useState<ModalState>("closed");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const isModalVisible = modalState !== "closed";

  const closeModal = useCallback(() => {
    setModalState((currentState) => {
      if (currentState === "closed" || currentState === "closing") {
        return currentState;
      }

      closeTimerRef.current = window.setTimeout(() => {
        setModalState("closed");
        closeTimerRef.current = null;
      }, 650);

      return "closing";
    });
  }, []);

  useEffect(() => {
    if (!isModalVisible) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => dialogRef.current?.focus({ preventScroll: true }));

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, isModalVisible]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function openModal(selectedProject: (typeof projects)[number]) {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setProject(selectedProject);
    setModalState("opening");
    window.requestAnimationFrame(() => setModalState("open"));
  }

  return (
    <section id="projects" className="border-t border-[var(--line)]">
      <ScrollReveal staggerChildren className="mx-auto max-w-6xl px-5 pt-8 pb-20 sm:px-8 md:pt-10 md:pb-24">
        <p className="text-[0.7rem] font-medium tracking-[0.22em] text-[var(--muted-soft)] uppercase">
          Projects
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)]">Selected work</h2>
        <div className="mt-4 h-px w-10 bg-[var(--line-strong)]" aria-hidden="true" />

        {projects.map((project) => (
        <button
          key={project.image}
          type="button"
          onClick={() => openModal(project)}
          className="group mt-10 flex w-full max-w-5xl flex-col items-start gap-6 text-left lg:flex-row lg:items-center lg:gap-10"
          aria-haspopup="dialog"
          aria-label={`View ${project.title} details`}
        >
          <span className="relative block aspect-[16/10] w-full max-w-[32rem] shrink-0 overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--surface)] lg:w-[30rem]">
            {project === automationProject ? (
              <EmailAutomationGraphic className="transition-transform duration-[400ms] ease-out group-hover:scale-[1.025]" />
            ) : (
            <Image
              src={project.image}
              alt={project === retailProject ? "Retail sales and customer analytics dashboard preview" : "AI email management automation with n8n, Gemini, Gmail, and Google Sheets"}
              fill
              sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) 512px, 480px"
              className="object-contain transition-transform duration-[400ms] ease-out group-hover:scale-[1.025]"
            />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.65rem] font-medium tracking-[0.2em] text-[var(--muted-soft)] uppercase">
              {project.category}
            </span>
            <span className="mt-2 flex items-start justify-between gap-5 text-base font-semibold leading-6 text-[var(--ink)] sm:text-lg">
              <span className="transition-opacity duration-[400ms] ease-out group-hover:opacity-65">{project.title}</span>
              <span className="shrink-0 text-lg font-normal text-[var(--muted)] transition-transform duration-[400ms] ease-out group-hover:translate-x-1 group-hover:text-[var(--ink)]" aria-hidden="true">
                ↗
              </span>
            </span>
            {"description" in project ? (
              <>
                <span className="mt-5 block text-[0.96rem] leading-7 text-[var(--muted)]">{project.description}</span>
                <span className="mt-5 block text-xs leading-5 text-[var(--muted-soft)]">{project.stack.join(" · ")}</span>
              </>
            ) : null}
          </span>
        </button>
        ))}
      </ScrollReveal>

      {isModalVisible ? (
        <div
          className={`project-modal project-modal--${modalState}`}
          data-lenis-prevent
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            ref={dialogRef}
            className="project-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
          >
            <button
              type="button"
              onClick={closeModal}
              className="project-modal__close"
              aria-label="Close project details"
            >
              x
            </button>

            <div className="project-modal__content" tabIndex={0} role="region" aria-label="Project content">
            <div className={`grid gap-8 md:gap-10 ${"overview" in project ? "" : "md:grid-cols-[minmax(0,1.2fr)_minmax(15rem,0.8fr)] md:items-center"}`}>
              <div className={`relative overflow-hidden rounded-md border border-[var(--line)] bg-[var(--surface)] ${"overview" in project ? "aspect-[1267/707]" : "aspect-[16/10]"}`}>
                {project === automationProject ? (
                  <EmailAutomationGraphic />
                ) : (
                <Image
                  src={project.image}
                  alt={project === retailProject ? "Retail Sales and Customer Analytics Dashboard" : project.title}
                  fill
                  sizes={"overview" in project ? "(max-width: 639px) calc(100vw - 5.5rem), (max-width: 1127px) calc(100vw - 7rem), 1014px" : "(max-width: 767px) calc(100vw - 4rem), 52vw"}
                  className="object-contain"
                  priority
                />
                )}
              </div>

              <div className={"overview" in project ? "" : "md:py-6"}>
                <p className="text-[0.65rem] font-medium tracking-[0.22em] text-[var(--muted-soft)] uppercase">
                  {project.category}
                </p>
                <h2 id="project-modal-title" className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[var(--ink)] sm:text-3xl">
                  {project.title}
                </h2>
                {"overview" in project ? (
                  <>
                    <h3 className="mt-5 text-base font-semibold text-[var(--ink)]">Overview</h3>
                    <p className="mt-2 text-[0.96rem] leading-7 text-[var(--muted)]">{project.overview}</p>
                  </>
                ) : (
                  <>
                <p className="mt-5 text-[0.96rem] leading-7 text-[var(--muted)]">
                  Analyzed retail sales and customer data to identify trends, customer behavior, and key revenue drivers. Built an interactive dashboard with KPIs, visualizations, monthly summaries, and key insights to make the data easier to understand.
                </p>
                <p className="mt-5 text-xs leading-5 text-[var(--muted-soft)]">
                  Google Sheets <span aria-hidden="true">•</span> Data Analysis <span aria-hidden="true">•</span> Data Visualization
                </p>
                <a
                  href={project.sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-3 rounded-md bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--on-ink)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
                >
                  View in Google Sheet <span aria-hidden="true">-&gt;</span>
                </a>
                  </>
                )}
              </div>
            </div>
            {"overview" in project ? (
              <div className="mt-8 border-t border-[var(--line)] pt-6">
                <h3 className="text-base font-semibold text-[var(--ink)]">Key Features</h3>
                <ul className="mt-3 grid list-disc gap-x-10 gap-y-2 pl-5 text-sm leading-6 text-[var(--muted)] md:grid-cols-2">
                  {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <div className="mt-6 border-t border-[var(--line)] pt-5">
                  <h3 className="text-base font-semibold text-[var(--ink)]">Tech Stack</h3>
                  <p className="mt-2 text-xs leading-5 text-[var(--muted-soft)]">{project.stack.join(" · ")}</p>
                </div>
              </div>
            ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
