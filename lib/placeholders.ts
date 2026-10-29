/* Placeholder generators (used only when a media path is empty or fails to load). */

const shade = (hex: string, p: number) => {
  const n = parseInt(hex.slice(1), 16);
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = p < 0 ? 0 : 255, a = Math.abs(p);
  r = Math.round((t - r) * a + r); g = Math.round((t - g) * a + g); b = Math.round((t - b) * a + b);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
const wheel = (cx: number) => {
  let spokes = '';
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    spokes += `<line x1="${cx}" y1="282" x2="${(cx + Math.cos(a) * 42).toFixed(1)}" y2="${(282 + Math.sin(a) * 42).toFixed(1)}" stroke="#8d8f95" stroke-width="2.4"/>`;
  }
  return `<circle cx="${cx}" cy="282" r="76" fill="#0e0e0e"/>
    <circle cx="${cx}" cy="282" r="64" fill="#161616"/>
    <circle cx="${cx}" cy="282" r="45" fill="#cfd0d4"/>${spokes}
    <circle cx="${cx}" cy="282" r="45" fill="none" stroke="#9a9ca2" stroke-width="3"/>
    <circle cx="${cx}" cy="282" r="10" fill="#e9e9ec" stroke="#777" stroke-width="2"/>`;
};
export const carSVG = (c: string) => {
  const hi = shade(c, .28), lo = shade(c, -.35), glass = '#2a2426';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400">
    <defs>
      <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hi}"/><stop offset=".5" stop-color="${c}"/><stop offset="1" stop-color="${lo}"/></linearGradient>
      <radialGradient id="s" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="500" cy="350" rx="490" ry="30" fill="url(#s)"/>
    <path d="M815 160 L915 150 L918 163 L828 172Z" fill="#141414"/>
    <rect x="880" y="160" width="10" height="22" fill="#141414"/>
    <path d="M48 270 L44 224 Q46 202 70 198 L250 184 L335 114 Q348 103 368 102 L650 99 Q672 99 685 111 L772 178 L915 186 Q946 188 951 212 L957 270 Q957 286 940 286 L64 286 Q50 286 48 270Z" fill="url(#b)"/>
    <path d="M352 119 L478 115 L478 178 L276 184Z" fill="${glass}"/>
    <path d="M494 115 L648 113 Q661 113 669 121 L742 178 L494 178Z" fill="${glass}"/>
    <path d="M70 203 L915 193" stroke="#fff" stroke-opacity=".35" stroke-width="3"/>
    <path d="M486 118 L486 272 M708 182 L712 272" stroke="#000" stroke-opacity=".28" stroke-width="2"/>
    <rect x="640" y="198" width="36" height="7" rx="3" fill="#000" opacity=".45"/>
    <path d="M262 186 Q292 172 300 190 L282 196Z" fill="${lo}"/>
    <rect x="44" y="244" width="913" height="8" fill="#151515" opacity=".8"/>
    <rect x="44" y="206" width="22" height="20" rx="4" fill="#efefef"/>
    <rect x="44" y="230" width="18" height="8" rx="2" fill="#d98a2b"/>
    <rect x="934" y="203" width="20" height="22" rx="3" fill="#b3241c"/>
    ${wheel(215)}${wheel(790)}
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};
export const photoSVG = (label: string, dark = false) => {
  const bg1 = dark ? '#2b2b2e' : '#e6e1e0', bg2 = dark ? '#111113' : '#cfc7c6', fg = dark ? '#8a8a90' : '#8b8382';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs>
    <rect width="1600" height="1000" fill="url(#g)"/>
    <g fill="none" stroke="${fg}" stroke-width="10" transform="translate(720 380)"><rect x="0" y="0" width="160" height="120" rx="12"/><circle cx="50" cy="40" r="16"/><path d="M0 100 L60 55 L100 90 L130 70 L160 95"/></g>
    <text x="800" y="580" text-anchor="middle" font-family="Inter Tight, Arial, sans-serif" font-size="44" font-weight="600" fill="${fg}">${label}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};
