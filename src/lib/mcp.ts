import { randomUUID } from "crypto";

import {
  insforge_init_vault,
  insforge_fetch_dashboard,
  insforge_add_asset,
  insforge_run_audit
} from "./insforge-backend";

type McpExecuteResponse<T> = {
  ok: boolean;
  result?: T;
  error?: string;
  mock?: boolean;
  raw?: unknown;
};

function getMcpExecuteUrl() {
  const base = process.env.MCP_URL;
  if (!base || base === "internal") return null;
  try {
    return new URL("/execute", base).toString();
  } catch {
    return null;
  }
}

export async function executeMcpTask<T>(
  task: string,
  data: unknown,
  opts?: { timeoutMs?: number }
): Promise<McpExecuteResponse<T>> {
  const executeUrl = getMcpExecuteUrl();

  // If no URL or 'internal', use the wired backend logic
  if (!executeUrl) {
    try {
      const result = await runInternalMcpTask(task, data);
      return { ok: true, result: result as T, raw: result };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Internal Task Error" };
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    Math.max(1000, opts?.timeoutMs ?? 15000)
  );

  try {
    const res = await fetch(executeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, data }),
      signal: controller.signal,
      cache: "no-store",
    });

    const text = await res.text();
    const json = text ? safeJsonParse(text) : null;
    const unwrapped = unwrapMcpResult(json);

    if (!res.ok) {
      return {
        ok: false,
        error: `MCP responded ${res.status}`,
        raw: json ?? text,
      };
    }

    return { ok: true, result: (unwrapped as T) ?? ({} as T), raw: json };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    // Fallback to internal if fetch fails? Or just report error.
    // Given the user wants it "wired here", let's fallback to internal if fetch fails.
    console.error("MCP Fetch failed, falling back to internal backend:", msg);
    try {
      const result = await runInternalMcpTask(task, data);
      return { ok: true, result: result as T, raw: result, mock: true };
    } catch {
      return { ok: false, error: msg };
    }
  } finally {
    clearTimeout(timeout);
  }
}

async function runInternalMcpTask(task: string, data: any): Promise<any> {
  switch (task) {
    case "vaultchain_init_vault":
      return await insforge_init_vault(data);
    case "vaultchain_fetch_dashboard":
      return await insforge_fetch_dashboard(data.vault_id);
    case "vaultchain_add_asset":
      return await insforge_add_asset(data.vault_id, data.asset);
    case "vaultchain_run_audit":
      return await insforge_run_audit(data.vault_id);
    case "vaultchain_export_vault":
      return { ok: true, export_id: randomUUID(), download_url: null };
    default:
      console.warn(`Unknown task: ${task}, using basic response`);
      return { ok: true };
  }
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function unwrapMcpResult(json: unknown) {
  if (!json || typeof json !== "object") return json;
  const obj = json as Record<string, unknown>;
  if ("result" in obj) return obj.result;
  if ("data" in obj) return obj.data;
  if ("output" in obj) return obj.output;
  return json;
}


