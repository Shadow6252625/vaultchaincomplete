export type VaultInitInput = {
  vault_name: string;
  owner_id: string;
  access_tier: string;
  rpc_endpoint: string;
  api_key: string;
  network: string;
  encryption_key: string;
  recovery_phrase: string;
  backup_email: string;
  permissions: {
    agent_signing: boolean;
    audit_trail: boolean;
  };
};

export type VaultInitResponse = { vault_id: string; mock?: boolean };

export type DashboardResponse = {
  vault: {
    id: string;
    name: string;
    owner_id: string;
    access_tier: string;
    network: string;
    rpc_endpoint?: string;
    created_at: string;
  };
  assets: Array<{
    id: string;
    name: string;
    kind: string;
    encrypted_size: string;
    created_at: string;
    status: "sealed" | "pending" | "exported";
  }>;
  logs: Array<{
    id: string;
    at: string;
    actor: string;
    action: string;
    detail?: string;
  }>;
  security: Array<{ at: string; score: number; anomalies: number }>;
  mock?: boolean;
};

