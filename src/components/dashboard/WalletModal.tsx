"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { Icon } from "@iconify/react";

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
    const { select, wallets, publicKey, connected } = useWallet();
    const [error, setError] = React.useState<string | null>(null);

    // Filter for Phantom and Solflare as requested
    const supportedWallets = wallets.filter((w) =>
        ["Phantom", "Solflare"].includes(w.adapter.name)
    );

    React.useEffect(() => {
        if (connected) {
            const timer = setTimeout(onClose, 1500);
            return () => clearTimeout(timer);
        }
    }, [connected, onClose]);

    const handleConnect = async (walletName: any) => {
        setError(null);
        try {
            const wallet = wallets.find((w) => w.adapter.name === walletName);
            if (!wallet) return;

            if (wallet.readyState === "NotDetected") {
                setError(`Please install ${walletName} to continue`);
                return;
            }

            await select(wallet.adapter.name);
        } catch (err) {
            setError("Connection failed. Please try again.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-[#0b0c10]/80 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-md vc-glass bg-white/[0.02] border-white/10 rounded-[2.5rem] p-8 pointer-events-auto relative overflow-hidden"
                        >
                            {/* Decorative glow */}
                            <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />
                            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white tracking-tight">Connect Wallet</h2>
                                        <p className="text-sm text-neutral-400 mt-1">Select your Solana wallet to proceed</p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-xl hover:bg-white/5 text-neutral-500 transition-colors"
                                    >
                                        <Icon icon="mdi:close" width="24" />
                                    </button>
                                </div>

                                {connected ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="py-12 flex flex-col items-center justify-center gap-4"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                            <Icon icon="mdi:check-bold" width="40" />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-white font-bold text-lg">Connected ✓</div>
                                            <div className="text-xs text-neutral-400 font-mono mt-1">
                                                {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-4">
                                        {supportedWallets.map((wallet) => (
                                            <button
                                                key={wallet.adapter.name}
                                                onClick={() => handleConnect(wallet.adapter.name)}
                                                className="w-full group relative flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/20 transition-all text-left overflow-hidden"
                                            >
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-neutral-900 border border-white/10 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
                                                    <img
                                                        src={wallet.adapter.icon}
                                                        alt={wallet.adapter.name}
                                                        className="w-full h-full object-cover p-2"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-white font-bold">{wallet.adapter.name}</div>
                                                    <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5">Solana</div>
                                                </div>
                                                <Icon
                                                    icon="mdi:chevron-right"
                                                    width="24"
                                                    className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all"
                                                />
                                            </button>
                                        ))}

                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs flex flex-col gap-2"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Icon icon="mdi:alert-circle" width="16" className="text-red-400" />
                                                    {error}
                                                </div>
                                                {error.includes("install") && (
                                                    <a
                                                        href={error.includes("Phantom") ? "https://phantom.app/download" : "https://solflare.com/download"}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-accent hover:underline font-bold"
                                                    >
                                                        Download Extension
                                                    </a>
                                                )}
                                            </motion.div>
                                        )}
                                    </div>
                                )}

                                <div className="mt-8 pt-6 border-t border-white/5 text-center px-4">
                                    <p className="text-[10px] text-neutral-500 leading-relaxed uppercase tracking-tighter">
                                        By connecting a wallet, you agree to VaultChain's <span className="text-neutral-300">Terms of Service</span> and acknowledge the risks of on-chain asset management.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
