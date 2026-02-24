import { executeMcpTask } from "@/lib/mcp";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const res = await executeMcpTask("vaultchain_add_asset", data);
  if (!res.ok) {
    return NextResponse.json(
      { error: res.error ?? "Failed to add asset", raw: res.raw },
      { status: 502 }
    );
  }

  return NextResponse.json(res.result ?? res.raw ?? { ok: true });
}

