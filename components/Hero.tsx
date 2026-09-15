import Image from "next/image";
import HeroAmbient from "@/components/HeroAmbient";
import SocialLinks from "@/components/SocialLinks";
import { resumePath } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="portfolio-hero relative isolate"
    >
      <HeroAmbient />

      <div className="portfolio-hero__copy relative z-10" data-scroll-motion data-scroll-intensity="4">
        <p className="portfolio-availability">
          <span aria-hidden="true" />
          Open for work
        </p>
        <p className="hero-sequence hero-sequence--label text-[0.7rem] font-medium tracking-[0.22em] text-[var(--muted-soft)] uppercase">
          Data · Automation · Digital solutions
        </p>
        <h1 className="hero-sequence hero-sequence--title mt-3 text-4xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
          Allen Jean Lagangga
        </h1>
        <p className="hero-sequence hero-sequence--role mt-3 text-lg text-[var(--muted)]">
          Junior Data Analyst | Administrative Support | Automation | Graphic Design
        </p>
        <div className="hero-sequence hero-sequence--divider mt-5 h-px w-10 bg-[var(--line-strong)]" aria-hidden="true" />
        <p className="hero-sequence hero-sequence--description mt-5 max-w-md text-[0.98rem] leading-7 text-[var(--muted)]">
          I organize data, streamline repetitive tasks, and create practical digital solutions, from data analysis and administrative workflows to automation and visual design.
        </p>

        <div className="hero-sequence hero-sequence--actions mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-md bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--on-ink)] transition-colors duration-200 hover:opacity-85"
          >
            View My Work
          </a>
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors duration-200 hover:border-[var(--ink)] hover:bg-[var(--surface-hover)]"
          >
            View CV
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="hero-sequence hero-sequence--social mt-8">
          <SocialLinks />
        </div>
      </div>

      <div
        className="portfolio-portrait hero-image-enter relative z-10"
        data-scroll-motion
        data-scroll-intensity="4"
      >
        <div className="portfolio-portrait__image">
          <Image
            src="/images/profile/allen-jean-dark-hair.png"
            alt="Portrait of Allen Jean Lagangga"
            width={1545}
            height={1999}
            priority
            unoptimized
            className="relative z-10 h-auto w-full object-contain"
          />
        </div>
        <p className="portfolio-portrait__caption">Based in Davao Oriental, Philippines</p>
      </div>
    </section>
  );
}
