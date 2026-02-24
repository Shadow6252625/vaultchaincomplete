"use client";

import * as React from "react";
const { useMemo, useState, useEffect, lazy, Suspense } = React;
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { DashboardResponse } from "@/lib/vaultchain-types";

// Dynamically import heavy chart component
const SecurityGraph = lazy(() => import("@/components/dashboard/SecurityGraph"));


type ActionStatus =
  | { kind: "idle" }
  | { kind: "running"; label: string }
  | { kind: "done"; label: string }
  | { kind: "error"; message: string };

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 100 } },
};

export function DashboardClient({
  initial,
  forcedTab,
}: {
  initial: DashboardResponse;
  forcedTab?: string;
}) {
  const [status, setStatus] = useState<ActionStatus>({ kind: "idle" });
  const [data, setData] = useState<DashboardResponse>(initial);
  const [activeTab, setActiveTab] = useState(forcedTab || "overview");

  const vaultId = data.vault.id;

  async function refresh() {
    const res = await fetch(`/api/dashboard/${encodeURIComponent(vaultId)}`, {
      cache: "no-store",
    });
    const json = (await res.json()) as DashboardResponse & { error?: string };
    if (!res.ok) throw new Error(json?.error ?? "Refresh failed");
    setData(json);
  }

  async function run(label: string, fn: () => Promise<void>) {
    setStatus({ kind: "running", label });
    try {
      await fn();
      setStatus({ kind: "done", label });
      setTimeout(() => setStatus({ kind: "idle" }), 1400);
    } catch (e) {
      setStatus({
        kind: "error",
        message: e instanceof Error ? e.message : "Action failed",
      });
    }
  }

  const busy = status.kind === "running";

  const [formattedDate, setFormattedDate] = useState(data.vault.created_at);

  React.useEffect(() => {
    try {
      setFormattedDate(new Date(data.vault.created_at).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      }));
    } catch {
      setFormattedDate(data.vault.created_at);
    }
  }, [data.vault.created_at]);

  const latestScore = data.security[data.security.length - 1]?.score ?? 0;

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      {/* Premium Sidebar */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-8">
          <div className="px-2">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Vault <span className="text-accent">X</span>
            </h2>
            <p className="mt-1 text-xs text-white/30 uppercase tracking-[0.2em]">Management Interface</p>
          </div>

          <nav className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: <OverviewIcon />, path: `/dashboard/${vaultId}` },
              { id: "assets", label: "Encrypted Assets", icon: <AssetIcon />, path: `/dashboard/${vaultId}/assets` },
              { id: "security", label: "Security Audit", icon: <SecurityIcon />, path: `/dashboard/${vaultId}/security` },
              { id: "logs", label: "Access Control", icon: <LogIcon />, path: `/dashboard/${vaultId}/logs` },
            ].map((tab) => (
              <Link
                key={tab.id}
                href={tab.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                  ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
              >
                <span className={activeTab === tab.id ? "text-accent" : "text-inherit opacity-50"}>
                  {tab.icon}
                </span>
                {tab.label}
              </Link>
            ))}
          </nav>

          <div className="vc-glass rounded-3xl p-5 border-accent/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Status</span>
            </div>
            <div className="text-sm font-semibold text-white/90">System Hardened</div>
            <div className="mt-1 text-[11px] text-white/30 leading-relaxed">
              Real-time enclave shielding is currently active.
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 pb-20">
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold tracking-widest text-white/40 uppercase">
                {data.vault.network} Enclave
              </span>
              <span className="text-white/20">/</span>
              <span className="text-[11px] font-mono text-white/40">{vaultId}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              {data.vault.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              disabled={busy}
              className="px-6 py-6 rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-shadow"
              onClick={() =>
                run("Add Asset", async () => {
                  const res = await fetch("/api/vault/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      vault_id: vaultId,
                      asset: { name: "New Encrypted Asset", kind: "blob" },
                    }),
                  });
                  if (!res.ok) throw new Error("Add asset failed");
                  await refresh();
                })
              }
            >
              {busy ? "Sealing..." : "Seal New Asset"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={busy}
              className="p-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10"
              onClick={refresh}
            >
              <RefreshIcon />
            </Button>
          </div>
        </div>

        {/* Global Error Notice */}
        <AnimatePresence>
          {status.kind === "error" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="vc-glass border-red-500/20 bg-red-500/5 rounded-2xl p-4 text-sm text-red-200 flex items-center gap-3">
                <span className="text-red-400">⚠️</span>
                {status.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Multi-Tab Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {activeTab === "overview" && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { label: "Network Architecture", value: data.vault.network, trend: "Stable", icon: <OverviewIcon /> },
                  { id: "tier", label: "Enclave Tier", value: data.vault.access_tier, trend: "Maximum", icon: <SecurityIcon /> },
                  { label: "Total Assets", value: String(data.assets.length), trend: "+10 this week", icon: <AssetIcon /> },
                  { id: "health", label: "Security Health", value: `${latestScore}%`, trend: "Optimal", accent: true, icon: <HealthIcon /> },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    variants={item}
                    className="vc-card vc-card-hover rounded-3xl p-6 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <StatHexIcon />
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-3">
                      {stat.label}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl font-bold tracking-tight ${stat.accent ? "bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary" : "text-white"}`}>
                        {stat.value}
                      </div>
                      {stat.icon && (
                        <div className="opacity-40 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100 origin-left">
                          {stat.icon}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 font-medium">
                      <span className="text-[10px] text-accent">●</span>
                      <span className="text-[10px] text-white/40">{stat.trend}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Central Dashboard View */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Security Visualization */}
                <motion.section
                  variants={item}
                  className="vc-card rounded-[3rem] p-8 lg:col-span-2 relative overflow-hidden group"
                >
                  {/* Section Background Video - Optimized */}
                  <div className="absolute inset-0 -z-10 bg-[#0b0c10]">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      poster="/trust-poster.png"
                      className="h-full w-full object-cover opacity-60 mix-blend-screen"
                      style={{
                        filter: "brightness(0.6) contrast(1.1)",
                        willChange: "transform"
                      }}
                      onMouseOver={(e) => e.currentTarget.play()} // Play on interaction if preload none
                    >
                      <source src="/trust-propagation-bg.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0b0c10]/80 via-transparent to-[#0b0c10]/90" />
                  </div>

                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">Trust Propagation</h3>
                      <p className="text-xs text-white/40 mt-1 uppercase tracking-widest font-semibold font-mono">Real-time security score audits over time</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        <span className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Audit Score</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <Suspense fallback={
                      <div className="h-60 w-full flex items-center justify-center bg-white/5 rounded-2xl animate-pulse">
                        <div className="text-white/20 text-xs font-mono uppercase tracking-widest">Initialising Audit Visualization...</div>
                      </div>
                    }>
                      <SecurityGraph data={data.security} />
                    </Suspense>
                  </div>
                </motion.section>

                {/* Info Card */}
                <motion.section
                  variants={item}
                  className="vc-glass border-white/5 bg-white/[0.02] rounded-[2.5rem] p-8 lg:col-span-1 flex flex-col"
                >
                  <div className="mb-8">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-4">
                      <VaultIcon />
                    </div>
                    <h3 className="text-lg font-bold text-white">Vault Configuration</h3>
                    <p className="text-xs text-white/40 mt-1">Infrastructure parameters</p>
                  </div>

                  <div className="space-y-5 flex-1">
                    <KV k="Active Network" v={data.vault.network} />
                    <KV k="Access Tier" v={data.vault.access_tier} />
                    <KV k="Enclave Controller" v={data.vault.owner_id} mono />
                    <KV k="Initialized Date" v={formattedDate} />
                    <KV k="Mode" v={data.mock ? "Simulated Enclave" : "Native MCP Core"} />
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/5">
                    <button
                      onClick={() => run("Export", async () => { })}
                      className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 text-sm font-semibold transition-all"
                    >
                      Generate Export Token
                    </button>
                  </div>
                </motion.section>
              </div>
            </>
          )}

          {activeTab === "assets" && (
            <motion.div variants={item} className="vc-card rounded-[2.5rem] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Encrypted Assets</h3>
                  <p className="text-xs text-white/40">Secure objects stored within this enclave</p>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-[11px] font-bold text-accent">
                  {data.assets.length} Total items
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 border-b border-white/5">
                      <th className="px-8 py-5">Asset Identifier</th>
                      <th className="px-8 py-5">Classification</th>
                      <th className="px-8 py-5 text-right">Encrypted Size</th>
                      <th className="px-8 py-5 text-center">Enclave Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.assets.map((a) => (
                      <tr key={a.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-accent transition-colors">
                              <FileIcon />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-accent transition-colors">{a.name}</div>
                              <div className="mt-0.5 font-mono text-[10px] text-white/20">{a.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-2 py-1 rounded-md bg-white/5 text-[11px] font-medium text-white/50">{a.kind}</span>
                        </td>
                        <td className="px-8 py-6 text-right font-mono text-sm text-white/40">
                          {a.encrypted_size}
                        </td>
                        <td className="px-8 py-6 text-center">
                          <StatusPill status={a.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "logs" && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="vc-glass rounded-3xl p-6">
                  <h3 className="text-sm font-bold text-white mb-4">Event Filtering</h3>
                  <div className="space-y-3">
                    {['All Events', 'System Alerts', 'User Actions', 'Enclave Faults'].map((f, i) => (
                      <button key={f} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold ${i === 0 ? 'bg-accent/10 border border-accent/20 text-accent' : 'text-white/30 hover:text-white/50'}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-1 px-4">
                  <p className="text-[10px] leading-relaxed text-white/20">
                    Logs are immutable and stored with SHA-256 integrity checks. Any tampering will invalidate the enclave state.
                  </p>
                </div>
              </div>

              <motion.div variants={item} className="lg:col-span-3 space-y-4">
                {data.logs.map((l) => (
                  <div
                    key={l.id}
                    className="vc-card hover:border-white/20 transition-all rounded-[1.5rem] p-6 flex flex-col sm:flex-row gap-6 items-start"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-white/40">
                      <ClockIcon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-md bg-accent/5 border border-accent/10 text-[10px] font-bold text-accent uppercase tracking-widest leading-none">
                            {l.action}
                          </span>
                          <span className="text-[10px] font-bold text-white/20 px-2 py-1 bg-white/5 rounded-md uppercase tracking-wider">
                            ID: {l.id.slice(0, 8)}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-white/30" suppressHydrationWarning>
                          {new Date(l.at).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70 font-semibold mb-2">
                        <span className="text-accent/40">Actor:</span>
                        <span className="font-mono">{l.actor}</span>
                      </div>
                      {l.detail && (
                        <p className="text-[12px] text-white/40 leading-relaxed font-medium">
                          {l.detail}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

function KV({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-[11px] font-bold uppercase tracking-widest text-white/20">{k}</div>
      <div
        className={`text-sm ${mono ? "font-mono text-accent/80" : "font-semibold text-white/90"
          }`}
      >
        {v}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "sealed" | "pending" | "exported" }) {
  const styles: Record<string, { bg: string; border: string; color: string }> = {
    sealed: {
      bg: "rgba(0,225,255,0.08)",
      border: "rgba(0,225,255,0.20)",
      color: "#00e1ff",
    },
    exported: {
      bg: "rgba(10,116,255,0.08)",
      border: "rgba(10,116,255,0.20)",
      color: "#0a74ff",
    },
    pending: {
      bg: "rgba(255,255,255,0.03)",
      border: "rgba(255,255,255,0.10)",
      color: "rgba(255,255,255,0.40)",
    },
  };
  const s = styles[status] ?? styles.pending;

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase border"
      style={{
        background: s.bg,
        borderColor: s.border,
        color: s.color,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
        style={{ background: "currentColor" }}
      />
      {status}
    </span>
  );
}

/* --- ICONS --- */

const OverviewIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
const AssetIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
);
const SecurityIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const LogIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
);
const StatHexIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4.9V17.1L12 22l-9-4.9V6.9z"></path></svg>
);
const VaultIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
);
const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const HealthIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent animate-pulse">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M12 8v8M8 12h8" opacity="0.6"></path>
  </svg>
);
