import Image from "next/image";

export function VaultChainLogo({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/vaultchain-logo.png"
      alt="VaultChain"
      width={size}
      height={size}
      priority
    />

  );
}


