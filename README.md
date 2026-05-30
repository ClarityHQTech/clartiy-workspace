# Clarity Workspace — Agency Operator View

A production-ready operator console for the Clarity agency. One dashboard to
reach every product per client — Brand Intelligence (ICP, Brand Book, Context
Graph) and Growth modules (Campaign Manager, Creative Studio, PDP Engine,
Clarwiz).

A faithful React/Next.js port of the original `Clarity-workspace.html` artifact,
in the Clarity brochure palette (warm cream, ink-black panels, gold/copper,
Fraunces serif headers, Hanken Grotesk body).

## Features

- **Client switcher** — ITK and Clarity are live and switchable (ITK default).
  KKCL and PapaRich are faded with a lock + "Onboarding in progress" tag and are
  non-interactive. "Add client" adds a session client.
- **Per-client links** — click **+ Add link** / the ⚙ gear on any card, paste a
  URL, Save. Links are stored **per client** and persist in the browser
  (`localStorage`), so they survive reloads. Once saved, the card shows an
  **Open** button and the gear only returns on hover. A toast confirms the save.
- **Brand Context Protocol strip** — the live/preview connectors (Claude,
  ChatGPT, Slack, Zendesk, Canva).
- **Context Graph** — a full-screen overlay (open from the card or the sidebar)
  visualising 5 data sources → ICP & Brand Book → the Brand Intelligence core.
  Module edges render dashed/grey ("Awaiting link") until a link is added, then
  flip to a solid animated flowing line. A counter shows N/2 modules connected.
  `Esc` or "Back to workspace" closes it.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy to Vercel

Standard Next.js app — Vercel auto-detects it, no config needed.

**Dashboard:** push to a Git repo → "New Project" on
[vercel.com](https://vercel.com) → import.

**CLI:**

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

## Where to change things

- **`lib/config.ts`** — the single source of truth: clients, modules,
  connectors, icons. Edit titles, descriptions, statuses, colors, and **default
  links** here (set a link value to hard-wire it permanently across deploys).
- **`lib/useWorkspace.ts`** — active client + per-client link persistence
  (`localStorage`). Swap for Vercel KV / a database later if you want shared,
  cross-device persistence.
- **`lib/graph.ts`** — the Context Graph + mini-preview SVG (data sources live
  here).

## Project structure

```
app/
  layout.tsx              root layout + fonts
  page.tsx                dashboard + graph overlay orchestration
  globals.css             full design system (ported verbatim)
components/                TopBar, Sidebar, Card, ContextCard, Bcp, GraphOverlay
lib/
  config.ts               clients / modules / connectors / icons (edit here)
  useWorkspace.ts         active client + per-client link persistence
  graph.ts                Context Graph SVG builders
```

> Note: in-UI link edits and added clients are saved to the browser
> (`localStorage`); added clients are session-only (links persist by client
> code). For links shared across all users/devices, move persistence to a
> backend.
