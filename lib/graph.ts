import { ICONS } from "./config";

// ---------- mini graph preview (Context Graph card) ----------
// data sources → ICP / Brand Book → BCP governance core
export function miniGraph(icpLive: boolean, bbLive: boolean): string {
  const flow = 'stroke-dasharray="4 5" style="animation:flow 1.1s linear infinite"';
  const icpCol = icpLive ? "var(--c-teal)" : "rgba(203,162,101,.35)";
  const bbCol = bbLive ? "var(--gold-2)" : "rgba(203,162,101,.35)";
  return `<svg viewBox="0 0 320 150" fill="none">
    ${[40, 75, 110].map((y) => `<circle cx="30" cy="${y}" r="6" fill="rgba(203,162,101,.5)"/>`).join("")}
    <path d="M36 40 C80 40,80 55,120 55" stroke="rgba(203,162,101,.4)" stroke-width="2" ${flow}/>
    <path d="M36 75 C80 75,80 55,120 55" stroke="rgba(203,162,101,.4)" stroke-width="2" ${flow}/>
    <path d="M36 110 C80 110,80 100,120 100" stroke="rgba(203,162,101,.4)" stroke-width="2" ${flow}/>
    <rect x="120" y="40" width="70" height="30" rx="8" fill="rgba(47,110,106,.18)" stroke="${icpCol}" stroke-width="1.6"/>
    <text x="155" y="59" text-anchor="middle" font-family="Hanken Grotesk" font-size="11" font-weight="700" fill="var(--cream)">ICP</text>
    <rect x="120" y="85" width="70" height="30" rx="8" fill="rgba(184,137,62,.18)" stroke="${bbCol}" stroke-width="1.6"/>
    <text x="155" y="104" text-anchor="middle" font-family="Hanken Grotesk" font-size="11" font-weight="700" fill="var(--cream)">Brand Book</text>
    <path d="M190 55 C228 55,228 70,258 73" stroke="${icpCol}" stroke-width="2.2" ${icpLive ? flow : 'stroke-dasharray="3 6" opacity=".7"'}/>
    <path d="M190 100 C228 100,228 80,258 77" stroke="${bbCol}" stroke-width="2.2" ${bbLive ? flow : 'stroke-dasharray="3 6" opacity=".7"'}/>
    <circle cx="282" cy="75" r="24" fill="#0e0b07" stroke="var(--gold)" stroke-width="2"/>
    <g transform="translate(274,60) scale(0.7)" fill="none" stroke="var(--gold-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS.shield}</g>
    <text x="282" y="86" text-anchor="middle" font-family="Hanken Grotesk" font-size="9" font-weight="800" letter-spacing="1" fill="var(--gold-2)">BCP</text>
  </svg>`;
}

// ---------- full Context Graph ----------
function gNode(
  cx: number,
  cy: number,
  label: string,
  icon: string,
  accent: string,
  state: "source" | "live" | "pending",
): string {
  const w = 168,
    h = 54,
    x = cx - w / 2,
    y = cy - h / 2;
  const pending = state === "pending";
  const fill = pending ? "#EFE7D9" : "#fff";
  const stroke = pending ? "var(--line-2)" : accent;
  const txt = pending ? "var(--muted)" : "var(--ink)";
  const statusDot =
    state === "live"
      ? `<circle cx="${x + w - 13}" cy="${y + 13}" r="4" fill="var(--c-green)"/>`
      : state === "pending"
        ? `<circle cx="${x + w - 13}" cy="${y + 13}" r="4" fill="var(--gold-2)"/>`
        : ``;
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" fill="${fill}" stroke="${stroke}" stroke-width="1.7" ${pending ? 'stroke-dasharray="5 4"' : ""}/>
    <g transform="translate(${x + 15},${cy - 9}) scale(0.8)" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[icon]}</g>
    <text x="${x + 44}" y="${cy + 5}" font-family="Hanken Grotesk, sans-serif" font-size="13" font-weight="600" fill="${txt}">${label}</text>
    ${statusDot}
  </g>`;
}

// BCP governance core
function gBcp(cx: number, cy: number): string {
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="66" fill="var(--ink)" stroke="var(--gold)" stroke-width="2.4"/>
    <circle cx="${cx}" cy="${cy}" r="80" fill="none" stroke="var(--gold)" stroke-width="1" opacity=".3"/>
    <g transform="translate(${cx - 14},${cy - 32}) scale(1.15)" fill="none" stroke="var(--gold-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS.shield}</g>
    <text x="${cx}" y="${cy + 8}" text-anchor="middle" font-family="Hanken Grotesk" font-size="17" font-weight="800" letter-spacing="2" fill="var(--cream)">BCP</text>
    <text x="${cx}" y="${cy + 26}" text-anchor="middle" font-family="Hanken Grotesk" font-size="8.5" font-weight="700" letter-spacing="1.5" fill="var(--gold-2)">GOVERNANCE</text>
    <text x="${cx}" y="${cy + 104}" text-anchor="middle" font-family="Fraunces, serif" font-size="15" font-weight="600" fill="var(--ink)">Brand Guardrail</text>
  </g>`;
}

