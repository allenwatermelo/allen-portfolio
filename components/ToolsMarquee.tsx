const toolGroups = [
  { name: "Data & Administrative Support", tools: ["Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint", "Google Sheets", "Google Forms", "Google Calendar", "Trello"] },
  { name: "Automation & AI", tools: ["n8n", "Google Gemini", "ChatGPT", "Claude", "Docker"] },
  { name: "Web Development", tools: ["Next.js", "React", "HTML", "CSS", "JavaScript", "Git", "GitHub"] },
  { name: "Backend Development", tools: ["Python", "JavaScript", "MongoDB", "SQL", "Flask", "Node.js", "Express", "JWT"] },
  { name: "Design & Content", tools: ["Canva", "Adobe Photoshop", "CapCut"] },
];

export default function ToolsMarquee() {
  return (
    <div className="toolkit">
      {toolGroups.map((group) => (
        <div className="toolkit__group" key={group.name}>
          <h4 className="toolkit__heading">{group.name}</h4>
          <ul className="toolkit__tags" aria-label={group.name}>
            {group.tools.map((tool) => <li className="toolkit__tag" key={tool}>{tool}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
