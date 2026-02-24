import { executeMcpTask } from "@/lib/mcp";
import type { DashboardResponse } from "@/lib/vaultchain-types";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ vault_id: string }> }
) {
  const { vault_id } = await params;

  const res = await executeMcpTask<DashboardResponse>("vaultchain_fetch_dashboard", {
    vault_id,
  });

  if (!res.ok || !res.result) {
    return NextResponse.json(
      { error: res.error ?? "Failed to fetch dashboard", raw: res.raw },
      { status: 502 }
    );
  }

  return NextResponse.json({ ...res.result, mock: res.mock ?? false });
}

