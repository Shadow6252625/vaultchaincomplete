"use client";

import * as React from 'react';
const { useEffect } = React;
import Link from 'next/link';
import { Icon } from '@iconify/react';




const ForcedVideo = ({ src, className, preload = "auto", style = {} }: { src: string, className?: string, preload?: "auto" | "metadata" | "none", style?: React.CSSProperties }) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.play().catch(() => {
        const play = () => ref.current?.play();
        window.addEventListener('click', play, { once: true });
        window.addEventListener('scroll', play, { once: true });
      });
    }
  }, [src]);
  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      className={className}
      style={style}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default function LandingPage() {
  React.useEffect(() => {
    // Force transparency for fixed background to show through
    document.body.style.background = 'transparent';
    document.documentElement.style.background = 'transparent';

    // Initialize Unicorn Studio if script is already present (from layout.tsx)
    const initUnicorn = () => {
      if (window.UnicornStudio && typeof window.UnicornStudio.init === "function") {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      } else {
        // Retry if script hasn't loaded yet
        setTimeout(initUnicorn, 500);
      }
    };

    initUnicorn();

    // Billing Toggle logic
    const setupBillingToggle = () => {
      const el = document.getElementById("aura-emf5jfuh5");
      if (!el) return;
      const toggle = el.querySelector("#billingToggle");
      const price = el.querySelector("#price");
      const unit = el.querySelector("#priceUnit");
      const desc = el.querySelector("#planDesc");
      const title = el.querySelector("#planTitle");
      const addon = el.querySelector("#addonNote");
      const scope = el.querySelector("#featureScope");
      const eta = el.querySelector("#etaValue");

      const states = {
        monthly: {
          price: "500",
          unit: "AVAX",
          title: "Validator Node",
          desc: "Ongoing support and flexible security when you need it. Ideal for startups, growing brands, and marketing teams needing consistent uptime.",
          addon: "Optional Audit add‑on (800 AVAX)",
          scope: "One active validator slot",
          eta: "< 5 mins",
        },
        project: {
          price: "2000",
          unit: "AVAX",
          title: "Enterprise Node",
          desc: "Focused, milestone‑driven engagement for a defined scope. Perfect for launches, rebrands, or site upgrades.",
          addon: "Add‑ons available by scope",
          scope: "Unlimited slots & milestones",
          eta: "Instant",
        },
      };

      function setBilling(mode: "monthly" | "project") {
        const s = states[mode];
        if (!s || !price || !unit || !title || !desc || !addon || !scope || !eta || !toggle) return;
        price.textContent = s.price;
        unit.textContent = s.unit;
        title.textContent = s.title;
        desc.textContent = s.desc;
        addon.textContent = s.addon;
        scope.textContent = s.scope;
        eta.textContent = s.eta;

        toggle.querySelectorAll("[data-billing]").forEach((btn) => {
          const active = btn.getAttribute("data-billing") === mode;
          btn.setAttribute("aria-pressed", String(active));
          btn.classList.toggle("bg-neutral-100", active);
          btn.classList.toggle("text-black", active);
          btn.classList.toggle("text-neutral-300", !active);
        });
      }

      if (toggle) {
        toggle.addEventListener("click", (e) => {
          const btn = (e.target as HTMLElement).closest("[data-billing]");
          if (!btn) return;
          setBilling(btn.getAttribute("data-billing") as "monthly" | "project");
        });
      }
    };

    setupBillingToggle();
  }, []);

  return (
    <div className="min-h-screen antialiased text-zinc-100 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap");
        html { scroll-behavior: smooth; }
        .font-geist { font-family: "Geist", sans-serif !important; }
        @keyframes letterSlideIn {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        main > section {
          content-visibility: auto;
          contain-intrinsic-size: 1px 800px;
        }
        .vc-hardware-accel {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>

      {/* FIXED BLUE BACKGROUND AURA */}
      <div id="homeAuraBg" className="fixed inset-0 w-full h-full -z-10">
        <div data-us-project="x6cbPWi9roeeiZ8cuBu3" className="absolute inset-0 w-full h-full"></div>
      </div>

      {/* Nav */}
      <nav id="topNav" className="sticky top-4 z-50 max-w-6xl mx-auto px-6 py-2 bg-neutral-950/80 rounded-3xl mt-4 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-x-1 items-center">
            <span className="w-14 h-12 bg-[url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/531cf86b-c775-422c-bec2-7f64f47b9def_320w.png')] bg-cover bg-center"></span>
            <span className="text-xl font-bold text-neutral-100 font-geist tracking-tight">VaultChain</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-8">
              <a href="#journey" className="text-sm font-geist text-neutral-400 hover:text-white transition-colors">Mission</a>
              <a href="#capabilities" className="text-sm font-geist text-neutral-400 hover:text-white transition-colors">Ecosystem</a>
              <a href="#results" className="text-sm font-geist text-neutral-400 hover:text-white transition-colors">Protocol</a>
            </div>
            <Link
              href="/launch"
              className="relative group overflow-hidden px-8 py-2.5 rounded-full font-geist text-xs font-bold text-white shadow-2xl transition-all hover:scale-105 active:scale-95 block"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-600 to-amber-300"></span>
              <span className="relative z-10">Access Vault</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="space-y-4 py-4">

        {/* 1. Hero Section */}
        <section className="px-6 overflow-hidden pt-4 pb-4 relative vc-hardware-accel">
          <div className="relative max-w-6xl mx-auto min-h-[600px] sm:min-h-[700px] flex flex-col bg-neutral-950 rounded-[40px] p-10 sm:p-20 overflow-hidden shadow-2xl border border-white/5">
            <ForcedVideo
              src="/asset/kling_20260223_Image_to_Video_Animate_a__6032_0.mp4"
              className="absolute inset-0 w-full h-full object-contain bg-black"
              style={{ objectPosition: 'center top' }}
              preload="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/80"></div>
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative z-10 flex flex-col h-full">
              <header className="mb-20">
                <h1 className="text-[12vw] sm:text-[9vw] font-semibold tracking-tighter text-white font-geist leading-none">
                  {["V", "A", "U", "L", "T"].map((char, i) => (
                    <span key={i} style={{ display: 'inline-block', animation: `letterSlideIn 0.8s ease-out ${i * 0.1}s forwards`, opacity: 0 }}>{char}</span>
                  ))}
                </h1>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-auto items-end">
                <div className="space-y-8">
                  <p className="text-sm text-neutral-300 font-geist max-w-xs border-l border-white/20 pl-4 py-2">Security-driven blockchain ecosystem for absolute data sovereignty.</p>
                  <Link
                    href="/launch"
                    className="bg-white text-black font-geist font-bold py-4 px-10 rounded-full flex items-center gap-2 group hover:scale-105 transition-all w-fit"
                  >
                    Explore Ecosystem <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
                <p className="text-2xl sm:text-3xl font-geist font-light tracking-tight text-neutral-300 leading-tight">
                  We secure the digital economy through <span className="text-white font-semibold">transparent</span>, <span className="text-neutral-500 italic">intelligent</span>, and <span className="text-white font-semibold">tamper-proof</span> systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Capabilities Section (Engineered for absolute data sovereignty) - RESTORED TO MATCH SCREENSHOT */}
        <section
          id="capabilities"
          className="px-6 py-1 vc-hardware-accel"
        >
          <div className="max-w-6xl mx-auto bg-neutral-950 rounded-[40px] p-4 sm:p-6 border border-white/5 space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-5xl md:text-7xl font-light text-white font-geist tracking-tighter mb-4">The engineers of trust.</h2>
              <p className="text-neutral-400 font-geist max-w-2xl mx-auto text-lg leading-relaxed">Our passionate team of cryptographers, strategists, and engineers who bring your security to life with expertise and dedication.</p>
            </div>

            <div className="bg-neutral-950 rounded-[30px] p-8 sm:p-12 relative overflow-hidden border border-white/5 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.02)_0%,transparent_70%)]">
              {/* Subtle Grid Lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20"></div>
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
                {/* Left Side Content */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
                  <div className="space-y-6">
                    <span className="text-xs font-medium text-neutral-500 font-geist">Core Architecture</span>
                    <h3 className="text-4xl md:text-6xl font-geist font-medium text-white tracking-tighter leading-[1.1] max-w-lg">Engineered for absolute data sovereignty.</h3>

                    <div className="flex gap-8 pt-4">
                      <span className="text-xs text-neutral-500 font-geist flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                        Zero Trust
                      </span>
                      <span className="text-xs text-neutral-500 font-geist flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20" /></svg>
                        Global Mesh
                      </span>
                      <span className="text-xs text-neutral-500 font-geist flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m13 2-2 10h3L11 22" /></svg>
                        1ms Latency
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/5">
                    <div className="space-y-4">
                      <p className="text-white font-geist font-bold text-sm">Next-gen Protocol</p>
                      <p className="text-neutral-400 text-[13px] leading-relaxed">Our proprietary consensus mechanism ensures that every transaction is validated by multiple independent nodes instantly.</p>
                      <button className="bg-white text-black text-xs font-bold px-6 py-2.5 rounded-full font-geist flex items-center gap-2 hover:bg-neutral-200 transition-all mt-2">
                        View Documentation <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm sm:text-base text-neutral-400 font-geist text-right leading-relaxed">Processing over <span className="text-white font-bold">1M+ TPS</span> with <span className="text-white font-bold">zero downtime</span> since the genesis block was minted.</p>
                    </div>
                  </div>
                </div>

                {/* Right Side 2x2 Grid (Matches Screenshot) */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                  {[
                    { t: "Quantum Guard", s: "Post-quantum standard", img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c789ed2b-70b7-48d0-8c47-6912b6ef9e7b_800w.webp", tag: "Encryption", icon: "lock" },
                    { t: "Deep Vault", s: "Immutable ledger", img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/49aac4dd-9624-4c88-ab00-4c68f0f0bfe8_800w.jpg", tag: "Storage", icon: "database" },
                    { t: "Flash Consensus", s: "<50ms block time", img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/569337a5-62c1-4f51-88bb-582a28e7ece2_800w.jpg", tag: "Speed", icon: "activity" },
                    { t: "Self-Sovereign", s: "Biometric keys", img: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/22b43084-893d-456c-bb46-04e3c6e78498_800w.jpg", tag: "Identity", icon: "user" }
                  ].map((item, i) => (
                    <div key={i} className="aspect-[1.1] rounded-2xl overflow-hidden relative group border border-white/10 bg-neutral-900 shadow-xl">
                      <img src={item.img} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" alt={item.t} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Top Left Icon */}
                      <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                        <Icon icon={`solar:${item.icon}-bold`} width="14" className="text-white/80" />
                      </div>

                      {/* Top Right Label */}
                      <div className="absolute top-3 right-3 bg-neutral-900/60 backdrop-blur-md px-2 py-0.5 rounded text-[9px] uppercase tracking-widest text-white/90 font-bold border border-white/10">
                        {item.tag}
                      </div>

                      {/* Bottom Text */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white font-geist font-bold text-base leading-tight tracking-tight">{item.t}</p>
                        <p className="text-white/50 font-geist text-[10px] mt-0.5">{item.s}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-3 gap-6 pt-10">
              {[["15+", "Team Members"], ["10M+", "Blocks Validated"], ["100%", "System Uptime"]].map(([v, l], i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-3xl text-center"><p className="text-3xl font-bold text-white tracking-tighter">{v}</p><p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-2">{l}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Node Licensing Section */}
        <section
          id="aura-emf5jfuh5"
          className="px-6 py-1 vc-hardware-accel"
        >
          <div className="max-w-6xl mx-auto bg-neutral-950 rounded-[40px] p-4 sm:p-10 border border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-8">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-light text-white font-geist tracking-tighter leading-none">Node Licensing</h2>
                <p className="text-neutral-400 font-geist text-lg max-w-2xl">Flexible options that match your scale. Built for validators, growing protocols, and teams that value security.</p>
              </div>
              <div id="billingToggle" className="bg-white/5 p-1.5 rounded-full border border-white/10 flex gap-1 h-fit backdrop-blur-md">
                <button data-billing="monthly" className="px-8 py-3 rounded-full text-sm font-bold font-geist text-black bg-white shadow-xl">Standard</button>
                <button data-billing="project" className="px-8 py-3 rounded-full text-sm font-bold font-geist text-neutral-400 hover:text-white transition-all">Enterprise</button>
              </div>
            </div>

            <div className="bg-neutral-900/60 rounded-[40px] border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-2 backdrop-blur-xl">
              <div className="p-8 md:p-12">
                <div className="bg-white rounded-[36px] p-10 text-black relative shadow-2xl scale-[1.02]">
                  <span className="absolute top-8 right-10 text-[9px] font-black text-neutral-400 uppercase tracking-[0.25em] font-geist">VaultChain®</span>
                  <p id="planTitle" className="text-xs font-bold text-neutral-400 mb-6 uppercase tracking-[0.2em] font-geist">Validator Node</p>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span id="price" className="text-7xl font-black tracking-tighter font-geist">500</span>
                    <span id="priceUnit" className="text-lg font-bold text-neutral-400 font-geist">AVAX</span>
                  </div>
                  <p id="planDesc" className="text-sm text-neutral-600 leading-relaxed max-w-xs font-geist mb-6">Ongoing support and flexible security when you need it. Ideal for startups and teams needing consistent creative momentum.</p>
                  <div className="pt-8 border-t border-black/5 flex justify-between items-center text-[10px] text-neutral-400 font-bold uppercase tracking-widest font-geist">
                    <span id="addonNote">Optional Audit add-on (800 AVAX)</span>
                    <div className="w-10 h-5 bg-neutral-100 border border-black/5 rounded-full relative shadow-inner"><div className="absolute left-1 top-1 bottom-1 w-3 bg-neutral-300 rounded-full"></div></div>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-between items-start space-y-12">
                <div className="space-y-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-black font-geist">What's included:</p>
                  <ul className="space-y-5">
                    {['Full ledger access', 'One active validator slot', '24/7 Monitoring', 'Fast finality times', 'Protocol consistency', 'Priority support', 'Pause or cancel anytime'].map((f, i) => (
                      <li key={i} className="flex gap-4 items-center text-sm text-neutral-200 font-geist">
                        <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="4"><path d="M20 6 9 17l-5-5" /></svg></div>
                        <span id={i === 1 ? 'featureScope' : undefined}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full flex justify-between items-end pt-10 border-t border-white/5">
                  <div><p className="text-[9px] text-neutral-500 uppercase font-bold font-geist mb-1 tracking-[0.2em]">Estimated Sync</p><p id="etaValue" className="text-2xl text-white font-black font-geist tracking-tight">&lt; 5 mins</p></div>
                  <button className="bg-white/10 hover:bg-white text-white hover:text-black font-black font-geist text-xs px-10 py-4 rounded-full border border-white/10 transition-all flex gap-3 items-center shadow-xl">Get Access <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
                </div>
              </div>
            </div>
            <p className="text-[9px] text-neutral-500 font-geist mt-8 flex gap-2 items-center tracking-widest uppercase font-bold"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg> No hidden fees. Transparent process from day one.</p>
          </div>
        </section>

        {/* 4. Results Section (Big Video) */}
        <section
          id="results"
          className="px-6 py-2 vc-hardware-accel"
        >
          <div className="max-w-6xl mx-auto bg-white rounded-[40px] p-2 relative overflow-hidden group shadow-3xl">
            <div className="h-[500px] sm:h-[600px] w-full relative rounded-[38px] overflow-hidden flex items-center justify-center bg-black">
              <ForcedVideo
                src="/asset/kling_20260224_Image_to_Video_Animate_a__5181_0.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <h2 className="relative z-10 text-[12vw] sm:text-[10vw] font-black text-white tracking-tighter leading-none select-none mix-blend-difference font-geist text-center">FROM DATA<br />TO FORTRESS</h2>
            </div>
          </div>
        </section>

        {/* 5. Journey Section (Isometric Stack) */}
        <section
          className="px-6 py-4 vc-hardware-accel"
        >
          <div id="journey" className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

            {/* Isometric Stack */}
            <div className="relative h-[600px] flex items-center justify-center scale-110 lg:scale-125">
              <div className="relative w-80 h-80">
                <div className="absolute left-1/2 top-[-15%] bottom-[-15%] w-px border-l border-dashed border-white/20 -translate-x-1/2 opacity-30"></div>

                {/* Layer 04 - Deploy */}
                <div className="absolute inset-x-0 bottom-0 translate-y-24 transition-all duration-700 hover:translate-y-28 group">
                  <div className="w-full h-80 border border-white/10 bg-white/[0.02] backdrop-blur-[4px] rotate-45 scale-y-50 shadow-2xl transition-colors group-hover:border-blue-500/30"></div>
                  <div className="absolute top-1/2 -right-16 -translate-y-1/2 flex items-center gap-4 opacity-100 transition-all duration-500 group-hover:translate-x-2">
                    <div className="w-12 h-px bg-white/20 rotate-[-25deg] origin-left"></div>
                    <div className="px-4 py-2 rounded-full border border-white/10 bg-neutral-950 flex items-center gap-3 shadow-2xl">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-geist">04. Deploy</span>
                      <div className="w-8 h-4 bg-neutral-900 rounded-full relative"><div className="absolute right-0.5 top-0.5 bottom-0.5 w-3 bg-emerald-500 rounded-full"></div></div>
                    </div>
                  </div>
                </div>

                {/* Layer 03 - Secure */}
                <div className="absolute inset-x-0 bottom-0 translate-y-12 transition-all duration-700 hover:translate-y-14 group">
                  <div className="w-full h-80 border border-white/10 bg-white/[0.04] backdrop-blur-[4px] rotate-45 scale-y-50 shadow-2xl transition-colors group-hover:border-blue-500/30"></div>
                  <div className="absolute top-1/2 -left-16 -translate-y-1/2 flex items-center gap-4 flex-row-reverse opacity-100 transition-all duration-500 group-hover:-translate-x-2">
                    <div className="w-12 h-px bg-white/20 rotate-[25deg] origin-right"></div>
                    <div className="px-4 py-2 rounded-full border border-white/10 bg-neutral-950 flex items-center gap-3 shadow-2xl">
                      <div className="w-8 h-4 bg-neutral-800 rounded-full relative"><div className="absolute left-0.5 top-0.5 bottom-0.5 w-3 bg-neutral-600 rounded-full"></div></div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-geist">03. Secure</span>
                    </div>
                  </div>
                </div>

                {/* Layer 02 - Validate */}
                <div className="absolute inset-x-0 bottom-0 translate-y-0 transition-all duration-700 hover:-translate-y-2 group">
                  <div className="w-full h-80 border border-white/10 bg-white/[0.06] backdrop-blur-[4px] rotate-45 scale-y-50 shadow-2xl transition-colors group-hover:border-blue-500/30"></div>
                  <div className="absolute top-1/2 -right-16 -translate-y-1/2 flex items-center gap-4 opacity-100 transition-all duration-500 group-hover:translate-x-2">
                    <div className="w-12 h-px bg-white/20 rotate-[-25deg] origin-left"></div>
                    <div className="px-4 py-2 rounded-full border border-white/10 bg-blue-500 flex items-center gap-3 shadow-2xl shadow-blue-500/20">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest font-geist">02. Validate</span>
                      <div className="w-8 h-4 bg-black/20 rounded-full relative"><div className="absolute right-0.5 top-0.5 bottom-0.5 w-3 bg-neutral-950 rounded-full"></div></div>
                    </div>
                  </div>
                </div>

                {/* Layer 01 - Monitor */}
                <div className="absolute inset-x-0 bottom-0 -translate-y-12 transition-all duration-700 hover:-translate-y-16 group">
                  <div className="w-full h-80 border border-white/10 bg-white/[0.08] backdrop-blur-[4px] rotate-45 scale-y-50 shadow-2xl transition-colors group-hover:border-blue-500/50"></div>
                  <div className="absolute top-1/2 -left-16 -translate-y-1/2 flex items-center gap-4 flex-row-reverse opacity-100 transition-all duration-500 group-hover:-translate-x-2">
                    <div className="w-12 h-px bg-white/20 rotate-[25deg] origin-right"></div>
                    <div className="px-4 py-2 rounded-full border border-white/10 bg-neutral-950 flex items-center gap-3 shadow-2xl">
                      <div className="w-8 h-4 bg-blue-500 rounded-full relative"><div className="absolute left-0.5 top-0.5 bottom-0.5 w-3 bg-neutral-950 rounded-full"></div></div>
                      <span className="text-[10px] font-bold text-neutral-100 uppercase tracking-widest font-geist">01. Monitor</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center font-bold text-white/40 text-9xl font-geist select-none -translate-y-12">VC</div>
              </div>
            </div>

            {/* Steps List */}
            <div className="space-y-16">
              <div>
                <h2 className="text-6xl md:text-8xl font-light text-white font-geist tracking-tighter leading-none mb-8">From Ledger <span className="text-neutral-500 italic">to Vault</span></h2>
                <p className="text-neutral-400 font-geist text-xl max-w-lg leading-relaxed">We eliminate complexity, focusing on verifiable security, fast finality, and tamper-proof guarantees for digital assets.</p>
              </div>

              <div className="space-y-12 relative pl-4">
                <div className="absolute left-7 top-4 bottom-4 w-px bg-gradient-to-b from-blue-500 via-blue-500/20 to-transparent"></div>
                {[
                  { t: "Threat & Network Analysis", d: "We map attack surfaces and network behavior to define constraints, risk tolerances, and trust boundaries.", icon: "solar:magnifer-bold-duotone" },
                  { t: "Consensus & Policy Design", d: "Rules for validation and access control defined—balancing resilience with performance.", icon: "solar:layers-minimalistic-bold-duotone" },
                  { t: "Validator Integration", d: "Every node, key, and permission is modeled precisely—governance and execution match design.", icon: "solar:ruler-pen-bold-duotone" },
                  { t: "Vault Deployment", d: "Automated operations harden and deploy the stack, turning policy into institutional security.", icon: "solar:buildings-bold-duotone" }
                ].map((step, i) => (
                  <div key={i} className="flex gap-10 group relative z-10">
                    <div className="w-14 h-14 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-all shadow-xl">
                      <Icon icon={step.icon} width="24" className="text-blue-500" />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-2xl text-white font-geist font-medium group-hover:text-blue-400 transition-colors mb-2">{step.t}</h4>
                      <p className="text-neutral-500 text-sm leading-relaxed max-w-md">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-16 border-t border-white/5 flex gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 items-center">
                <Icon icon="simple-icons:avalanche" width="28" />
                <Icon icon="simple-icons:ethereum" width="24" />
                <Icon icon="simple-icons:chainlink" width="26" />
                <Icon icon="simple-icons:cloudflare" width="28" />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Architecture Section */}
        <section
          className="px-6 py-1 vc-hardware-accel"
        >
          <div className="max-w-6xl mx-auto bg-neutral-950/60 rounded-[40px] p-4 sm:p-10 border border-white/10 backdrop-blur-md">
            <h2 className="text-5xl md:text-7xl font-light text-white font-geist tracking-tighter mb-8">Built for resilience.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { t: "Hardware Enclaves", d: "Keys secured in dedicated HSMs, ensuring private keys never touch memory.", img: "/componet/ChatGPT%20Image%20Feb%2024,%202026,%2003_25_43%20PM.png" },
                { t: "Multi-Party Computation", d: "Transactions signed collaboratively across nodes, eliminating single points of failure.", img: "/componet/ChatGPT%20Image%20Feb%2024,%202026,%2003_25_53%20PM.png" },
                { t: "Immutable Audit Trails", d: "Access requests are cryptographically hashed and recorded for provable compliance.", img: "/componet/ChatGPT%20Image%20Feb%2024,%202026,%2003_25_58%20PM.png" }
              ].map((item, i) => (
                <div key={i} className="p-10 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                  <img src={item.img} className="w-14 h-14 rounded-full mb-8 ring-4 ring-white/5 group-hover:ring-white/10 transition-all" alt={item.t} />
                  <h3 className="text-2xl font-bold font-geist text-white mb-4">{item.t}</h3>
                  <p className="text-neutral-400 leading-relaxed font-geist text-sm">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Global Compliance Section */}
        <section
          className="px-6 py-1 vc-hardware-accel"
        >
          <div className="max-w-6xl mx-auto bg-neutral-950/60 rounded-[40px] p-4 sm:p-10 border border-white/10 backdrop-blur-md grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative rounded-3xl overflow-hidden aspect-video border border-white/10 bg-black group shadow-2xl">
              <ForcedVideo
                src="/asset/kling_20260224_Image_to_Video_Animate_a__5819_0.mp4"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                preload="metadata"
              />
            </div>
            <div className="space-y-10">
              <h2 className="text-5xl md:text-6xl font-light text-white font-geist tracking-tighter leading-tight">Compliant across <span className="text-neutral-500">borders.</span></h2>
              <p className="text-lg text-neutral-400 font-geist leading-relaxed">Institutional-grade compliance natively integrated into your decentralized applications.</p>
              <div className="space-y-4">
                {['Certified SOC2 Type II compliant', 'GDPR & CCPA ready tools', 'ISO 27001 standards'].map((text, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 text-sm font-geist text-white flex items-center gap-5 transition-all hover:bg-white/10">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]"></div>{text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. Metrics Section */}
        <section
          className="px-6 py-1 vc-hardware-accel"
        >
          <div className="max-w-6xl mx-auto bg-neutral-950/60 rounded-[50px] p-6 sm:p-10 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="space-y-6 text-center md:text-left">
              <h2 className="text-6xl font-light text-white font-geist tracking-tighter leading-none">Network at scale.</h2>
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.25em]"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Systems Operational</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
              {[["Value Secured", "$4.2B+"], ["Latency", "14ms"], ["Active Vaults", "18,502"], ["Uptime", "99.99%"]].map(([l, v], i) => (
                <div key={i} className="space-y-3"><p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest font-geist">{l}</p><p className="text-4xl text-white font-black font-geist tracking-tighter">{v}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Final CTA Section */}
        <section
          className="px-6 py-2 pb-8 vc-hardware-accel"
        >
          <div className="max-w-6xl mx-auto bg-neutral-950/80 rounded-[60px] p-8 sm:p-16 text-center relative overflow-hidden group border border-white/10 shadow-3xl">
            <div className="absolute inset-0 bg-blue-600/10 blur-[160px] rounded-full group-hover:bg-blue-600/20 transition-all duration-1000"></div>
            <h2 className="text-7xl md:text-9xl font-light text-white font-geist tracking-tighter mb-10 relative z-10 leading-none">Enter the Vault.</h2>
            <p className="text-xl text-neutral-400 font-geist max-w-2xl mx-auto mb-16 relative z-10 leading-relaxed font-light">Stop compromising between institutional security and decentralization. Access the dashboard today to deploy your first protected asset container.</p>
            <Link
              href="/launch"
              className="bg-white text-black font-black py-8 px-24 rounded-full hover:scale-105 active:scale-95 transition-all shadow-3xl shadow-white/10 relative z-10 flex items-center justify-center gap-6 mx-auto text-3xl group uppercase tracking-tighter w-fit"
            >
              Launch Terminal <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="group-hover:translate-x-2 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>

      </main>

      <footer className="px-6 py-20 pb-10 border-t border-white/10 bg-neutral-950/90 relative z-10 overflow-hidden mt-10">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          {/* Top Section: Logo & Newsletter */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 pb-16 border-b border-white/5">
            <div className="space-y-6 max-w-sm">
              <Link href="/" className="flex gap-3 items-center group">
                <span className="w-12 h-10 bg-[url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/531cf86b-c775-422c-bec2-7f64f47b9def_320w.png')] bg-cover bg-center transition-transform group-hover:scale-105"></span>
                <span className="text-2xl font-black font-geist text-white tracking-tighter">VaultChain</span>
              </Link>
              <p className="text-neutral-400 font-geist text-sm leading-relaxed">
                Institutional-grade decentralized infrastructure. Fortifying the digital economy with zero-trust architecture and global sovereignty.
              </p>
            </div>

            <div className="w-full lg:w-auto space-y-4">
              <p className="text-white/80 font-geist font-medium text-sm">Join the Developer Newsletter</p>
              <div className="flex w-full lg:w-80 relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm font-geist text-white outline-none focus:border-blue-500/50 transition-colors placeholder:text-neutral-600"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-white text-black font-semibold text-xs px-4 rounded-full hover:bg-neutral-200 transition-colors font-geist">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
            <div className="space-y-6">
              <h4 className="text-white font-geist font-bold text-sm tracking-wide">Infrastructure</h4>
              <ul className="space-y-4 text-sm text-neutral-400 font-geist">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Global Mesh Network</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Quantum Guard HSM</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Node Validators</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Network Status <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full ml-2 animate-pulse"></span></a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-geist font-bold text-sm tracking-wide">Developers</h4>
              <ul className="space-y-4 text-sm text-neutral-400 font-geist">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Smart Contracts</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Bug Bounty Program</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-geist font-bold text-sm tracking-wide">Company</h4>
              <ul className="space-y-4 text-sm text-neutral-400 font-geist">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About VaultChain</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers <span className="bg-blue-500/20 text-blue-400 text-[9px] uppercase px-2 py-0.5 rounded-full ml-2 font-bold tracking-widest">Hiring</span></a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Press & Media</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Compliance Center</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-geist font-bold text-sm tracking-wide">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 hover:text-white text-neutral-400 transition-all">
                  <Icon icon="logos:twitter" width="16" className="grayscale group-hover:grayscale-0" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-neutral-800 hover:text-white text-neutral-400 transition-all">
                  <Icon icon="mdi:github" width="20" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#5865F2] hover:border-[#5865F2] hover:text-white text-neutral-400 transition-all">
                  <Icon icon="ic:baseline-discord" width="20" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar Container */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 text-[11px] text-neutral-500 font-geist uppercase tracking-widest font-semibold">
            <p>© 2026 VaultChain Protocol. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
