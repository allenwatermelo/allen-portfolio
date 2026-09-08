import AboutPreview from "@/components/AboutPreview";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="flex-1 bg-[var(--background)]">
      <Hero />
      <AboutPreview />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
