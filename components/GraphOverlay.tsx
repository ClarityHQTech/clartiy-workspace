"use client";

import { useEffect } from "react";
import { buildGraph } from "@/lib/graph";

interface GraphOverlayProps {
  open: boolean;
  clientName: string;
  links: Record<string, string>;
  onClose: () => void;
}

export function GraphOverlay({ open, clientName, links, onClose }: GraphOverlayProps) {
  const icpLive = !!(links.icp || "").trim();
  const bbLive = !!(links.brandbook || "").trim();
  const connected = (icpLive ? 1 : 0) + (bbLive ? 1 : 0);

  // Escape closes; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className={"graph-overlay" + (open ? " open" : "")}>
      <div className="graph-top">
        <button className="back" onClick={onClose}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back to workspace
        </button>
        <div className="graph-title">
          Context Graph — <span>{clientName}</span>
        </div>
        <div className="graph-meta">
          <b>{connected}</b>/2 intelligence modules feeding BCP · <b>6</b> governed
          signals
        </div>
      </div>
      <div className="graph-stage">
        <div
          style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}
          dangerouslySetInnerHTML={{ __html: open ? buildGraph(links) : "" }}
        />
        <div className="glegend">
          <span>
            <span className="lg-line" /> Connected &amp; flowing
          </span>
          <span>
            <span className="lg-line pend" /> Awaiting link
          </span>
        </div>
      </div>
    </div>
  );
}