function edge(x1: number, y1: number, x2: number, y2: number, cls: string, color: string): string {
  const mx = (x1 + x2) / 2;
  return `<path class="edge ${cls}" d="M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}" stroke="${color}"/>`;
}

function colLabel(x: number, label: string): string {
  return `<text x="${x}" y="34" text-anchor="middle" font-family="Hanken Grotesk" font-size="11" font-weight="700" letter-spacing="2" fill="var(--gold)">${label}</text>`;
}

export function buildGraph(links: Record<string, string>): string {
  const icpLive = !!(links.icp || "").trim();
  const bbLive = !!(links.brandbook || "").trim();

  // layout
  const SX = 130, // data sources column
    MIDX = 480, // brand intelligence column
    GX = 830, // governance signals column
    COREX = 1130,
    COREY = 300,
    HW = 84,
    CR = 66;
  const srcRight = SX + HW,
    biLeft = MIDX - HW,
    biRight = MIDX + HW,
    govRight = GX + HW,
    coreLeft = COREX - CR;

  // data sources → ICP / Brand Book
  const sources = [
    { label: "Website", icon: "globe", y: 120, t: "bb" },
    { label: "Brand PDFs", icon: "book", y: 240, t: "bb" },
    { label: "Customer Reviews", icon: "chat", y: 360, t: "icp" },
    { label: "Sales Calls", icon: "mic", y: 480, t: "icp" },
  ];
  // governance signals → BCP directly
  const gov = [
    { label: "Sales Analytics", icon: "analytics", y: 90 },
    { label: "Social Data", icon: "social", y: 520 },
  ];

  const ICPY = 190,
    BBY = 410;

  let e = "";
  // sources → brand intelligence (always live)
  sources.forEach((s) => {
    const ty = s.t === "icp" ? ICPY : BBY;
    const col = s.t === "icp" ? "var(--c-teal)" : "var(--c-amber)";
    e += edge(srcRight, s.y, biLeft, ty, "live", col);
  });
  // brand intelligence → BCP (pending until each module is linked)
  e += edge(biRight, ICPY, coreLeft, COREY - 18, icpLive ? "live" : "pending", icpLive ? "var(--c-teal)" : "var(--line-2)");
  e += edge(biRight, BBY, coreLeft, COREY + 18, bbLive ? "live" : "pending", bbLive ? "var(--c-amber)" : "var(--line-2)");
  // governance signals → BCP (always live)
  gov.forEach((g) => {
    e += edge(govRight, g.y, coreLeft, COREY, "live", "var(--c-purple)");
  });

  let n = "";
  sources.forEach((s) => (n += gNode(SX, s.y, s.label, s.icon, "var(--gold)", "source")));
  n += gNode(MIDX, ICPY, "ICP & Personas", "users", "var(--c-teal)", icpLive ? "live" : "pending");
  n += gNode(MIDX, BBY, "Brand Book", "book", "var(--c-amber)", bbLive ? "live" : "pending");
  gov.forEach((g) => (n += gNode(GX, g.y, g.label, g.icon, "var(--c-purple)", "source")));

  const labels =
    colLabel(SX, "DATA SOURCES") +
    colLabel(MIDX, "BRAND INTELLIGENCE") +
    colLabel(GX, "GOVERNANCE SIGNALS");

  return `<svg class="graphsvg" viewBox="0 0 1300 600" preserveAspectRatio="xMidYMid meet">${labels}${e}${n}${gBcp(COREX, COREY)}</svg>`;
}
