import ScrollReveal from "@/components/ScrollReveal";
import styles from "./SkillsSection.module.css";

const skillGroups = [
  { title: "Data & Analytics", skills: ["Data cleaning", "Spreadsheet analysis", "Dashboard creation", "Data visualization", "Reporting & insights"] },
  { title: "Automation", skills: ["Workflow automation", "Google Apps Script", "n8n workflows", "Spreadsheet automation", "AI-assisted workflows"] },
  { title: "Web Development", skills: ["Next.js / React", "HTML / CSS / JavaScript", "Responsive interfaces", "Git / GitHub", "Front-end development"] },
  { title: "Administrative Support", skills: ["Data entry & organization", "Document management", "Google Workspace", "Microsoft Office", "Research & reporting"] },
  { title: "Digital Content & Design", skills: ["Canva", "Photoshop", "CapCut", "Graphic design", "Presentation design", "Photo & video editing"] },
];

export default function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-14">
        <ScrollReveal intensity={6}>
          <p className="text-[0.7rem] font-medium tracking-[0.22em] text-[var(--muted-soft)] uppercase">Skills &amp; Capabilities</p>
          <h2 id="skills-heading" className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)]">What I can do</h2>
          <div className="mt-4 h-px w-10 bg-[var(--line-strong)]" aria-hidden="true" />
        </ScrollReveal>
        <div className={styles.grid}>
          {skillGroups.map((group, index) => (
            <ScrollReveal key={group.title} intensity={4} className={styles.group}>
              <article className={styles.block}>
                <h3 className={styles.heading}>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.title}>{group.title}</span>
                </h3>
                <ul className={styles.skills}>
                  {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
