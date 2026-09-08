import { useId } from "react";

type IconName = "gmail" | "gemini" | "sheet" | "code" | "edit" | "branch" | "mail" | "reply" | "folder";

function Icon({ name, x = 0, y = 0, size = 32 }: { name: IconName; x?: number; y?: number; size?: number }) {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {name === "gmail" ? <>
        <path d="M4 26V8l12 9L28 8v18" stroke="#4285f4" strokeWidth="6" strokeLinejoin="round" />
        <path d="M4 8l12 9L28 8" stroke="#ea4335" strokeWidth="6" strokeLinejoin="round" />
        <path d="M28 9v17" stroke="#34a853" strokeWidth="6" /><path d="M26 10l3-3" stroke="#fbbc04" strokeWidth="5" />
      </> : name === "gemini" ? <>
        <path d="M16 1C18 10 22 14 31 16C22 18 18 22 16 31C14 22 10 18 1 16C10 14 14 10 16 1Z" fill="#8b7cf8" />
        <path d="M16 1C18 10 22 14 31 16H16Z" fill="#69a9fa" /><path d="M16 16H31C22 18 18 22 16 31Z" fill="#efa4ce" />
      </> : name === "sheet" ? <>
        <path d="M7 1h14l6 6v24H7Z" fill="#0f9d58" /><path d="M21 1v7h6" fill="#73d5a2" />
        <path d="M11 13h12v12H11Zm0 4h12m-12 4h12m-6-8v12" stroke="white" strokeWidth="1.5" />
      </> : name === "code" ? <path d="M11 3H8v9l-4 4 4 4v9h3m10-26h3v9l4 4-4 4v9h-3" stroke="#efb437" strokeWidth="2.5" strokeLinecap="round" />
      : name === "edit" ? <><path d="M7 23l2-7L23 2l7 7-14 14-7 2Z" fill="#a78bfa" /><path d="m19 6 7 7M5 10H2v20h20v-4" stroke="#ddd6fe" strokeWidth="2" /></>
      : name === "branch" ? <path d="M3 8h23m-23 16h23M10 3v26M10 16h10l7-8m-7 8 7 8" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
      : name === "reply" ? <path d="m13 6-9 9 9 9m-8-9h14c6 0 9 3 9 11" stroke="#fa4c82" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      : name === "folder" ? <path d="M3 8h10l3 4h13v16H3Zm0 0V5h9l3 3" stroke="#00a88b" strokeWidth="2.5" strokeLinejoin="round" />
      : <path d="M3 7h26v20H3Zm1 1 12 10L28 8" stroke="#2784dc" strokeWidth="2.5" strokeLinejoin="round" />}
    </svg>
  );
}

