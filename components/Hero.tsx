import Image from "next/image";
import { DownloadIcon } from "@/components/Icons";
import HeroAmbient from "@/components/HeroAmbient";
import SocialLinks from "@/components/SocialLinks";
import { resumePath } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:py-20 lg:py-24"
    >
      <HeroAmbient />

      <div className="relative z-10 max-w-xl" data-scroll-motion data-scroll-intensity="10">
        <p className="hero-sequence hero-sequence--label text-[0.7rem] font-medium tracking-[0.22em] text-[var(--muted-soft)] uppercase">
          Hello, I&apos;m
        </p>
        <h1 className="hero-sequence hero-sequence--title mt-3 text-4xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
          Allen Jean Lagangga
        </h1>
        <p className="hero-sequence hero-sequence--role mt-3 text-lg text-[var(--muted)]">
          IT Graduate &amp; Data Enthusiast
        </p>
        <div className="hero-sequence hero-sequence--divider mt-5 h-px w-10 bg-[var(--line-strong)]" aria-hidden="true" />
        <p className="hero-sequence hero-sequence--description mt-5 max-w-md text-[0.98rem] leading-7 text-[var(--muted)]">
          I turn data, details, and ideas into organized, practical solutions.
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
            download
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors duration-200 hover:border-[var(--ink)] hover:bg-[var(--surface-hover)]"
          >
            Download CV
            <DownloadIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="hero-sequence hero-sequence--social mt-8">
          <SocialLinks />
        </div>
      </div>

      <div
        className="scroll-motion-item hero-image-enter relative z-10 mx-auto flex w-full max-w-[420px] items-end justify-center lg:max-w-none lg:justify-end"
        data-scroll-motion
        data-scroll-intensity="24"
      >
        <div
          className="absolute top-[12%] right-[-4%] h-[78%] w-[58%] opacity-70"
          style={{
            backgroundImage: "radial-gradient(#d4d4d4 1.15px, transparent 1.15px)",
            backgroundSize: "13px 13px",
          }}
          aria-hidden="true"
        />
        <div className="relative w-[86%] max-w-[380px]">
          <div
            className="absolute top-1/2 left-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--hero-circle)]"
            aria-hidden="true"
          />
          <Image
            src="/images/profile/allen-jean-dark-hair.png"
            alt="Portrait of Allen Jean Lagangga"
            width={1545}
            height={1999}
            priority
            className="relative z-10 h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
