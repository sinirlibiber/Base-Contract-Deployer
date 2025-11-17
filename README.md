# Base Contract Deployer 🚀

A powerful DApp for deploying verified smart contracts on **Base** Mainnet and Base Sepolia testnet with one click.

Built with **WalletConnect**, **Reown AppKit**, and modern web3 technologies to maximize your Talent Protocol + WalletConnect Builder Rewards score.

## Features ✨

- 🔗 **WalletConnect Integration** - Seamless wallet connection using Reown AppKit
- 🌐 **Multi-Network Support** - Switch between Base Mainnet and Base Sepolia
- 🚀 **One-Click Deployment** - Deploy contracts instantly with automatic verification
- ✅ **Auto-Verified Contracts** - All deployed contracts are automatically verified on Blockscout
- 📊 **Profile Dashboard** - Track your deployed contracts and wallet info
- 🎨 **Modern UI** - Clean, responsive design with great UX

## Supported Contracts

### 1. Simple Counter
A basic counter contract with increment, decrement, and reset functionality.

### 2. ERC-20 Token
Deploy your own token with customizable initial supply.

## Tech Stack 🛠️

- **Framework**: Next.js 15 with App Router
- **Wallet**: WalletConnect via @reown/appkit
- **Web3**: wagmi, viem
- **Blockchain**: Base Mainnet (Chain ID: 8453), Base Sepolia (Chain ID: 84532)
- **UI**: TailwindCSS, shadcn/ui
- **TypeScript**: Full type safety

## Getting Started 🏁

### Prerequisites

- Node.js 18+ 
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- Some ETH on Base or Base Sepolia for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/base-contract-deployer.git

# Navigate to project directory
cd base-contract-deployer

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## How to Use 📖

1. **Connect Wallet** - Click "Connect Wallet" and choose your preferred wallet
2. **Select Network** - Choose between Base Mainnet or Base Sepolia
3. **Choose Contract Type** - Select Counter or ERC-20 Token
4. **Configure** - For ERC-20, set your initial token supply
5. **Deploy** - Click "Deploy Contract" and confirm the transaction
6. **Verify** - Your contract will be automatically verified on the block explorer
7. **Track** - View all your deployed contracts in the Profile Dashboard

## Key Technologies 🔑

### WalletConnect & Reown AppKit
This project uses **@reown/appkit** (formerly WalletConnect Web3Modal) for seamless wallet connectivity across multiple chains and wallets.

### Base Blockchain
Built specifically for **Base**, Coinbase's L2 solution offering:
- Low gas fees
- Fast transactions
- EVM compatibility
- Strong ecosystem

### Wagmi & Viem
Modern React hooks and TypeScript utilities for Ethereum development.

## Contract Verification ✅

All deployed contracts are automatically verified on:
- **Base Mainnet**: [BaseScan](https://basescan.org)
- **Base Sepolia**: [BaseScan Sepolia](https://sepolia.basescan.org)

The verification happens through Blockscout's API, ensuring your contracts are:
- Transparent and auditable
- Easily integrated with explorers
- Trusted by the community

## Network Details 🌐

### Base Mainnet
- Chain ID: 8453
- RPC: https://mainnet.base.org
- Explorer: https://basescan.org

### Base Sepolia (Testnet)
- Chain ID: 84532
- RPC: https://sepolia.base.org
- Explorer: https://sepolia.basescan.org

## Project Structure 📁

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Web3Provider
│   └── page.tsx            # Main page
├── components/
│   ├── Web3Provider.tsx    # Wagmi & React Query provider
│   ├── NetworkSwitcher.tsx # Network selection component
│   ├── ContractDeployer.tsx # Contract deployment UI
│   └── ProfileDashboard.tsx # User profile & contracts
├── config/
│   └── web3.ts            # WalletConnect & wagmi config
└── lib/
    └── contracts.ts       # Contract definitions & utilities
```

## Keywords 🏷️

base, walletconnect, reown, appkit, blockchain, smart contracts, web3, deployment, verification, ethereum, l2

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT License - feel free to use this project for your own purposes.

## Support 💬

If you have any questions or run into issues:
- Open an issue on GitHub
- Check the [Base documentation](https://docs.base.org)
- Visit [WalletConnect docs](https://docs.walletconnect.com)

## Acknowledgments 🙏

- Built on [Base](https://base.org)
- Powered by [WalletConnect](https://walletconnect.com)
- Uses [Reown AppKit](https://reown.com/appkit)
- UI components from [shadcn/ui](https://ui.shadcn.com)

---

**Happy Building on Base! 🔵**
