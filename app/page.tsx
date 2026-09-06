import AboutPreview from "@/components/AboutPreview";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import PlaceholderSection from "@/components/PlaceholderSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main className="flex-1 bg-[var(--background)]">
      <Hero />
      <AboutPreview />
      <ProjectsSection />
      <PlaceholderSection
        id="experience"
        label="Experience"
        heading="Where I have worked"
        description="Experience details will be added here. This section exists so the Experience link in the navigation can scroll smoothly."
      />
      <ContactSection />
    </main>
  );
}
