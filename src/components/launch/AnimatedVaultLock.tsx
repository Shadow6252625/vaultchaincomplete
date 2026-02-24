"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AnimatedVaultLock() {
  return (
    <div className="relative mx-auto h-80 w-80">
      {/* Outer pulsing rings */}
      <motion.div
        className="absolute inset-[-30px] rounded-full"
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.95, 1.02, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(0,225,255,0.08) 0%, transparent 70%)",
          border: "1px solid rgba(0,225,255,0.06)",
        }}
      />
      <motion.div
        className="absolute inset-[-60px] rounded-full"
        animate={{ opacity: [0.08, 0.20, 0.08], scale: [0.98, 1.03, 0.98] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{
          background:
            "radial-gradient(circle, rgba(10,116,255,0.06) 0%, transparent 65%)",
          border: "1px solid rgba(10,116,255,0.04)",
        }}
      />

      {/* Scanline */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-px"
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,225,255,0.35), transparent)",
          boxShadow: "0 0 20px rgba(0,225,255,0.15)",
        }}
      />

      {/* Glow backdrop */}
      <div className="pointer-events-none absolute -inset-16 -z-10">
        <div
          className="absolute inset-0 animate-pulse-glow rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(0,225,255,0.18), transparent 55%), radial-gradient(circle at 65% 65%, rgba(10,116,255,0.16), transparent 55%)",
          }}
        />
      </div>

      {/* Main logo container with floating animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="relative rounded-[40px] p-2"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow:
              "0 0 0 1px rgba(0,225,255,0.08) inset, 0 24px 80px rgba(0,0,0,0.50), 0 0 60px rgba(10,116,255,0.10)",
          }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 40px rgba(10,116,255,0.15)",
                "0 0 60px rgba(0,225,255,0.20)",
                "0 0 40px rgba(10,116,255,0.15)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[36px] p-6"
            style={{
              background:
                "linear-gradient(145deg, rgba(10,116,255,0.15), rgba(0,225,255,0.06))",
            }}
          >
            <Image
              src="/vaultchain-logo.png"
              alt="VaultChain"
              width={180}
              height={180}
              priority
              className="drop-shadow-[0_0_30px_rgba(0,225,255,0.25)]"
            />


          </motion.div>
        </div>
      </motion.div>

      {/* Orbiting dots */}
      {[0, 120, 240].map((deg) => (
        <motion.div
          key={deg}
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
          animate={{ rotate: [deg, deg + 360] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "-60px 0",
            background:
              "radial-gradient(circle, rgba(0,225,255,0.80), rgba(10,116,255,0.40))",
            boxShadow: "0 0 12px rgba(0,225,255,0.40)",
          }}
        />
      ))}
    </div>
  );
}
