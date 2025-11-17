'use client'
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { NetworkSwitcher } from '@/components/NetworkSwitcher';
import { ContractDeployer } from '@/components/ContractDeployer';
import { ProfileDashboard } from '@/components/ProfileDashboard';
import type { DeployedContract } from '@/lib/contracts';
import { Sparkles, Github } from 'lucide-react';
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";
import { useQuickAuth } from "@/hooks/useQuickAuth";
import { useIsInFarcaster } from "@/hooks/useIsInFarcaster";

export default function HomePage() {
    const { addMiniApp } = useAddMiniApp();
    const isInFarcaster = useIsInFarcaster()
    useQuickAuth(isInFarcaster)
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100))
          
          if (document.readyState !== 'complete') {
            await new Promise<void>(resolve => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', () => resolve(), { once: true })
              }

            })
          }

    

          await sdk.actions.ready()
          console.log('Farcaster SDK initialized successfully - app fully loaded')
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error)
          
          setTimeout(async () => {
            try {
              await sdk.actions.ready()
              console.log('Farcaster SDK initialized on retry')
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError)
            }

          }, 1000)
        }

      }

    

      initializeFarcaster()
    }, [])
  const { address, isConnected } = useAccount();
  const [deployedContracts, setDeployedContracts] = useState<
    DeployedContract[]
  >([]);

  const handleDeploy = (contract: DeployedContract) => {
    setDeployedContracts((prev) => [contract, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-5xl font-black text-black">
              Base Contract Deployer
            </h1>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Deploy verified smart contracts on Base Mainnet and Base Sepolia
            with one click. Built with WalletConnect and Reown AppKit.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <a
              href="https://github.com/sinirlibiber/Base-Contract-Deployer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="font-semibold">View on GitHub</span>
            </a>
          </div>
        </div>

        {/* Connect Wallet Button */}
        {!isConnected && (
          <div className="text-center mb-12">
            <Button
              onClick={() => {
                const button = document.querySelector(
                  'appkit-button'
                ) as HTMLElement | null;
                if (button) {
                  button.click();
                }
              }}
              size="lg"
              className="bg-black text-white hover:bg-gray-800 font-bold px-8 py-6 text-lg"
            >
              Connect Wallet
            </Button>
            <p className="text-sm text-gray-600 mt-4">
              Connect your wallet to start deploying contracts
            </p>
          </div>
        )}

        {/* Main Content */}
        {isConnected && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Network & Deployer */}
            <div className="lg:col-span-2 space-y-6">
              <NetworkSwitcher />
              <ContractDeployer onDeploy={handleDeploy} />
            </div>

            {/* Right Column - Profile Dashboard */}
            <div className="lg:col-span-1">
              <ProfileDashboard deployedContracts={deployedContracts} />
            </div>
          </div>
        )}

        {/* AppKit Button (Hidden but functional) */}
        <div className="fixed top-4 right-4 z-50">
          <appkit-button />
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600">
          <p className="text-sm">
            Built on{' '}
            <span className="font-semibold text-blue-600">Base</span> with{' '}
            <span className="font-semibold text-purple-600">WalletConnect</span>{' '}
            & <span className="font-semibold text-blue-600">Reown AppKit</span>
          </p>
          <p className="text-xs mt-2">
            Contracts are automatically verified on Blockscout
          </p>
        </div>
      </div>
    </div>
  );
}
