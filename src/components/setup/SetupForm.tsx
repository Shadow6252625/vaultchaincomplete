"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import type { VaultInitInput, VaultInitResponse } from "@/lib/vaultchain-types";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string };

const accessTiers = ["Viewer", "Operator", "Admin"] as const;
const networks = ["Solana", "Ethereum", "Polygon", "Arbitrum", "Base"] as const;

const sectionAnim = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export function SetupForm() {
  const router = useRouter();

  const [vaultName, setVaultName] = useState("VaultChain Prime");
  const [ownerId, setOwnerId] = useState("owner_demo");
  const [accessTier, setAccessTier] = useState<(typeof accessTiers)[number]>(
    "Operator"
  );

  const [rpcEndpoint, setRpcEndpoint] = useState(
    "https://api.mainnet-beta.solana.com"
  );
  const [apiKey, setApiKey] = useState("");
  const [network, setNetwork] = useState<(typeof networks)[number]>("Solana");

  const [encryptionKey, setEncryptionKey] = useState("");
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [backupEmail, setBackupEmail] = useState("");

  const [agentSigning, setAgentSigning] = useState(true);
  const [auditTrail, setAuditTrail] = useState(true);

  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const payload: VaultInitInput = useMemo(
    () => ({
      vault_name: vaultName,
      owner_id: ownerId,
      access_tier: accessTier,
      rpc_endpoint: rpcEndpoint,
      api_key: apiKey,
      network,
      encryption_key: encryptionKey,
      recovery_phrase: recoveryPhrase,
      backup_email: backupEmail,
      permissions: { agent_signing: agentSigning, audit_trail: auditTrail },
    }),
    [
      vaultName, ownerId, accessTier, rpcEndpoint, apiKey, network,
      encryptionKey, recoveryPhrase, backupEmail, agentSigning, auditTrail,
    ]
  );

  async function onSubmit() {
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/vault/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as VaultInitResponse & { error?: string };
      if (!res.ok || !json?.vault_id) {
        setStatus({
          kind: "error",
          message: json?.error ?? "Vault initialization failed",
        });
        return;
      }
      router.push(`/dashboard/${encodeURIComponent(json.vault_id)}`);
    } catch (e) {
      setStatus({
        kind: "error",
        message: e instanceof Error ? e.message : "Network error",
      });
    }
  }

  const disabled = status.kind === "submitting";

  return (
    <div className="vc-glass mx-auto w-full max-w-3xl rounded-3xl p-7 md:p-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Initialize Secure Vault
          </h2>
          <p className="mt-2 text-sm leading-7 text-white/45">
            Configure identity, integration, encryption, and permissions in one
            step before entering the dashboard.
          </p>
        </div>
        <div
          className="hidden shrink-0 items-center gap-2 rounded-xl px-3 py-1.5 text-[11px] font-semibold tracking-wide md:inline-flex"
          style={{
            background: "linear-gradient(135deg, rgba(10,116,255,0.12), rgba(0,225,255,0.06))",
            border: "1px solid rgba(0,225,255,0.10)",
            color: "rgba(0,225,255,0.80)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00e1ff]" style={{ boxShadow: "0 0 8px rgba(0,225,255,0.4)" }} />
          One-step setup
        </div>
      </div>

      <div className="mt-8 space-y-7">
        {/* Section 1: Vault Identity */}
        <motion.div {...sectionAnim} transition={{ delay: 0.05 }}>
          <SectionHeader icon="🏛️" title="Vault Identity" step={1} />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input label="Vault Name" icon="📝" value={vaultName} onChange={(e) => setVaultName(e.target.value)} placeholder="e.g. Treasury Alpha" disabled={disabled} />
            <Input label="Owner ID" icon="👤" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} placeholder="owner_123" disabled={disabled} />
            <label className="group block">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                <span className="text-sm">🎖️</span> Access Tier
              </div>
              <select
                className="vc-ring w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white transition-all duration-200 hover:border-white/12 hover:bg-white/[0.04] focus:border-[rgba(0,225,255,0.25)] focus:bg-white/[0.05]"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15) inset" }}
                value={accessTier}
                onChange={(e) => setAccessTier(e.target.value as (typeof accessTiers)[number])}
                disabled={disabled}
              >
                {accessTiers.map((t) => (
                  <option key={t} value={t} className="bg-[#0B0C10]">{t}</option>
                ))}
              </select>
            </label>
          </div>
        </motion.div>

        <div className="vc-glow-line opacity-40" />

        {/* Section 2: API Integration */}
        <motion.div {...sectionAnim} transition={{ delay: 0.10 }}>
          <SectionHeader icon="🔗" title="API Integration" step={2} />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input label="RPC Endpoint" icon="🌐" value={rpcEndpoint} onChange={(e) => setRpcEndpoint(e.target.value)} placeholder="https://..." disabled={disabled} />
            <Input label="API Key" icon="🔑" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="••••••••••••" disabled={disabled} />
            <label className="group block">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                <span className="text-sm">⛓️</span> Network
              </div>
              <select
                className="vc-ring w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white transition-all duration-200 hover:border-white/12 hover:bg-white/[0.04] focus:border-[rgba(0,225,255,0.25)] focus:bg-white/[0.05]"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15) inset" }}
                value={network}
                onChange={(e) => setNetwork(e.target.value as (typeof networks)[number])}
                disabled={disabled}
              >
                {networks.map((n) => (
                  <option key={n} value={n} className="bg-[#0B0C10]">{n}</option>
                ))}
              </select>
            </label>
          </div>
        </motion.div>

        <div className="vc-glow-line opacity-40" />

        {/* Section 3: Security */}
        <motion.div {...sectionAnim} transition={{ delay: 0.15 }}>
          <SectionHeader icon="🛡️" title="Security Parameters" step={3} />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input label="Encryption Key" icon="🔒" value={encryptionKey} onChange={(e) => setEncryptionKey(e.target.value)} placeholder="kdf://..." disabled={disabled} />
            <Input label="Recovery Phrase" icon="📜" value={recoveryPhrase} onChange={(e) => setRecoveryPhrase(e.target.value)} placeholder="twelve words..." disabled={disabled} />
            <Input label="Backup Email" icon="📧" value={backupEmail} onChange={(e) => setBackupEmail(e.target.value)} placeholder="security@domain.com" disabled={disabled} />
          </div>
          <div
            className="mt-4 rounded-xl p-4 text-[11px] leading-relaxed text-white/40"
            style={{
              background: "linear-gradient(135deg, rgba(10,116,255,0.06), rgba(0,225,255,0.03))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            This UI sends configuration to Insforge MCP. VaultChain does not
            store secrets locally by default.
          </div>
        </motion.div>

        <div className="vc-glow-line opacity-40" />

        {/* Section 4: Permissions */}
        <motion.div {...sectionAnim} transition={{ delay: 0.20 }}>
          <SectionHeader icon="⚙️" title="Permissions" step={4} />
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <Toggle
              label="Agent signing"
              description="Allow authorized agents to sign actions inside the vault."
              checked={agentSigning}
              onChange={setAgentSigning}
            />
            <Toggle
              label="Audit trail"
              description="Persist tamper-evident access logs and actions."
              checked={auditTrail}
              onChange={setAuditTrail}
            />
          </div>
        </motion.div>

        {/* Error */}
        {status.kind === "error" && (
          <div
            className="rounded-xl p-4 text-sm text-red-200"
            style={{
              background: "linear-gradient(135deg, rgba(255,60,60,0.10), rgba(255,60,60,0.04))",
              border: "1px solid rgba(255,80,80,0.15)",
            }}
          >
            {status.message}
          </div>
        )}

        {/* Footer */}
        <div className="vc-glow-line opacity-30" />
        <div className="flex flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center">
          <div className="text-[11px] text-white/35">
            Submitting will create a vault and redirect to its dashboard.
          </div>
          <Button type="button" onClick={onSubmit} disabled={disabled}>
            {disabled ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Creating Vault…
              </>
            ) : (
              <>
                Create Vault
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, step }: { icon: string; title: string; step: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="vc-section-icon">{icon}</div>
      <div>
        <div className="text-[13px] font-semibold text-white">{title}</div>
        <div className="text-[10px] font-medium text-white/30">Step {step}</div>
      </div>
    </div>
  );
}
