export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export const socialLinks = [
  {
    href: "mailto:hello@example.com",
    label: "Email",
    name: "email" as const,
  },
  {
    href: "https://www.linkedin.com/in/allen-jean-lagangga-128536426",
    label: "LinkedIn",
    name: "linkedin" as const,
  },
] as const;

export const resumePath = "/resume/allen-jean-lagangga-resume.pdf";
