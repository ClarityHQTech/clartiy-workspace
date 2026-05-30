"use client";

import { useState } from "react";
import {
  CONFIG,
  chatgptTestLink,
  claudeTestLink,
  svg,
  type Connector,
} from "@/lib/config";

interface BcpProps {
  clientName: string;
  bcpUrl: string;
  icpLive: boolean;
  bbLive: boolean;
}

function ConnectorChip({
  c,
  clientName,
  bcpUrl,
}: {
  c: Connector;
  clientName: string;
  bcpUrl: string;
}) {
  const icon = (
    <span className="conn-ico" dangerouslySetInnerHTML={{ __html: svg(c.icon) }} />
  );

  if (c.mode === "claude" || c.mode === "chatgpt") {
    const href =
      c.mode === "claude"
        ? claudeTestLink(clientName, bcpUrl)
        : chatgptTestLink(clientName, bcpUrl);
    return (
      <a className="conn action" href={href} target="_blank" rel="noopener noreferrer">
        {icon}
        <span className="conn-name">{c.name}</span>
        <span className="conn-action">Test →</span>
      </a>
    );
  }

  return (
    <div className={"conn" + (c.mode === "preview" ? " preview" : "")}>
      {icon}
      <span className="conn-name">{c.name}</span>
      <span className={`conn-status ${c.mode === "live" ? "live" : "preview"}`}>
        {c.mode === "live" ? "live" : "preview"}
      </span>
    </div>
  );
}

export function Bcp({ clientName, bcpUrl, icpLive, bbLive }: BcpProps) {
  const [copied, setCopied] = useState(false);
  const synced = icpLive && bbLive;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bcpUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="bcp">
      <div className="bcp-inner">
        <div className="bcp-left">
          <div className="bcp-core">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <div className="bcp-title">Brand Context Protocol (BCP)</div>
            <div className="bcp-desc">
              Governance layer — guardrails from your ICP &amp; Brand Book, enforced across every connected tool.
            </div>
          </div>
        </div>
        <div className="connectors">
          {CONFIG.connectors.map((c) => (
            <ConnectorChip key={c.name} c={c} clientName={clientName} bcpUrl={bcpUrl} />
          ))}
        </div>
      </div>

      <div className="bcp-guardrail">
        <div className="bcp-gr-head">
          <span className="bcp-gr-label">Brand Guardrail Link</span>
          <span className={"bcp-gr-status" + (synced ? " synced" : "")}>
            <span className="bcp-gr-dot" />
            {synced
              ? "Synced from ICP + Brand Book"
              : "Baseline guardrail · connect ICP + Brand Book to enrich"}
          </span>
        </div>
        <div className="bcp-gr-row">
          <code className="bcp-gr-url" title={bcpUrl}>
            {bcpUrl}
          </code>
          <button className="bcp-copy" onClick={copy}>
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
