import { BriefcaseIcon, GraduationIcon } from "@/components/Icons";
import ScrollReveal from "@/components/ScrollReveal";
import ToolsMarquee from "@/components/ToolsMarquee";

export default function AboutPreview() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 pt-6 pb-12 sm:px-8 md:pb-16">
      <div className="grid items-start gap-10 md:grid-cols-2 lg:grid-cols-[0.85fr_1.15fr_1.1fr] lg:gap-12">
        <ScrollReveal>
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-[var(--muted-soft)] uppercase">
            About me
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-[1.7rem]">
            Get to know me
          </h2>
          <div className="mt-4 h-px w-10 bg-[var(--line-strong)]" aria-hidden="true" />
        </ScrollReveal>

        <ScrollReveal delay="short">
          <p className="max-w-xl text-[0.98rem] leading-7 text-[var(--muted)] lg:pt-8">
            I&apos;m an IT graduate interested in turning data, repetitive processes,
            and everyday problems into practical digital solutions. My work spans
            data analysis, workflow automation, administrative support, and web development.
          </p>
        </ScrollReveal>

        <ScrollReveal delay="medium" className="md:col-span-2 lg:col-span-1">
          <aside className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-start gap-3.5">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--icon-surface)] text-[var(--muted)]">
              <GraduationIcon className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[var(--ink)]">Education</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                BS Information Technology
              </p>
              <p className="text-sm text-[var(--muted-soft)]">
                Davao Oriental State University
              </p>
            </div>
          </div>

          <div className="my-4 h-px bg-[var(--line)]" aria-hidden="true" />

          <div className="flex items-start gap-3.5">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--icon-surface)] text-[var(--muted)]">
              <BriefcaseIcon className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[var(--ink)]">Focus</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Data Analysis • Automation • Administrative Support • Web Development
              </p>
            </div>
          </div>
          </aside>
        </ScrollReveal>
      </div>

      <ScrollReveal delay="short" className="mt-10 sm:mt-12">
        <h3 className="text-[0.7rem] font-medium tracking-[0.22em] text-[var(--muted-soft)] uppercase">
          Tools I Use
        </h3>
        <ToolsMarquee />
      </ScrollReveal>
    </section>
  );
}
