import { executeMcpTask } from "@/lib/mcp";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const res = await executeMcpTask("vaultchain_run_audit", data);
  if (!res.ok) {
    return NextResponse.json(
      { error: res.error ?? "Failed to run audit", raw: res.raw },
      { status: 502 }
    );
  }

  return NextResponse.json(res.result ?? res.raw ?? { ok: true });
}

