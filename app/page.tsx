"use client";

import { useCallback, useRef, useState } from "react";
import { CONFIG, getBcpUrl } from "@/lib/config";
import { useWorkspace } from "@/lib/useWorkspace";
import { TopBar } from "@/components/TopBar";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/Card";
import { ContextCard } from "@/components/ContextCard";
import { Bcp } from "@/components/Bcp";
import { GraphOverlay } from "@/components/GraphOverlay";

export default function Page() {
  const { clients, active, activeCode, selectClient, setLink, addClient } = useWorkspace();
  const [graphOpen, setGraphOpen] = useState(false);

  // toast
  const [toast, setToast] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setToastShow(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 2200);
  }, []);

  const handleAddClient = useCallback(() => {
    const name = window.prompt("New client name:");
    if (!name) return;
    if (addClient(name)) showToast(`${name.trim()} added`);
  }, [addClient, showToast]);

  const icpLive = !!(active.links.icp || "").trim();
  const bbLive = !!(active.links.brandbook || "").trim();

  return (
    <>
      <TopBar />

      <div className="shell">
        <Sidebar
          clients={clients}
          activeCode={activeCode}
          onSelect={selectClient}
          onAddClient={handleAddClient}
          onOpenGraph={() => setGraphOpen(true)}
        />

        <main className="main">
          <div className="page-head">
            <div>
              <h1 className="serif">
                Brand <span className="accent">Intelligence</span> &amp; Growth
              </h1>
              <p className="page-sub">
                One workspace. Every module connected to the live Brand
                Intelligence Layer for the active client.
              </p>
            </div>
            <div className="ctx-chip">
              Active client: <b>{active.name}</b>
            </div>
          </div>

          <section className="section">
            <div className="sec-head">
              <span className="sec-eyebrow">The Intelligence Layer</span>
              <span className="sec-title">Brand Intelligence</span>
              <span className="sec-rule" />
            </div>
            <div className="intel-layout">
              <div className="intel-left">
                {CONFIG.intelModules.map((m, i) => (
                  <Card
                    key={active.code + m.id}
                    mod={m}
                    url={active.links[m.id] || ""}
                    clientName={active.name}
                    index={i}
                    onSave={setLink}
                    onToast={showToast}
                  />
                ))}
              </div>
              <div>
                <ContextCard
                  key={active.code + "-ctx"}
                  icpLive={icpLive}
                  bbLive={bbLive}
                  index={CONFIG.intelModules.length}
                  onOpenGraph={() => setGraphOpen(true)}
                />
              </div>
            </div>

            <Bcp
              clientName={active.name}
              bcpUrl={getBcpUrl(active)}
              icpLive={icpLive}
              bbLive={bbLive}
            />
          </section>

          <section className="section">
            <div className="sec-head">
              <span className="sec-eyebrow">Execution</span>
              <span className="sec-title">Growth Modules</span>
              <span className="sec-rule" />
            </div>
            <div className="grid growth">
              {CONFIG.growthModules.map((m, i) => (
                <Card
                  key={active.code + m.id}
                  mod={m}
                  url={active.links[m.id] || ""}
                  clientName={active.name}
                  index={i}
                  onSave={setLink}
                  onToast={showToast}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      <GraphOverlay
        open={graphOpen}
        clientName={active.name}
        links={active.links}
        onClose={() => setGraphOpen(false)}
      />

      <div className={"toast" + (toastShow ? " show" : "")}>{toast}</div>
    </>
  );
}
