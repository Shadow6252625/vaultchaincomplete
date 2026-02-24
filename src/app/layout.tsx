import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BackgroundVideo } from "@/components/BackgroundVideo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VaultChain",
  description: "VaultChain — The Encrypted Core of Trust.",
};

import Script from "next/script";
import { SolanaProvider } from "@/components/SolanaProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <SolanaProvider>
          <BackgroundVideo />
          <div className="relative min-h-dvh">
            <Header />
            {children}
          </div>
        </SolanaProvider>

        {/* Optimized Script Loading */}
        <Script
          src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.2/dist/unicornStudio.umd.js"
          strategy="lazyOnload"
        />
        <Script
          src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
