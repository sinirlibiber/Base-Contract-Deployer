'use client';

import { useState } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Rocket, Loader2, CheckCircle, ExternalLink } from 'lucide-react';
import {
  COUNTER_CONTRACT,
  ERC20_CONTRACT,
  getExplorerTxUrl,
  getExplorerUrl,
  type DeployedContract,
} from '@/lib/contracts';
import { toast } from 'sonner';

interface ContractDeployerProps {
  onDeploy?: (contract: DeployedContract) => void;
}

export function ContractDeployer({ onDeploy }: ContractDeployerProps) {
  const { address, chain } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const [selectedContract, setSelectedContract] = useState<string>('counter');
  const [tokenSupply, setTokenSupply] = useState<string>('1000000');
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [lastDeployed, setLastDeployed] = useState<DeployedContract | null>(
    null
  );

  const handleDeploy = async () => {
    if (!address || !walletClient || !publicClient || !chain) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsDeploying(true);
    setLastDeployed(null);

    try {
      const contract =
        selectedContract === 'counter' ? COUNTER_CONTRACT : ERC20_CONTRACT;

      // Prepare constructor arguments
      const constructorArgs = selectedContract === 'erc20' ? [BigInt(tokenSupply)] : [];

      toast.info('Preparing deployment transaction...');

      // Deploy the contract with explicit gas limit for testnet stability
      const hash = await walletClient.deployContract({
        abi: contract.abi,
        bytecode: contract.bytecode,
        args: constructorArgs,
        gas: BigInt(3000000), // Explicit gas limit to avoid estimation issues
      });

      toast.success('Transaction submitted! Waiting for confirmation...');

      // Wait for transaction receipt with timeout
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
        timeout: 60000, // 60 second timeout
      });

      if (receipt.status === 'reverted') {
        throw new Error('Transaction reverted on chain');
      }

      if (receipt.contractAddress) {
        const deployedContract: DeployedContract = {
          address: receipt.contractAddress,
          network: chain.name,
          type: contract.name,
          timestamp: Date.now(),
          txHash: hash,
          verified: true, // Will be verified automatically via Blockscout
        };

        setLastDeployed(deployedContract);
        onDeploy?.(deployedContract);

        toast.success(
          `Contract deployed successfully! Address: ${receipt.contractAddress.slice(0, 6)}...${receipt.contractAddress.slice(-4)}`
        );
      }
    } catch (error) {
      console.error('Deployment error:', error);
      
      let errorMessage = 'Unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Provide helpful error messages for common issues
        if (errorMessage.includes('insufficient funds')) {
          errorMessage = 'Insufficient funds for gas. Please add ETH to your wallet.';
        } else if (errorMessage.includes('user rejected')) {
          errorMessage = 'Transaction was rejected in your wallet.';
        } else if (errorMessage.includes('reverted')) {
          errorMessage = 'Contract deployment failed. Check the transaction on explorer for details.';
        } else if (errorMessage.includes('timeout')) {
          errorMessage = 'Transaction timeout. Check explorer to see if it succeeded.';
        }
      }
      
      toast.error(`Deployment failed: ${errorMessage}`);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Card className="p-6 border-2 border-black bg-white">
      <div className="flex items-center gap-2 mb-4">
        <Rocket className="w-5 h-5" />
        <h3 className="font-bold text-xl text-black">Deploy Contract</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="contract-type" className="text-black font-semibold">
            Contract Type
          </Label>
          <Select value={selectedContract} onValueChange={setSelectedContract}>
            <SelectTrigger
              id="contract-type"
              className="border-2 border-black text-black mt-1"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="counter">Simple Counter</SelectItem>
              <SelectItem value="erc20">ERC-20 Token</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedContract === 'erc20' && (
          <div>
            <Label htmlFor="token-supply" className="text-black font-semibold">
              Initial Supply
            </Label>
            <Input
              id="token-supply"
              type="number"
              value={tokenSupply}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTokenSupply(e.target.value)
              }
              className="border-2 border-black text-black mt-1"
              placeholder="1000000"
            />
          </div>
        )}

        {chain && (
          <div className="p-3 bg-gray-50 border-2 border-black rounded">
            <p className="text-sm text-black">
              <span className="font-semibold">Current Network:</span> {chain.name}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Contract will be deployed and auto-verified on Blockscout
            </p>
          </div>
        )}

        <Button
          onClick={handleDeploy}
          disabled={!address || isDeploying}
          className="w-full bg-black text-white hover:bg-gray-800 font-bold"
          size="lg"
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Deploying...
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4 mr-2" />
              Deploy Contract
            </>
          )}
        </Button>

        {lastDeployed && chain && (
          <Card className="p-4 bg-green-50 border-2 border-green-500">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-black mb-2">
                  Contract Deployed Successfully!
                </p>
                <div className="space-y-1 text-sm text-black">
                  <p>
                    <span className="font-semibold">Type:</span>{' '}
                    {lastDeployed.type}
                  </p>
                  <p>
                    <span className="font-semibold">Network:</span>{' '}
                    {lastDeployed.network}
                  </p>
                  <p className="break-all">
                    <span className="font-semibold">Address:</span>{' '}
                    {lastDeployed.address}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-green-600 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                    <a
                      href={getExplorerUrl(chain.id, lastDeployed.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      View on Explorer
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
}
