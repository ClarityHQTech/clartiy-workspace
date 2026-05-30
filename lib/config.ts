// ============================================================
//  CONFIG — edit clients, links, modules here.
//  Per-client link edits made in the UI are saved to the
//  browser (localStorage) and overlay these defaults.
//  To hard-wire a permanent link, set it as the value below.
// ============================================================

export type Status = "live" | "preview" | "draft";

export interface ModuleDef {
  id: string;
  title: string;
  abbr: string;
  status: Status;
  accent: string;
  desc: string;
  icon: string;
}

export interface Client {
  code: string;
  name: string;
  tag: string;
  color: string;
  status: "live" | "draft";
  onboarding?: boolean;
  links: Record<string, string>;
  /** The brand's BCP guardrail endpoint (brand-context.json). */
  bcpUrl?: string;
}

export type ConnectorMode = "claude" | "chatgpt" | "live" | "preview";

export interface Connector {
  name: string;
  icon: string;
  mode: ConnectorMode;
}

export interface Config {
  clients: Client[];
  intelModules: ModuleDef[];
  growthModules: ModuleDef[];
  connectors: Connector[];
}

export const CONFIG: Config = {
  clients: [
    {
      code: "KKCL",
      name: "KKCL",
      tag: "Onboarding in progress",
      color: "#6A5A93",
      status: "draft",
      onboarding: true,
      links: {},
    },
    {
      code: "ITK",
      name: "ITK",
      tag: "Brand Intelligence · Live",
      color: "#2F6E6A",
      status: "live",
      links: {
        icp: "https://brandfoundry.clarityhq.ai/in-the-know-kitchen-(itk)/icp",
        brandbook:
          "https://m360.clarityhq.ai/brand-books/9fa8c2ac-a852-49a2-a2a8-faf13e992a99/discover",
        campaign: "https://m360.clarityhq.ai/campaigns/256353f5-c50e-486b-9fbc-4bf7612eb552/output",
        creative: "https://m360.clarityhq.ai/assets/ef6f49ae-b714-49bd-aa99-248f87baac54",
        pdp: "",
        clarwiz: "",
      },
      bcpUrl:
        "https://www.brandcontextprotocol.com/brands/in-the-know-kitchen/brand-context.json?key=bcp_Y-wZ2FXp0IriOoa2UgCbg1fpLfyhZC5tW6_1zRQ-OC8",
    },
    {
      code: "PPR",
      name: "PapaRich",
      tag: "Onboarding in progress",
      color: "#C16A3C",
      status: "draft",
      onboarding: true,
      links: {},
    },
    {
      code: "CLR",
      name: "Clarity",
      tag: "Brand Intelligence · Live",
      color: "#3F5B89",
      status: "live",
      links: { icp: "", brandbook: "", campaign: "", creative: "", pdp: "", clarwiz: "" },
      bcpUrl:
        "https://www.brandcontextprotocol.com/brands/clarityhq/brand-context.json?key=bcp_zfJWK0Gb0j_gtN5Kb8YZiccjgD4BwyluJQQ_1kaQUAI",
    },
  ],
  // Brand Intelligence link-cards (left column)
  intelModules: [
    {
      id: "icp",
      title: "ICP & Personas",
      abbr: "ICP",
      status: "live",
      accent: "var(--c-teal)",
      desc: "Ideal customer profiles and buyer personas — the foundation every other module reads from.",
      icon: "users",
    },
    {
      id: "brandbook",
      title: "Brand Book",
      abbr: "BB",
      status: "live",
      accent: "var(--c-amber)",
      desc: "Voice, tone, visual rules and messaging pillars in one living, AI-readable source of truth.",
      icon: "book",
    },
  ],
  // Growth / Execution modules
  growthModules: [
    {
      id: "campaign",
      title: "Campaign Manager",
      abbr: "CMP",
      status: "live",
      accent: "var(--c-orange)",
      desc: "Plan, brief and run multi-channel campaigns powered by the client's Intelligence Layer.",
      icon: "megaphone",
    },
    {
      id: "creative",
      title: "Creative Studio",
      abbr: "CS",
      status: "live",
      accent: "var(--c-purple)",
      desc: "Generate on-brand statics, reels and copy that stay consistent with the Brand Book.",
      icon: "sparkle",
    },
    {
      id: "pdp",
      title: "PDP Engine",
      abbr: "PDP",
      status: "preview",
      accent: "var(--c-teal)",
      desc: "Build and optimise product detail pages from brand context and conversion data.",
      icon: "layout",
    },
    {
      id: "clarwiz",
      title: "Clarwiz",
      abbr: "AI",
      status: "preview",
      accent: "var(--c-amber)",
      desc: "The workspace co-pilot — ask anything about the client, draft, and trigger any module.",
      icon: "wand",
    },
  ],
  connectors: [
    { name: "Claude", icon: "sparkle", mode: "claude" },
    { name: "ChatGPT", icon: "chat", mode: "chatgpt" },
    { name: "Slack", icon: "hash", mode: "live" },
    { name: "Zendesk", icon: "life", mode: "preview" },
    { name: "Canva", icon: "layout", mode: "preview" },
  ],
};

