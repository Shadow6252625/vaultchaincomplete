import { executeMcpTask } from "@/lib/mcp";
import type { DashboardResponse } from "@/lib/vaultchain-types";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { BackgroundVideo } from "@/components/BackgroundVideo";

export default async function AssetsPage({
    params,
}: {
    params: Promise<{ vault_id: string }>;
}) {
    const { vault_id } = await params;

    const res = await executeMcpTask<DashboardResponse>("vaultchain_fetch_dashboard", {
        vault_id,
    });

    if (!res.ok || !res.result) {
        return (
            <main className="relative min-h-screen bg-[#0b0c10]">
                <BackgroundVideo src="/dashboard-main-bg.mp4" brightness={0.3} />
                <div className="mx-auto w-full max-w-7xl px-6 py-14 relative z-10">
                    <div className="vc-glass rounded-3xl p-8">
                        <div className="text-lg font-bold text-white">
                            Section unavailable
                        </div>
                        <div className="mt-2 text-sm text-white/45">
                            {res.error ?? "Failed to fetch asset data"}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    const initial: DashboardResponse = { ...res.result, mock: res.mock ?? false };

    return (
        <main className="relative min-h-screen bg-transparent">
            <BackgroundVideo src="/dashboard-main-bg.mp4" brightness={0.3} />
            <div className="mx-auto w-full max-w-7xl px-6 py-10 relative z-10">
                <DashboardClient initial={initial} forcedTab="assets" />
            </div>
        </main>
    );
}
