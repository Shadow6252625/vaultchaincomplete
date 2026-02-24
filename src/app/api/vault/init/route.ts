import { executeMcpTask } from "@/lib/mcp";
import type { VaultInitInput, VaultInitResponse } from "@/lib/vaultchain-types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let data: VaultInitInput;
  try {
    data = (await req.json()) as VaultInitInput;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const res = await executeMcpTask<VaultInitResponse>(
    "vaultchain_init_vault",
    data
  );

  if (!res.ok || !res.result?.vault_id) {
    return NextResponse.json(
      { error: res.error ?? "Failed to initialize vault", raw: res.raw },
      { status: 502 }
    );
  }

  return NextResponse.json({
    vault_id: res.result.vault_id,
    mock: res.mock ?? false,
  });
}

