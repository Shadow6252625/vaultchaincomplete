"use client";

import { motion } from "framer-motion";

export function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="vc-ring vc-card vc-card-hover flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left"
      style={{
        borderColor: checked
          ? "rgba(0,225,255,0.18)"
          : "rgba(255,255,255,0.08)",
        boxShadow: checked
          ? "0 0 0 1px rgba(0,225,255,0.12) inset, 0 0 40px rgba(0,225,255,0.05), 0 16px 48px rgba(0,0,0,0.35)"
          : undefined,
      }}
    >
      <div>
        <div className="text-sm font-semibold text-white">{label}</div>
        {description && (
          <div className="mt-1.5 text-xs leading-relaxed text-white/45">
            {description}
          </div>
        )}
      </div>

      <div
        className="relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200"
        style={{
          background: checked
            ? "linear-gradient(135deg, rgba(10,116,255,0.40), rgba(0,225,255,0.25))"
            : "rgba(255,255,255,0.06)",
          border: `1px solid ${checked ? "rgba(0,225,255,0.25)" : "rgba(255,255,255,0.10)"}`,
        }}
        aria-hidden
      >
        <motion.div
          className="absolute top-[3px] h-[19px] w-[19px] rounded-full"
          animate={{ x: checked ? 23 : 3 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          style={{
            background: checked
              ? "linear-gradient(135deg, #00e1ff, #0a74ff)"
              : "rgba(255,255,255,0.30)",
            boxShadow: checked
              ? "0 0 16px rgba(0,225,255,0.35), 0 2px 6px rgba(0,0,0,0.3)"
              : "0 1px 3px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    </button>
  );
}
