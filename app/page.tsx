import AboutPreview from "@/components/AboutPreview";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="portfolio-layout flex-1">
      <Hero />
      <AboutPreview />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
