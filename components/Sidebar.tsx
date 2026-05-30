"use client";

import { shade, type Client } from "@/lib/config";

interface SidebarProps {
  clients: Client[];
  activeCode: string;
  onSelect: (code: string) => void;
  onAddClient: () => void;
  onOpenGraph: () => void;
}

export function Sidebar({
  clients,
  activeCode,
  onSelect,
  onAddClient,
  onOpenGraph,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="side-label">
        Clients <span className="count">{clients.length}</span>
      </div>
      <div>
        {clients.map((c) => {
          const cls =
            "client" +
            (c.code === activeCode ? " active" : "") +
            (c.onboarding ? " onboarding" : "");
          return (
            <div
              key={c.code}
              className={cls}
              onClick={c.onboarding ? undefined : () => onSelect(c.code)}
            >
              <div
                className="client-mono"
                style={{
                  background: `linear-gradient(135deg,${c.color},${shade(c.color, 30)})`,
                }}
              >
                {c.code.slice(0, 4)}
              </div>
              <div className="client-info">
                <div className="client-name">{c.name}</div>
                <div className="client-tag">
                  {c.onboarding && (
                    <svg
                      className="lock"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="4" y="11" width="16" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                  )}
                  {c.tag}
                </div>
              </div>
              {!c.onboarding && <span className="client-status" />}
            </div>
          );
        })}
      </div>

      <div className="add-client" onClick={onAddClient}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add client
      </div>

      <div className="side-foot">
        <a onClick={onOpenGraph}>Context Graph →</a>
        <a href="#" target="_blank">
          Workspace settings →
        </a>
        <a href="#" target="_blank">
          Billing &amp; plans →
        </a>
      </div>
    </aside>
  );
}
