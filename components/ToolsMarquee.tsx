import Image from "next/image";

type Tool = {
  name: string;
  logo: string;
  slug: string;
};

const tools: Tool[] = [
  { name: "Canva", logo: "/images/logos/canva.png", slug: "canva" },
  { name: "Next.js", logo: "/next.svg", slug: "nextjs" },
  { name: "CapCut", logo: "/images/logos/capcut.png", slug: "capcut" },
  { name: "Adobe Photoshop", logo: "/images/logos/photoshop.png", slug: "photoshop" },
  { name: "ChatGPT", logo: "/images/logos/chatgpt.png", slug: "chatgpt" },
  { name: "Claude", logo: "/images/logos/claude.png", slug: "claude" },
  { name: "Google Workspace", logo: "/images/logos/google%20workspace.png", slug: "workspace" },
  { name: "Microsoft Excel", logo: "/images/logos/excel.png", slug: "excel" },
];

export default function ToolsMarquee() {
  return (
    <ul className="tools-shelf" aria-label="Tools I use">
      {tools.map((tool) => (
        <li className={`tools-shelf__item tools-shelf__item--${tool.slug}`} key={tool.name} title={tool.name}>
          <span className="tools-shelf__frame" aria-hidden="true">
            <Image
              className="tools-shelf__logo"
              src={tool.logo}
              alt=""
              width={800}
              height={800}
              quality={100}
              sizes="(max-width: 640px) 112px, 160px"
            />
          </span>
          <span className="sr-only">{tool.name}</span>
        </li>
      ))}
    </ul>
  );
}
