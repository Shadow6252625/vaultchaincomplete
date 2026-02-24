import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { VaultChainLogo } from "@/components/VaultChainLogo";

export default function NotFound() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 vc-grid opacity-25" />
      <div className="mx-auto flex min-h-[calc(100dvh-56px)] w-full max-w-7xl items-center px-6 py-14">
        <div className="vc-glass w-full rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-4">
            <div
              className="rounded-2xl p-3"
              style={{
                background:
                  "linear-gradient(145deg, rgba(10,116,255,0.25), rgba(0,225,255,0.10))",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.10) inset, 0 0 24px rgba(10,116,255,0.15), 0 8px 32px rgba(0,0,0,0.30)",
              }}
            >
              <VaultChainLogo size={28} />
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                Route not found
              </div>
              <div className="mt-1 text-sm text-white/45">
                This vault path doesn&apos;t exist or is not yet initialized.
              </div>
            </div>
          </div>

          <div className="vc-glow-line mt-8 opacity-40" />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/launch">
              <Button type="button">Back to Launch</Button>
            </Link>
            <Link href="/setup">
              <Button type="button" variant="ghost">
                Initialize a Vault
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
