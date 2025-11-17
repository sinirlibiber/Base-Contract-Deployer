'use client';

import { useAccount, useBalance } from 'wagmi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Wallet, Globe, ExternalLink } from 'lucide-react';
import type { DeployedContract } from '@/lib/contracts';
import { getExplorerUrl } from '@/lib/contracts';

interface ProfileDashboardProps {
  deployedContracts: DeployedContract[];
}

export function ProfileDashboard({
  deployedContracts,
}: ProfileDashboardProps) {
  const { address, chain } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  return (
    <Card className="p-6 border-2 border-black bg-white">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5" />
        <h3 className="font-bold text-xl text-black">Profile Dashboard</h3>
      </div>

      {address ? (
        <div className="space-y-4">
          {/* Wallet Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-4 h-4" />
              <p className="font-semibold text-black">Wallet Address</p>
            </div>
            <p className="text-sm font-mono bg-gray-50 p-2 rounded border border-black break-all text-black">
              {address}
            </p>
          </div>

          {/* Balance */}
          {balance && (
            <div>
              <p className="font-semibold text-black mb-2">Balance</p>
              <p className="text-2xl font-bold text-black">
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </p>
            </div>
          )}

          {/* Current Network */}
          {chain && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4" />
                <p className="font-semibold text-black">Current Network</p>
              </div>
              <Badge
                className={`${
                  chain.id === 8453 ? 'bg-blue-500' : 'bg-purple-500'
                } text-white`}
              >
                {chain.name}
              </Badge>
            </div>
          )}

          <Separator className="bg-black" />

          {/* Deployed Contracts */}
          <div>
            <p className="font-semibold text-black mb-3">
              Deployed Contracts ({deployedContracts.length})
            </p>

            {deployedContracts.length > 0 ? (
              <div className="space-y-2">
                {deployedContracts.map((contract, index) => (
                  <Card
                    key={`${contract.address}-${index}`}
                    className="p-3 bg-gray-50 border border-black"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-black text-sm">
                          {contract.type}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {contract.network}
                        </p>
                        <p className="text-xs font-mono text-gray-700 mt-1 break-all">
                          {contract.address}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {contract.verified && (
                            <Badge className="bg-green-600 text-white text-xs">
                              Verified
                            </Badge>
                          )}
                          {chain && (
                            <a
                              href={getExplorerUrl(chain.id, contract.address)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                            >
                              Explorer
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 text-center py-4">
                No contracts deployed yet. Deploy your first contract above!
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 py-8">
          Connect your wallet to view your profile
        </p>
      )}
    </Card>
  );
}
