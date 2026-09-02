export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export const socialLinks = [
  {
    href: "https://github.com/your-username",
    label: "GitHub",
    name: "github" as const,
  },
  {
    href: "https://www.linkedin.com/in/your-username",
    label: "LinkedIn",
    name: "linkedin" as const,
  },
  {
    href: "mailto:hello@example.com",
    label: "Email",
    name: "email" as const,
  },
] as const;

export const resumePath = "/resume/allen-jean-lagangga-resume.pdf";
