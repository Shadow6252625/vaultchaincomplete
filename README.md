# VaultChain: The Encrypted Core of Trust

VaultChain is a high-fidelity, premium interface for managing secure agent vaults and encrypted on-chain assets. Built with a focus on maximum security and state-of-the-art aesthetics.

![VaultChain Preview](public/vaultchain-logo.png)

## ✨ Premium Features

- **Ambient Video Landscapes**: Immersive deep-space background integration across the gateway and dashboard.
- **Glassmorphism UI**: High-end visual components built with blurred backdrops and refined borders.
- **Dynamic Enclave Dashboard**: Real-time visualization of "Trust Propagation" (Security Health) using Recharts.
- **Unified Setup**: Streamlined on-boarding for initializing secure enclaves on networks like Solana.
- **Micro-Animations**: Fluid transitions and hover states powered by Framer Motion.
- **Section Isolation**: Unique controlled routes for Assets, Security Audits, and Access Control.

## 🛠️ Technical Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: TailwindCSS + Vanilla CSS Modern Tokens
- **Animations**: Framer Motion
- **Visuals**: Curated SVG System & MP4 Backgrounds
- **Backend**: Integrated "Self-Healing" Insforge Mock Backend (Automated Prime Re-balancing)

## 🚀 Getting Started

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env.local` file:
   ```env
   MCP_URL=internal
   ```
   *Note: Using `internal` enables the built-in hardened mock backend.*

3. **Development Mode**:
   ```bash
   npm run dev
   ```

4. **Access the Flow**:
   - `/launch` → Minimialist Secure Gateway
   - `/setup` → Enclave Initialization
   - `/dashboard/[vault_id]` → Central Management Interface

## 🔒 Security & Backend

VaultChain is designed to interface with the **Insforge MCP**. 

- **Internal Mode**: Ideal for demonstration and local testing. Features "Self-Healing" logic that re-balances the vault to "Prime" status upon session restoration.
- **External Mode**: Point `MCP_URL` to a valid remote endpoint to sync with production-grade agent vaults.

---

Built with precision for the future of on-chain trust.
