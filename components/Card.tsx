"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { svg, type ModuleDef } from "@/lib/config";

interface CardProps {
  mod: ModuleDef;
  url: string;
  clientName: string;
  index: number;
  onSave: (id: string, value: string) => void;
  onToast: (msg: string) => void;
}

export function Card({ mod, url, clientName, index, onSave, onToast }: CardProps) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState(url || "");
  const [shown, setShown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // staggered entrance, matching the original
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60 + index * 45);
    return () => clearTimeout(t);
  }, [index]);

  useEffect(() => {
    setVal(url || "");
  }, [url]);

  const has = (url || "").trim() !== "";

  const toggle = () => {
    setOpen((o) => {
      const next = !o;
      if (next) setTimeout(() => inputRef.current?.focus(), 0);
      return next;
    });
  };

  const save = () => {
    onSave(mod.id, val);
    onToast(val.trim() ? `Link saved for ${clientName}` : "Link cleared");
    setOpen(false);
  };

  const cls = "card" + (has ? " linked" : "") + (shown ? " in" : "");

  return (
    <div className={cls} style={{ ["--accent" as keyof CSSProperties]: mod.accent } as CSSProperties}>
      <div className="card-top">
        <div className="icon-wrap" dangerouslySetInnerHTML={{ __html: svg(mod.icon) }} />
        <span className={`badge ${mod.status}`}>{mod.status}</span>
      </div>
      <div className="card-title">
        {mod.title}
        <span className="abbr">{mod.abbr}</span>
      </div>
      <div className="card-desc">{mod.desc}</div>
      <div className="card-foot">
        {has ? (
          <a className="open-btn" href={url} target="_blank" rel="noopener noreferrer">
            Open {mod.abbr}{" "}
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
          </a>
        ) : (
          <button className="open-btn empty" onClick={toggle}>
            + Add link
          </button>
        )}
        <div className="gear" title="Edit link" onClick={toggle}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
          </svg>
        </div>
      </div>
      <div className={"link-editor" + (open ? " open" : "")}>
        <input
          ref={inputRef}
          type="url"
          placeholder={`https://… link for ${mod.title} (${clientName})`}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") setOpen(false);
          }}
        />
        <button onClick={save}>Save</button>
      </div>
    </div>
  );
}
