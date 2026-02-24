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
          href="/launch"
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
          {[
            { href: "/launch", label: "Launch" },
            { href: "/setup", label: "Setup" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`vc-ring relative rounded-xl px-4 py-2 text-[13px] font-semibold transition-colors duration-200 ${pathname === href ? "text-white" : "text-white/60 hover:text-white"
                }`}
            >
              <span className="relative z-10">{label}</span>
              <span
                className={`pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-200 ${pathname === href ? "opacity-100" : "opacity-0 hover:opacity-100"
                  }`}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
