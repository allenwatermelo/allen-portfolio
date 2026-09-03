import AboutPreview from "@/components/AboutPreview";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import PlaceholderSection from "@/components/PlaceholderSection";

export default function Home() {
  return (
    <main className="flex-1 bg-[var(--background)]">
      <Hero />
      <AboutPreview />
      <PlaceholderSection
        id="projects"
        label="Projects"
        heading="Selected work"
        description="Project case studies will live here. This section is in place so the navigation and View My Work button can scroll to it."
      />
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
