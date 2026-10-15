"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import EmailAutomationGraphic from "@/components/EmailAutomationGraphic";

const projectCategories = [
  "Content & Design",
  "Automation",
  "Data & Analytics",
  "Web Development",
  "Admin Support",
] as const;

type ProjectCategory = (typeof projectCategories)[number];

const retailProject = {
  filterCategory: "Data & Analytics" satisfies ProjectCategory,
  category: "Data Analysis",
  title: "Retail Sales & Customer Analytics Dashboard",
  image: "/images/projects/PROJECT_001.png",
  sheetUrl:
    "https://docs.google.com/spreadsheets/d/1fwCaFpUriPEOIVT16t6Yuw5UUcSneEgmHZ9mrlFRhgw/edit?usp=sharing",
};

const automationProject = {
  filterCategory: "Automation" satisfies ProjectCategory,
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

const pubmatProjects = [
  {
    filterCategory: "Content & Design" satisfies ProjectCategory,
    category: "Content & Design",
    title: "PubMat1",
    image: "/images/projects/PubMat1.jpg",
    description: "An informational poster outlining the five steps job fair applicants should follow, from registration and job shopping to verification, interviews, and evaluation.",
  },
  {
    filterCategory: "Content & Design" satisfies ProjectCategory,
    category: "Content & Design",
    title: "PubMat2",
    image: "/images/projects/PubMat2.jpg",
    description: "A recruitment graphic highlighting the locations where Savemore Market is seeking branches and applicants.",
  },
  {
    filterCategory: "Content & Design" satisfies ProjectCategory,
    category: "Content & Design",
    title: "PubMat3",
    image: "/images/projects/PubMat3.jpg",
    description: "A hiring announcement promoting upcoming job fair dates, times, and venues for Savemore Market.",
  },
];

const projects = [retailProject, automationProject, ...pubmatProjects];
type Project = (typeof projects)[number];

function isAutomationProject(project: Project): project is typeof automationProject {
  return project.filterCategory === "Automation";
}

type ModalState = "closed" | "opening" | "open" | "closing";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);
  const visibleProjects = selectedCategory
    ? projects.filter((project) => project.filterCategory === selectedCategory)
    : projects;
  const displayedProjects = visibleProjects.slice(0, 4);
  const hasMoreProjects = visibleProjects.length > 4;
  const galleryTitle = selectedCategory ?? "All Projects";
  const [project, setProject] = useState<Project>(retailProject);
  const [modalState, setModalState] = useState<ModalState>("closed");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const galleryDialogRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const selectedProjectRef = useRef(project);

  const moveProject = useCallback((direction: -1 | 1) => {
    const currentIndex = projects.findIndex((item) => item.image === selectedProjectRef.current.image);
    if (currentIndex < 0) return;

    const nextIndex = (currentIndex + direction + projects.length) % projects.length;
    const nextProject = projects[nextIndex];
    if (nextProject) {
      selectedProjectRef.current = nextProject;
      setProject(nextProject);
    }
  }, []);

  const isModalVisible = modalState !== "closed";
  const hasOverlayOpen = isModalVisible || isGalleryOpen;

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
    if (!hasOverlayOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isGalleryOpen) setIsGalleryOpen(false);
        else closeModal();
      } else if (isModalVisible && event.key === "ArrowLeft") {
        event.preventDefault();
        moveProject(-1);
      } else if (isModalVisible && event.key === "ArrowRight") {
        event.preventDefault();
        moveProject(1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => {
      if (isGalleryOpen) galleryDialogRef.current?.focus({ preventScroll: true });
      else dialogRef.current?.focus({ preventScroll: true });
    });

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, hasOverlayOpen, isGalleryOpen, isModalVisible, moveProject]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function openModal(selectedProject: Project) {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    selectedProjectRef.current = selectedProject;
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

        <div className="portfolio-project-filters" role="group" aria-label="Filter projects by category">
          <button
            type="button"
            className="portfolio-project-filter"
            aria-pressed={selectedCategory === null}
            aria-controls="project-results"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              className="portfolio-project-filter"
              aria-pressed={selectedCategory === category}
              aria-controls="project-results"
              onClick={() => setSelectedCategory((current) => current === category ? null : category)}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"} shown
          {selectedCategory ? ` in ${selectedCategory}.` : " across all categories."}
        </p>
        <div id="project-results" className={`portfolio-project-grid ${selectedCategory === null ? "portfolio-project-grid--all" : ""}`}>
        {visibleProjects.length === 0 && (
          <div className="portfolio-project-empty">
            <p>No projects in {selectedCategory} yet.</p>
            <button type="button" onClick={() => setSelectedCategory(null)}>View all projects <span aria-hidden="true">↗</span></button>
          </div>
        )}
        {displayedProjects.map((project) => (
        <button
          key={project.image}
          type="button"
          onClick={() => openModal(project)}
          className="portfolio-project portfolio-project--thumbnail group text-left"
          aria-haspopup="dialog"
          aria-label={project.filterCategory === "Content & Design" ? `View ${project.title} artwork` : `View ${project.title} details`}
        >
          <span className="portfolio-project__image portfolio-project__image--thumbnail relative block w-full overflow-hidden border-b border-[var(--line)] bg-[var(--surface)] aspect-square">
            {project === automationProject ? (
              <EmailAutomationGraphic className="transition-transform duration-[400ms] ease-out group-hover:scale-[1.025]" />
            ) : (
            <Image
              src={project.image}
              alt={project === retailProject ? "Retail sales and customer analytics dashboard preview" : project.title}
              fill
              sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) 512px, 480px"
              className="object-contain transition-transform duration-[400ms] ease-out group-hover:scale-[1.025]"
            />
            )}
          </span>
        </button>
        ))}
        </div>
        {hasMoreProjects ? (
          <button type="button" className="portfolio-project-view-all" onClick={() => setIsGalleryOpen(true)} aria-haspopup="dialog">
            View all <span aria-hidden="true">({visibleProjects.length})</span><span aria-hidden="true">↗</span>
          </button>
        ) : null}
      </ScrollReveal>

      {isGalleryOpen ? (
        <div className="project-gallery-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsGalleryOpen(false);
        }}>
          <div ref={galleryDialogRef} className="project-gallery-panel" role="dialog" aria-modal="true" aria-labelledby="project-gallery-title" tabIndex={-1}>
            <button type="button" className="project-gallery-close" onClick={() => setIsGalleryOpen(false)} aria-label="Close project gallery">×</button>
            <p className="project-gallery-eyebrow">Projects</p>
            <h2 id="project-gallery-title">{galleryTitle}</h2>
            <div className="project-gallery-grid">
              {visibleProjects.map((item) => (
                <button key={item.image} type="button" className="project-gallery-item" onClick={() => {
                  setIsGalleryOpen(false);
                  openModal(item);
                }} aria-label={`Open ${item.title}`}>
                  <span className="project-gallery-thumbnail">
                    {item === automationProject ? <EmailAutomationGraphic /> : <Image src={item.image} alt="" fill sizes="(max-width: 639px) 42vw, (max-width: 1023px) 28vw, 16rem" className="object-contain" />}
                  </span>
                  <span className="project-gallery-item-title">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

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
          <button type="button" className={`project-modal__nav project-modal__nav--previous ${project.filterCategory === "Content & Design" ? "project-modal__nav--artwork" : "project-modal__nav--details"}`} aria-label="Previous project" onClick={() => moveProject(-1)}>‹</button>
          <div
            ref={dialogRef}
            className={`project-modal__panel ${project.filterCategory === "Content & Design" ? "project-modal__panel--artwork" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={project.filterCategory === "Content & Design" ? undefined : "project-modal-title"}
            aria-label={project.filterCategory === "Content & Design" ? `${project.title} artwork` : undefined}
            tabIndex={-1}
          >
            <button
              type="button"
              onClick={closeModal}
              className={`project-modal__close ${project.filterCategory === "Content & Design" ? "project-modal__close--artwork" : ""}`}
              aria-label="Close project details"
            >
              x
            </button>

            <div className={`project-modal__content ${project.filterCategory === "Content & Design" ? "project-modal__content--artwork" : ""}`} tabIndex={0} role="region" aria-label={project.filterCategory === "Content & Design" ? "Artwork preview" : "Project content"}>
            {project.filterCategory === "Content & Design" ? (
              <div key={project.image} className="project-modal__artwork-frame">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 639px) calc(100vw - 8rem), 48rem" className="object-contain" priority />
              </div>
            ) : (
            <>
            <div className={`grid gap-8 md:gap-10 ${isAutomationProject(project) ? "" : "md:grid-cols-[minmax(0,1.2fr)_minmax(15rem,0.8fr)] md:items-center"}`}>
              <div className={`relative overflow-hidden rounded-md border border-[var(--line)] bg-[var(--surface)] ${isAutomationProject(project) ? "aspect-[1267/707]" : project.filterCategory === "Content & Design" ? "aspect-[4/5]" : "aspect-[16/10]"}`}>
                {project === automationProject ? (
                  <EmailAutomationGraphic />
                ) : (
                <Image
                  src={project.image}
                  alt={project === retailProject ? "Retail Sales and Customer Analytics Dashboard" : project.title}
                  fill
                  sizes={isAutomationProject(project) ? "(max-width: 639px) calc(100vw - 5.5rem), (max-width: 1127px) calc(100vw - 7rem), 1014px" : "(max-width: 767px) calc(100vw - 4rem), 52vw"}
                  className="object-contain"
                  priority
                />
                )}
              </div>

              <div className={isAutomationProject(project) ? "" : "md:py-6"}>
                <p className="text-[0.65rem] font-medium tracking-[0.22em] text-[var(--muted-soft)] uppercase">
                  {project.category}
                </p>
                <h2 id="project-modal-title" className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[var(--ink)] sm:text-3xl">
                  {project.title}
                </h2>
                {isAutomationProject(project) ? (
                  <>
                    <h3 className="mt-5 text-base font-semibold text-[var(--ink)]">Overview</h3>
                    <p className="mt-2 text-[0.96rem] leading-7 text-[var(--muted)]">{project.overview}</p>
                  </>
                ) : (
                  <>
                <p className="mt-5 text-[0.96rem] leading-7 text-[var(--muted)]">
                {"description" in project ? project.description : "Analyzed retail sales and customer data to identify trends, customer behavior, and key revenue drivers. Built an interactive dashboard with KPIs, visualizations, monthly summaries, and key insights to make the data easier to understand."}
                </p>
                {project === retailProject ? <p className="mt-5 text-xs leading-5 text-[var(--muted-soft)]">
                  Google Sheets <span aria-hidden="true">•</span> Data Analysis <span aria-hidden="true">•</span> Data Visualization
                </p> : null}
                {project === retailProject ? <a
                  href={project.sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-3 rounded-md bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--on-ink)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
                >
                  View in Google Sheet <span aria-hidden="true">-&gt;</span>
                </a> : null}
                  </>
                )}
              </div>
            </div>
            {isAutomationProject(project) ? (
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
            </>
            )}
            </div>
          </div>
          <button type="button" className={`project-modal__nav project-modal__nav--next ${project.filterCategory === "Content & Design" ? "project-modal__nav--artwork" : "project-modal__nav--details"}`} aria-label="Next project" onClick={() => moveProject(1)}>›</button>
        </div>
      ) : null}
    </section>
  );
}
