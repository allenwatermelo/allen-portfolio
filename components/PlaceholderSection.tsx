type PlaceholderSectionProps = {
  id: string;
  label: string;
  heading: string;
  description: string;
};

export default function PlaceholderSection({
  id,
  label,
  heading,
  description,
}: PlaceholderSectionProps) {
  return (
    <section id={id} className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
        <p className="text-[0.7rem] font-medium tracking-[0.22em] text-[var(--muted-soft)] uppercase">
          {label}
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)]">
          {heading}
        </h2>
        <div className="mt-4 h-px w-10 bg-[var(--line-strong)]" aria-hidden="true" />
        <p className="mt-5 max-w-xl text-[0.98rem] leading-7 text-[var(--muted)]">
          {description}
        </p>
      </div>
    </section>
  );
}
