'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Network } from 'lucide-react';

interface NetworkSwitcherProps {
  onNetworkChange?: (chainId: number) => void;
}

export function NetworkSwitcher({ onNetworkChange }: NetworkSwitcherProps) {
  const { chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  const handleSwitch = (chainId: number) => {
    switchChain({ chainId });
    onNetworkChange?.(chainId);
  };

  const getNetworkColor = (chainId: number | undefined): string => {
    if (chainId === 8453) return 'bg-blue-500';
    if (chainId === 84532) return 'bg-purple-500';
    return 'bg-gray-500';
  };

  return (
    <Card className="p-4 border-2 border-black bg-white">
      <div className="flex items-center gap-2 mb-3">
        <Network className="w-5 h-5" />
        <h3 className="font-bold text-black">Network</h3>
      </div>

      {chain && (
        <div className="mb-3">
          <Badge className={`${getNetworkColor(chain.id)} text-white`}>
            Connected: {chain.name}
          </Badge>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {chains.map((c) => (
          <Button
            key={c.id}
            onClick={() => handleSwitch(c.id)}
            variant={chain?.id === c.id ? 'default' : 'outline'}
            size="sm"
            className={
              chain?.id === c.id
                ? 'bg-black text-white font-semibold'
                : 'border-2 border-black text-black hover:bg-gray-100'
            }
          >
            {c.name}
          </Button>
        ))}
      </div>
    </Card>
  );
}
