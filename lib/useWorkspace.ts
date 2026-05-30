"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CONFIG, type Client } from "./config";

// ---------- persistence (saves links; degrades safely) ----------
const STORE_KEY = "clarity-ws-links-v1";

type Store = Record<string, Record<string, string>>;

function loadStore(): Store {
  if (typeof window === "undefined") return {};
  try {
    return (JSON.parse(window.localStorage.getItem(STORE_KEY) || "null") as Store) || {};
  } catch {
    return {};
  }
}

function saveStore(d: Store) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(d));
  } catch {
    /* storage unavailable — edits stay in-memory for the session */
  }
}

function cloneClients(): Client[] {
  return CONFIG.clients.map((c) => ({ ...c, links: { ...c.links } }));
}

const ADD_COLORS = ["#2F6E6A", "#6A5A93", "#C16A3C", "#3F5B89", "#4E7A4A", "#A65A6B"];

export function useWorkspace() {
  const [mounted, setMounted] = useState(false);
  const [clients, setClients] = useState<Client[]>(() => cloneClients());

  const firstLive = clients.find((c) => !c.onboarding) || clients[0];
  const [activeCode, setActiveCode] = useState<string>(firstLive.code);

  // Hydrate saved links from the browser after mount (avoids SSR mismatch).
  useEffect(() => {
    setMounted(true);
    const s = loadStore();
    setClients((prev) =>
      prev.map((c) => (s[c.code] ? { ...c, links: { ...c.links, ...s[c.code] } } : c)),
    );
  }, []);

  const active = useMemo(
    () => clients.find((c) => c.code === activeCode) || clients[0],
    [clients, activeCode],
  );

  const selectClient = useCallback((code: string) => setActiveCode(code), []);

  const setLink = useCallback(
    (id: string, value: string) => {
      const trimmed = value.trim();
      setClients((prev) =>
        prev.map((c) =>
          c.code === activeCode ? { ...c, links: { ...c.links, [id]: trimmed } } : c,
        ),
      );
      const s = loadStore();
      const current = clients.find((c) => c.code === activeCode);
      s[activeCode] = { ...(current?.links ?? {}), [id]: trimmed };
      saveStore(s);
    },
    [activeCode, clients],
  );

  const addClient = useCallback(
    (name: string): boolean => {
      const clean = name.trim();
      if (!clean) return false;
      const code = clean.replace(/[^A-Za-z0-9]/g, "").slice(0, 4).toUpperCase() || "NEW";
      const blank: Record<string, string> = {};
      [...CONFIG.intelModules, ...CONFIG.growthModules].forEach((m) => (blank[m.id] = ""));
      setClients((prev) => {
        const c: Client = {
          code,
          name: clean,
          tag: "Brand Intelligence · Live",
          color: ADD_COLORS[prev.length % ADD_COLORS.length],
          status: "live",
          links: blank,
        };
        return [...prev, c];
      });
      setActiveCode(code);
      return true;
    },
    [],
  );

  return { mounted, clients, active, activeCode, selectClient, setLink, addClient };
}
