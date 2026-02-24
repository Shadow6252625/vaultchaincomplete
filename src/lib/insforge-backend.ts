import { randomUUID } from "crypto";
import type {
    VaultInitInput,
    VaultInitResponse,
    DashboardResponse
} from "./vaultchain-types";

// Simple in-memory storage for demonstration (resets on server restart)
const vaults = new Map<string, any>();
const assets = new Map<string, any[]>();
const logs = new Map<string, any[]>();

export async function insforge_init_vault(data: VaultInitInput): Promise<VaultInitResponse> {
    const vault_id = randomUUID();
    const now = new Date().toISOString();

    createVaultEntry(vault_id, {
        name: data.vault_name || "VaultChain Prime",
        owner_id: data.owner_id || "owner_demo",
        access_tier: data.access_tier || "Operator",
        network: data.network || "Solana",
        rpc_endpoint: data.rpc_endpoint,
        created_at: now,
    });

    return { vault_id };
}

export async function insforge_fetch_dashboard(vault_id: string): Promise<DashboardResponse> {
    let vault = vaults.get(vault_id);

    // If no vault exists (e.g. after restart), auto-create one with "Prime" defaults
    if (!vault) {
        vault = createVaultEntry(vault_id, {
            name: "VaultChain Prime",
            owner_id: "agent_admin",
            access_tier: "Maximum",
            network: "Solana",
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        });
    }

    const now = Date.now();
    const iso = (ms: number) => new Date(ms).toISOString();
    const security = Array.from({ length: 14 }).map((_, i) => ({
        at: iso(now - (13 - i) * 3600_000),
        score: 88 + Math.round(Math.sin(i) * 4),
        anomalies: i % 10 === 0 ? 0 : 0,
    }));

    return {
        vault,
        assets: assets.get(vault_id) || [],
        logs: logs.get(vault_id) || [],
        security,
    };
}

export async function insforge_add_asset(vault_id: string, asset: any) {
    // Ensure vault exists
    if (!vaults.has(vault_id)) {
        createVaultEntry(vault_id);
    }

    const list = assets.get(vault_id) || [];
    const newAsset = {
        id: randomUUID(),
        name: asset.name || "Enclave Asset Bundle",
        kind: asset.kind || "encrypted_blob",
        encrypted_size: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
        created_at: new Date().toISOString(),
        status: "sealed",
    };
    list.unshift(newAsset);
    assets.set(vault_id, list);

    const logList = logs.get(vault_id) || [];
    logList.unshift({
        id: randomUUID(),
        at: new Date().toISOString(),
        actor: "agent:v-core",
        action: "asset.seal",
        detail: `Secured ${newAsset.name} with AES-GCM-256`,
    });
    logs.set(vault_id, logList);

    return { ok: true, asset_id: newAsset.id };
}

export async function insforge_run_audit(vault_id: string) {
    if (!vaults.has(vault_id)) createVaultEntry(vault_id);

    const logList = logs.get(vault_id) || [];
    logList.unshift({
        id: randomUUID(),
        at: new Date().toISOString(),
        actor: "system:auditor",
        action: "audit.full_scan",
        detail: "Zero-knowledge proofs verified. Integrity status: POSITIVE.",
    });
    logs.set(vault_id, logList);

    return { ok: true, findings: 0 };
}

// Helper to ensure we always have a high-quality vault entry
function createVaultEntry(id: string, defaults?: any) {
    const now = new Date().toISOString();
    const entry = {
        id,
        name: defaults?.name || "VaultChain Prime",
        owner_id: defaults?.owner_id || "agent_system",
        access_tier: defaults?.access_tier || "Operator",
        network: defaults?.network || "Solana",
        rpc_endpoint: defaults?.rpc_endpoint || "https://api.mainnet-beta.solana.com",
        created_at: defaults?.created_at || now,
    };

    vaults.set(id, entry);

    // Set initial assets if empty
    if (!assets.has(id)) {
        assets.set(id, [
            { id: randomUUID(), name: "Infrastructure Identity Key", kind: "signing_key", encrypted_size: "248 B", created_at: entry.created_at, status: "sealed" },
            { id: randomUUID(), name: "Security Policy Manifest", kind: "policy", encrypted_size: "14 KB", created_at: entry.created_at, status: "sealed" },
            { id: randomUUID(), name: "Neural Link Encryption", kind: "neural_vault", encrypted_size: "1.2 MB", created_at: entry.created_at, status: "sealed" },
            { id: randomUUID(), name: "Biometric Hash Store", kind: "biometric", encrypted_size: "45 KB", created_at: entry.created_at, status: "sealed" },
            { id: randomUUID(), name: "Quantum-Resistant Layer", kind: "quantum_mod", encrypted_size: "890 KB", created_at: entry.created_at, status: "sealed" },
            { id: randomUUID(), name: "Vault Access Token #04", kind: "auth_token", encrypted_size: "1.1 KB", created_at: entry.created_at, status: "sealed" },
            { id: randomUUID(), name: "Encrypted Ledger Backup", kind: "ledger", encrypted_size: "3.4 MB", created_at: entry.created_at, status: "sealed" },
            { id: randomUUID(), name: "API Gateway Secrets", kind: "secrets", encrypted_size: "12 KB", created_at: entry.created_at, status: "sealed" },
            { id: randomUUID(), name: "Recovery Phrase Fragment", kind: "recovery", encrypted_size: "512 B", created_at: entry.created_at, status: "sealed" },
            { id: randomUUID(), name: "System Integrity Root", kind: "root_at", encrypted_size: "2.5 KB", created_at: entry.created_at, status: "sealed" },
        ]);
    }

    // Set initial logs if empty
    if (!logs.has(id)) {
        logs.set(id, [
            {
                id: randomUUID(),
                at: entry.created_at,
                actor: "system",
                action: "vault.init",
                detail: `Vault parameters hardened on ${entry.network} L1`,
            }
        ]);
    }

    return entry;
}
