"use client";

import { useEffect, useState } from "react";
import { svg } from "@/lib/config";
import { miniGraph } from "@/lib/graph";

interface ContextCardProps {
  icpLive: boolean;
  bbLive: boolean;
  index: number;
  onOpenGraph: () => void;
}

export function ContextCard({ icpLive, bbLive, index, onOpenGraph }: ContextCardProps) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60 + index * 45);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div className={"ctxcard" + (shown ? " in" : "")}>
      <div className="ctx-rel">
        <div className="card-top">
          <div className="icon-wrap" dangerouslySetInnerHTML={{ __html: svg("network") }} />
          <span className="badge live">live</span>
        </div>
        <div className="card-title">
          Context Graph
          <span
            className="abbr"
            style={{ color: "var(--gold-2)", borderColor: "rgba(203,162,101,.4)" }}
          >
            CG
          </span>
        </div>
        <div className="card-desc">
          How data flows into ICP &amp; Brand Book, then into the BCP governance
          layer that generates your Brand Guardrail. Modules light up the moment
          their links are connected.
        </div>
        <div
          className="ctx-preview"
          dangerouslySetInnerHTML={{ __html: miniGraph(icpLive, bbLive) }}
        />
        <button className="ctxopen" onClick={onOpenGraph}>
          Open Context Graph
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
