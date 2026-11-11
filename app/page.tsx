import AboutPreview from "@/components/AboutPreview";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="portfolio-layout min-w-0 flex-1 overflow-x-clip">
      <Hero />
      <AboutPreview />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