function N8nMark({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size})`} fill="none" stroke="#ff477e" strokeWidth="3.5">
    <path d="M6 20h24l13-13h17M30 20l13 13h17" />
    {[ [6,20], [28,20], [62,7], [62,33] ].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="#f8f9ff" />)}
  </g>;
}

const nodes: { label: string[]; subtitle: string; icon: IconName; x: number }[] = [
  { label: ["New Email", "Received"], subtitle: "Gmail Trigger", icon: "gmail", x: 62 },
  { label: ["Extract Email", "Details"], subtitle: "manual", icon: "edit", x: 157 },
  { label: ["AI Email", "Analysis"], subtitle: "message: text", icon: "gemini", x: 252 },
  { label: ["Structure", "AI Output"], subtitle: "JavaScript", icon: "code", x: 347 },
  { label: ["Log Email", "to Tracker"], subtitle: "append: sheet", icon: "sheet", x: 442 },
  { label: ["Reply", "Needed?"], subtitle: "condition", icon: "branch", x: 537 },
  { label: ["Create Gmail", "Draft"], subtitle: "create: draft", icon: "gmail", x: 706 },
];

/** Original vector artwork: every label, icon, card, connector and cell is code. */
export default function EmailAutomationGraphic({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const rows = [
    ["2026-09-06", "Harry Styles", "Inquiry About", "Sales Inquiry", "Medium", "HS Company", "New"],
    ["2026-09-06", "Indeed", "New QA Analyst", "Job Alert", "Low", "Indeed", "No Reply"],
    ["2026-09-06", "Allen", "Website Service", "Sales Inquiry", "High", "ABC Company", "Draft Created"],
    ["2026-09-06", "Allen", "Data Analysis", "Sales Inquiry", "High", "Bright Solutions", "Draft Created"],
  ];
  return (
    <svg className={className} viewBox="0 0 1260 710" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby={`${id}-title ${id}-desc`} style={{ fontFamily: "var(--font-inter), Arial, sans-serif", display: "block", width: "100%", height: "100%" }}>
      <title id={`${id}-title`}>AI Email Management Automation</title>
      <desc id={`${id}-desc`}>An n8n workflow receives Gmail messages, extracts details, analyzes them with Gemini, structures the output, logs emails to Google Sheets, and creates a draft when a reply is needed. Example email and tracker data illustrate the workflow.</desc>
      <defs>
        <linearGradient id={`${id}-bg`} x2="1" y2="1"><stop stopColor="#fcfcff" /><stop offset="1" stopColor="#f0f3ff" /></linearGradient>
        <pattern id={`${id}-dots`} width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="0.65" fill="#606366" opacity=".45" /></pattern>
        <filter id={`${id}-shadow`} x="-15%" y="-20%" width="135%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#536184" floodOpacity=".12" /></filter>
        <marker id={`${id}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="m1 1 5 3-5 3" fill="none" stroke="#4e80ff" strokeWidth="1.5" /></marker>
      </defs>
      <rect width="1260" height="710" fill={`url(#${id}-bg)`} />
      <path d="M690 0H934L815 201C730 248 620 160 655 70Z" fill="#e9edff" opacity=".4" />
      <circle cx="1207" cy="732" r="118" fill="#e8edff" opacity=".55" />
      <text x="55" y="45" fontSize="14" letterSpacing="4" fill="#8991b1">AUTOMATION PROJECT</text>
      <path d="M55 67h47" stroke="#d2caff" strokeWidth="2" />
      <text x="55" y="144" fontSize="52" fontWeight="750" letterSpacing="-2" fill="#0b1220">AI Email Management</text>
      <text x="55" y="198" fontSize="52" fontWeight="750" letterSpacing="-2" fill="#0b1220">Automation</text>
      <text x="55" y="235" fontSize="18" fill="#66708b">Automatically analyze, categorize, and organize incoming emails</text>
      <text x="55" y="263" fontSize="18" fill="#66708b">using n8n and Google Gemini.</text>
      {[
        ["n8n", 55, 52, "#fce0f6"], ["Google Gemini", 114, 103, "#dce9ff"], ["Gmail API", 224, 77, "#ffe2e8"],
        ["Google Sheets", 308, 101, "#d9f5ee"], ["Apps Script", 416, 88, "#e8e1ff"], ["JavaScript", 511, 84, "#fff2cf"], ["Docker", 602, 66, "#dce9ff"],
      ].map(([label, x, w, color]) => <g key={label}><rect x={x} y="281" width={w} height="29" rx="15" fill={String(color)} /><text x={Number(x) + Number(w)/2} y="300" textAnchor="middle" fontSize="11" fill="#233150">{label}</text></g>)}
      <N8nMark x={1080} y={25} /><text x="1161" y="57" fontSize="31" fontWeight="700" letterSpacing="1" fill="#18223f">n8n</text>
      <text x="1017" y="115" fontSize="10" letterSpacing="1.7" fill="#7580a1"><tspan x="1017">SMARTER EMAILS.</tspan><tspan x="1017" dy="20">LESS MANUAL WORK.</tspan><tspan x="1017" dy="20">MORE TIME FOR WHAT MATTERS.</tspan></text>
      <path d="M1017 170h37" stroke="#d3ccff" strokeWidth="2" />
      <g filter={`url(#${id}-shadow)`}>
        <rect x="704" y="126" width="273" height="161" rx="18" fill="white" />
        <Icon name="gmail" x={724} y={141} size={27} />
        <text x="765" y="158" fontSize="13" fontWeight="600" fill="#172036">New Email</text><text x="958" y="157" fontSize="10" textAnchor="end" fill="#8893af">10:24 AM</text>
        <text x="724" y="190" fontSize="12" fill="#76819b">From: client@company.com</text>
        <text x="724" y="213" fontSize="12" fill="#28334c">Subject: Inquiry About Your Services</text>
        <text x="724" y="244" fontSize="12" fill="#28334c">Hi, I’m interested in learning more</text><text x="724" y="265" fontSize="12" fill="#28334c">about your data analysis services...</text>
      </g>
      <path d="M978 177q32-5 44 20" fill="none" stroke="#4e80ff" strokeWidth="1.6" strokeDasharray="5 4" markerEnd={`url(#${id}-arrow)`} />
      <rect x="1016" y="205" width="199" height="140" rx="20" fill="#eeebff" stroke="white" strokeWidth="2" />
      <Icon name="gemini" x={1033} y={220} size={25} /><text x="1068" y="239" fontSize="14" fontWeight="600" fill="#262653">AI Analysis</text>
      {["Categorize", "Summarize", "Set Priority", "Generate Reply"].map((s,i) => <g key={s}><circle cx="1048" cy={260+i*22} r="6.5" fill="#b4a0fa" /><path d={`m1045 ${260+i*22} 2 2 4-4`} fill="none" stroke="white" /><text x="1068" y={264+i*22} fontSize="12" fill="#79809d">{s}</text></g>)}
      <path d="M1154 345q5 20-9 35" fill="none" stroke="#4e80ff" strokeWidth="1.6" strokeDasharray="5 4" markerEnd={`url(#${id}-arrow)`} />
      <g filter={`url(#${id}-shadow)`}>
        <rect x="33" y="328" width="764" height="256" rx="17" fill="#222526" stroke="#424449" />
        <rect x="34" y="383" width="762" height="184" fill={`url(#${id}-dots)`} />
        <N8nMark x={51} y={344} size={.43} /><text x="88" y="361" fontSize="12" fill="#e6e6e6">n8n</text><path d="M119 346v19" stroke="#636363" />
        <text x="131" y="359" fontSize="10" fill="#bfc2c7">AI Email Management Automation</text><circle cx="696" cy="354" r="3" fill="#2dcc8f" /><text x="705" y="358" fontSize="9" fill="#d3d9d6">Active</text><text x="763" y="361" fontSize="18" fill="#a6abb2">⋮</text>
        <path d="M34 380h762" stroke="#383c3f" /><rect x="320" y="367" width="193" height="29" rx="6" fill="#27292b" /><rect x="321" y="368" width="50" height="27" rx="5" fill="#181a1c" stroke="#707479" />
        <text x="332" y="386" fontSize="10" fill="white">Editor</text><text x="381" y="386" fontSize="10" fill="#9ca0a5">Executions</text><text x="449" y="386" fontSize="10" fill="#9ca0a5">Evaluations</text>
        {nodes.slice(0,5).map((n,i) => <g key={n.x}><path d={`M${n.x+55} 462H${nodes[i+1].x}`} stroke="#818a89" strokeWidth="1.5" /><path d={`m${nodes[i+1].x-6} 459 5 3-5 3`} fill="none" stroke="#818a89" /></g>)}
        <path d="M592 454h39q8 0 8 8h67M592 472h25v20h64v-30" fill="none" stroke="#7c8584" strokeWidth="1.5" />
        <text x="599" y="448" fill="#b5baba" fontSize="7">true</text><text x="599" y="485" fill="#b5baba" fontSize="7">false</text>
        {nodes.map(n => <g key={n.x}>
          <rect x={n.x} y="433" width="55" height="57" rx="6" fill="#272e2d" stroke={n.icon === "edit" ? "#858c92" : "#279466"} />
          <Icon name={n.icon} x={n.x+12} y={445} size={31} /><circle cx={n.x+55} cy="462" r="3" fill="#abb4b0" />
          <text x={n.x+27} y="507" textAnchor="middle" fontSize="10" fill="#f1f2f3">{n.label.map((line,i) => <tspan key={line} x={n.x+27} dy={i ? 13 : 0}>{line}</tspan>)}</text>
          <text x={n.x+27} y="539" textAnchor="middle" fontSize="7.5" fill="#999fa5">{n.subtitle}</text>
        </g>)}
      </g>
      <g filter={`url(#${id}-shadow)`}>
        <rect x="821" y="362" width="422" height="222" rx="15" fill="white" stroke="#e7eaf5" />
        <Icon name="sheet" x={837} y={374} size={23} /><text x="870" y="391" fontSize="13" fontWeight="600" fill="#1d263b">Email Tracker</text>
        <rect x="826" y="405" width="412" height="26" fill="#f0f3fa" />
        {["Date Received", "Sender", "Subject", "Category", "Priority", "Company", "Status"].map((h,i) => <text key={h} x={[830,886,934,1003,1061,1103,1180][i]} y="423" fontSize="6.7" fontWeight="600" fill="#505a70">{h}</text>)}
        {rows.map((row,r) => <g key={r}>
          <rect x="826" y={432+r*30} width="412" height="30" fill={r%2 ? "#f9faff" : "#fff"} />
          <rect x="1055" y={434+r*30} width="43" height="26" fill={r===0 ? "#fff7db" : r===1 ? "#e6f9f3" : "#ffe8ee"} />
          <rect x="1168" y={439+r*30} width="66" height="17" rx="8" fill={r===0 ? "#e5efff" : "#ece8ff"} />
          {row.map((cell,c) => <text key={c} x={[830,886,934,1003,1061,1103,1173][c]} y={450+r*30} fontSize="6.8" fill="#36405a">{cell}</text>)}
        </g>)}
        <path d="M821 555h422" stroke="#e8ebf5" /><text x="841" y="574" fontSize="9" fontWeight="600" fill="#3878f6">01_EMAIL_TRACKER</text><text x="963" y="574" fontSize="9" fill="#7f89a2">02_SALES_INQUIRY</text><text x="1086" y="574" fontSize="9" fill="#7f89a2">03_JOB_ALERT</text><text x="1204" y="574" fontSize="15" fill="#7f89a2">+</text><path d="M837 584h115" stroke="#3878f6" strokeWidth="2" />
      </g>
      {[
        {x:55, title:"Auto-Categorize", lines:["Identify and label emails", "using AI"], icon:"mail" as const, bg:"#e2eeff"},
        {x:323, title:"Summarize", lines:["Extract key information", "automatically"], icon:"sheet" as const, bg:"#eee7ff"},
        {x:590, title:"Smart Replies", lines:["Generate draft responses", "for quick review"], icon:"reply" as const, bg:"#ffe4ed"},
        {x:860, title:"Organize", lines:["Log and sort emails", "by category in Google Sheets"], icon:"folder" as const, bg:"#dcf6ef"},
      ].map(f => <g key={f.title}><rect x={f.x} y="621" width="52" height="52" rx="14" fill={f.bg} /><Icon name={f.icon} x={f.x+13} y={634} size={26} /><text x={f.x+73} y="636" fontSize="13" fontWeight="600" fill="#182030">{f.title}</text><text x={f.x+73} y="656" fontSize="11" fill="#717c95">{f.lines[0]}</text><text x={f.x+73} y="674" fontSize="11" fill="#717c95">{f.lines[1]}</text></g>)}
    </svg>
  );
}
