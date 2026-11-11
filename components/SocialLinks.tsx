import { EmailIcon, LinkedInIcon } from "@/components/Icons";
import { socialLinks } from "@/lib/site";

const icons = {
  linkedin: LinkedInIcon,
  email: EmailIcon,
};

export default function SocialLinks() {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-6">
      {socialLinks.map((link) => {
        const Icon = icons[link.name];

        return (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.name === "email" ? undefined : "_blank"}
              rel={link.name === "email" ? undefined : "noopener noreferrer"}
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-[color,transform] duration-300 ease-out hover:text-[var(--ink)] motion-safe:hover:-translate-y-px"
            >
              <Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
