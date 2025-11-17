'use client';

import { createAppKit } from '@reown/appkit/react';
import { base, baseSepolia } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { cookieStorage, createStorage } from '@wagmi/core';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Project ID from WalletConnect
export const projectId = '8b0afcaf99464b72fe69705db84248f0';

// Network configuration for Base Mainnet and Base Sepolia
export const networks = [base, baseSepolia];

// Wagmi adapter configuration
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;

// Query client for React Query
export const queryClient = new QueryClient();

// Create the AppKit instance
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  defaultNetwork: base,
  metadata: {
    name: 'Base Contract Deployer',
    description: 'Deploy verified smart contracts on Base networks',
    url: 'https://basecontractdeployer.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  },
  features: {
    analytics: true,
  },
});
