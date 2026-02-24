"use client";

import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

type Props = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onDragEnter" | "onDragLeave" | "onDragOver" | "onDrop"
> &
  MotionProps & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: Props) {
  const base =
    "vc-ring relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-[13px] font-semibold tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  return (
    <motion.button
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={[
        base,
        variant === "primary"
          ? "text-white"
          : "text-white/70 hover:text-white border border-white/10 hover:border-white/15 bg-white/[0.03] hover:bg-white/[0.06]",
        className ?? "",
      ].join(" ")}
      style={
        variant === "primary"
          ? {
              background:
                "linear-gradient(135deg, rgba(10,116,255,1) 0%, rgba(0,180,255,0.85) 50%, rgba(0,225,255,0.70) 100%)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.12) inset, 0 1px 0 0 rgba(255,255,255,0.10) inset, 0 16px 48px rgba(10,116,255,0.25), 0 2px 8px rgba(0,0,0,0.3)",
            }
          : undefined
      }
      {...props}
    >
      {variant === "primary" && (
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {props.children}
      </span>
    </motion.button>
  );
}
