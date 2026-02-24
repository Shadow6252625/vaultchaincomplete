"use client";

import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  icon?: string;
};

export function Input({ label, hint, icon, className, ...props }: Props) {
  return (
    <label className="group block">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/50">
        {icon && <span className="text-sm">{icon}</span>}
        {label}
      </div>
      <div className="relative">
        <input
          className={[
            "vc-ring w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25",
            "transition-all duration-200",
            "focus:border-[rgba(0,225,255,0.25)] focus:bg-white/[0.05]",
            "hover:border-white/12 hover:bg-white/[0.04]",
            className ?? "",
          ].join(" ")}
          style={{
            boxShadow: "0 2px 8px rgba(0,0,0,0.15) inset",
          }}
          {...props}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
          style={{
            boxShadow: "0 0 20px rgba(10,116,255,0.08)",
          }}
        />
      </div>
      {hint && (
        <div className="mt-2 text-[11px] text-white/35">{hint}</div>
      )}
    </label>
  );
}
