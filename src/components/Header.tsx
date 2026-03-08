"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { VaultChainLogo } from "@/components/VaultChainLogo";

export function Header() {
  const pathname = usePathname();

  // Hide header on launch page
  if (pathname === "/launch" || pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0b0c10]/70 backdrop-blur-2xl" />
        <div className="vc-glow-line absolute inset-x-0 bottom-0" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3.5">
        <Link
          href="/"
          className="pointer-events-auto group flex items-center gap-3"
        >
          <div
            className="relative overflow-hidden rounded-2xl p-[10px] transition-transform duration-300 group-hover:scale-105"
            style={{
              background:
                "linear-gradient(145deg, rgba(10,116,255,0.30), rgba(0,225,255,0.12))",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.10) inset, 0 0 24px rgba(10,116,255,0.15), 0 8px 32px rgba(0,0,0,0.30)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(0,225,255,0.15), transparent 70%)",
              }}
            />
            <VaultChainLogo size={24} />
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-wider text-white uppercase">
              VaultChain
            </div>
            <div className="text-[10px] font-medium tracking-wide text-white/45">
              Encrypted On-Chain Vaults
            </div>
          </div>
        </Link>

        <nav className="pointer-events-auto flex items-center gap-1">
          <Link
            href="/setup"
            className={`vc-ring relative rounded-xl px-4 py-2 text-[13px] font-semibold transition-colors duration-200 ${pathname === "/setup" ? "text-white" : "text-white/60 hover:text-white"}`}
          >
            <span className="relative z-10">Setup</span>
            <span
              className={`pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-200 ${pathname === "/setup" ? "opacity-100" : "opacity-0 hover:opacity-100"}`}
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
          </Link>
          <Link
            href="/launch"
            className="inline-flex text-[12px] transition-all hover:brightness-110 font-light text-white tracking-tight font-geist h-9 rounded-full px-6 relative items-center justify-center group ml-2"
          >
            {/* Outer glow ring */}
            <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-r from-orange-400/20 via-amber-300/30 to-orange-400/20 shadow-[0_0_22px_rgba(248,181,129,0.55)] ring-1 ring-amber-300/60"></span>

            {/* Inner orange pill */}
            <span className="absolute inset-[3px] rounded-full pointer-events-none bg-gradient-to-b from-orange-400 via-orange-500 to-amber-300 shadow-[0_4px_12px_rgba(0,0,0,0.45)]"></span>

            {/* Soft bottom glow */}
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-4 rounded-full blur-xl pointer-events-none bg-amber-300/35"></span>

            {/* Label */}
            <span className="font-medium z-10 relative">Get Started Free</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