export const ICONS: Record<string, string> = {
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  graph: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6.5 7.2 11 16M17.5 7.2 13 16M7 6h10"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  megaphone: '<path d="m3 11 14-6v14L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/><path d="M17 7a5 5 0 0 1 0 10"/>',
  sparkle: '<path d="M12 2c.4 4.5 3.5 7.6 8 8-4.5.4-7.6 3.5-8 8-.4-4.5-3.5-7.6-8-8 4.5-.4 7.6-3.5 8-8z"/>',
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  wand: '<path d="m15 4 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/><path d="M5 19 16 8"/><path d="m18 11 1 1"/>',
  hash: '<path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>',
  life: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="m5 5 4.5 4.5M14.5 14.5 19 19M19 5l-4.5 4.5M9.5 14.5 5 19"/>',
  network: '<circle cx="12" cy="5" r="2.4"/><circle cx="5" cy="18" r="2.4"/><circle cx="19" cy="18" r="2.4"/><path d="M11 7 6.5 16M13 7l4.5 9M7.4 18h9.2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3C9.4 5.7 9.4 18.3 12 21"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3z"/><path d="m9 12 2 2 4-4"/>',
  analytics: '<path d="M4 19V5M4 19h16"/><rect x="7" y="11" width="3" height="5"/><rect x="12" y="7" width="3" height="9"/><rect x="17" y="13" width="3" height="3"/>',
  social: '<circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8.1 10.9 15.9 7.1M8.1 13.1 15.9 16.9"/>',
};

export function svg(name: string): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;
}

export function escapeAttr(s: string): string {
  return (s || "").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + amt;
  let g = ((n >> 8) & 255) + amt;
  let b = (n & 255) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}

// ---------- BCP guardrail helpers ----------
export function getBcpUrl(client: Client): string {
  if (client.bcpUrl) return client.bcpUrl;
  const slug =
    client.name.toLowerCase().replace(/[^a-z0-9]/g, "") || client.code.toLowerCase();
  return `https://www.brandcontextprotocol.com/brands/${slug}/brand-context.json?key=bcp_preview_${client.code.toLowerCase()}`;
}

export function bcpPrompt(clientName: string, url: string): string {
  return `You are an on-brand assistant for ${clientName}. Load this Brand Context Protocol guardrail and follow it strictly:\n${url}\n\nFetch the JSON, summarise the brand voice, ICP and guardrails, then wait for my brief.`;
}

export function claudeTestLink(clientName: string, url: string): string {
  return `https://claude.ai/new?q=${encodeURIComponent(bcpPrompt(clientName, url))}`;
}

export function chatgptTestLink(clientName: string, url: string): string {
  return `https://chatgpt.com/?q=${encodeURIComponent(bcpPrompt(clientName, url))}`;
}
