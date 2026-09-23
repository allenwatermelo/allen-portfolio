export default function PortraitPixelPattern() {
  return (
    <svg className="portrait-pixels" viewBox="0 0 160 193" fill="none" shapeRendering="crispEdges" aria-hidden="true">
      <g fill="#e5f1f5" stroke="#bdd5df" strokeWidth="1">
        <path d="M6 29h5v-4h8v4h5v4h4v5H3v-5h3z" />
        <path d="M134 22h5v-4h8v4h5v4h4v5h-27v-5h5z" />
      </g>
      <g className="portrait-pixels__coin portrait-pixels__coin--left">
        <path d="M17 43h6v2h2v12h-2v2h-6v-2h-2V45h2z" fill="#eab64c" />
        <path d="M18 45h4v12h-4z" fill="#ffdf84" /><path d="M20 47v8" stroke="#bf8931" />
      </g>
      <g className="portrait-pixels__coin portrait-pixels__coin--right">
        <path d="M139 61h6v2h2v12h-2v2h-6v-2h-2V63h2z" fill="#eab64c" />
        <path d="M140 63h4v12h-4z" fill="#ffdf84" /><path d="M142 65v8" stroke="#bf8931" />
      </g>
      {[{ x: 5, y: 83 }, { x: 128, y: 105 }].map(({ x, y }) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <path d="M0 0h27v9H0z" fill="#d5a68b" stroke="#9c705b" />
          <path d="M0 4h27M9 0v4m9-4v4M5 4v5m13-5v5" stroke="#9c705b" />
          <path d="M1 1h7m2 0h7m2 0h7" stroke="#f2d2b7" />
        </g>
      ))}
      <g transform="translate(133 119)">
        <path d="M0 0h16v16H0z" fill="#f4cc75" stroke="#b68b42" />
        <path d="M5 5V3h6v5H8v3m0 1v2" stroke="#775b2f" strokeWidth="2" />
        <path d="M2 2h1m10 0h1M2 14h1m10 0h1" stroke="#fff1c7" />
      </g>
      <g fill="#bacbaa">
        <path d="M7 109h2v-3h2v3h2v2h-2v3H9v-3H7z" />
        <path d="M148 43h2v-3h2v3h2v2h-2v3h-2v-3h-2z" />
      </g>
    </svg>
  );
}
