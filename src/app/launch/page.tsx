"use client";

import { useRouter } from "next/navigation";
import { AnimatedVaultLock } from "@/components/launch/AnimatedVaultLock";
import { Button } from "@/components/ui/Button";

export default function LaunchPage() {
  const router = useRouter();

  return (
    <main className="relative overflow-hidden h-[calc(100dvh-56px)] flex items-center justify-center">
      <div className="pointer-events-none absolute inset-0 vc-grid opacity-30" />

      {/* Hero glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(10,116,255,0.20), transparent 55%)",
          }}
        />
        <div
          className="absolute right-[-10%] top-[15%] h-[400px] w-[400px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0,225,255,0.10), transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-16 scale-110 md:scale-125">
        {/* Animated Vault Logo */}
        <div className="flex items-center justify-center">
          <AnimatedVaultLock />
        </div>

        {/* Initialization Button */}
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={() => router.push('/setup')}
            className="px-12 py-7 rounded-3xl text-sm font-bold uppercase tracking-widest shadow-[0_20px_50px_rgba(10,116,255,0.3)] hover:shadow-[0_20px_60px_rgba(10,116,255,0.5)]"
          >
            Initialize Secure Vault
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="ml-2">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </div>
    </main>
  );
}
