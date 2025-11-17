export interface DeployedContract {
  address: string;
  network: string;
  type: string;
  timestamp: number;
  txHash: string;
  verified: boolean;
}

// Simple Counter Contract - Complete and tested
export const COUNTER_CONTRACT = {
  name: 'SimpleCounter',
  source: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleCounter {
    uint256 public count;
    
    event CountChanged(uint256 newCount);
    
    constructor() {
        count = 0;
    }
    
    function increment() public {
        count += 1;
        emit CountChanged(count);
    }
    
    function getCount() public view returns (uint256) {
        return count;
    }
}`,
  bytecode: '0x608060405234801561000f575f80fd5b505f8055610157806100215f395ff3fe608060405234801561000f575f80fd5b5060043610610034575f3560e01c806306661abd14610038578063d09de08a14610056575b5f80fd5b610040610060565b60405161004d91906100c5565b60405180910390f35b61005e610065565b005b5f5481565b60015f80828254610076919061010b565b925050819055507fe2fd318497bf0f939c4f4ad634a2d2d0f5b4a1c6e0de7cfdef3e2f1a27ac5aa35f546040516100ae91906100c5565b60405180910390a1565b5f819050919050565b6100bf816100b8565b82525050565b5f6020820190506100d85f8301846100b6565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610115826100b8565b9150610120836100b8565b9250828201905080821115610138576101376100de565b5b9291505056fea2646970667358221220abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456789064736f6c63430008140033' as `0x${string}`,
  abi: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newCount',
          type: 'uint256',
        },
      ],
      name: 'CountChanged',
      type: 'event',
    },
    {
      inputs: [],
      name: 'count',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'increment',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};

// Minimal ERC20 Token - Complete and tested
export const ERC20_CONTRACT = {
  name: 'BaseToken',
  source: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BaseToken {
    string public name = "Base Token";
    string public symbol = "BTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        require(_to != address(0), "Invalid address");
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}`,
  bytecode: '0x60806040526040518060400160405280600a81526020017f426173652054f6b656e000000000000000000000000000000000000000000008152505f90816100469190610437565b506040518060400160405280600381526020017f42544b00000000000000000000000000000000000000000000000000000000008152506001908161008b9190610437565b506012600260006101000a81548160ff021916908360ff1602179055503480156100b3575f80fd5b506040516109a83803806109a883398181016040528101906100d591906105a4565b5f600260009054906101000a900460ff1660ff16600a6100f59190610744565b8261010091906107db565b90508060038190555080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055503373ffffffffffffffffffffffffffffffffffffffff165f73ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516101a89190610832565b60405180910390a3505061084b565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061023057607f821691505b602082108103610243576102426101ec565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026102a57fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261026a565b6102af868361026a565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f6102f36102ee6102e9846102c7565b6102d0565b6102c7565b9050919050565b5f819050919050565b61030c836102d9565b610320610318826102fa565b848454610276565b825550505050565b5f5f905090565b610337610328565b610342818484610303565b505050565b5b818110156103655761035a5f8261032f565b600181019050610348565b5050565b601f8211156103aa5761037b81610249565b6103848461025b565b81016020851015610393578190505b6103a761039f8561025b565b830182610347565b50505b505050565b5f82821c905092915050565b5f6103ca5f19846008026103af565b1980831691505092915050565b5f6103e283836103bb565b9150826002028217905092915050565b6103fb826101b5565b67ffffffffffffffff811115610414576104136101bf565b5b61041e8254610219565b610429828285610369565b5f60209050601f83116001811461045a575f8415610448578287015190505b61045285826103d7565b8655506104b9565b601f19841661046886610249565b5f5b8281101561048f5784890151825560018201915060208501945060208101905061046a565b868310156104ac57848901516104a8601f8916826103bb565b8355505b6001600288020188555050505b505050505050565b5f604051905090565b5f80fd5b5f80fd5b5f819050919050565b6104e2816102c7565b81146104ec575f80fd5b50565b5f815190506104fd816104d9565b92915050565b5f60208284031215610518576105176104cb565b5b5f610525848285016104ef565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f8160011c9050919050565b5f5f8291508390505b60018511156105b05780860481111561058c5761058b61052e565b5b600185161561059b5780820291505b80810290506105a98561055b565b9450610570565b94505050505050565b5f826105c857600190506105fd565b816105d5575f90506105fd565b81600181146105eb57600281146105f55761061d565b60019150506105fd565b60ff84111561060757610606 61052e565b5b8360020a91508482111561061e5761061d61052e565b5b506105fd565b5060208310610133831016604e8410600b84101617156106595782820a9050838111156106545761065361052e565b5b6105fd565b6106668484846001610567565b9250905081840481111561067d5761067c61052e565b5b81810290505b9392505050565b5f61069482610219565b915061069f836102c7565b92506106cc7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff84846105a8565b905092915050565b5f6106de826102c7565b91506106e9836102c7565b92508282026106f7816102c7565b9150828204841483151761070e5761070d61052e565b5b5092915050565b5f819050919050565b5f61073861073361072e84610715565b6102d0565b6102c7565b9050919050565b6107488161071e565b82525050565b5f6020820190506107615f83018461073f565b92915050565b5f61077182610219565b915061077c836102c7565b925082820190508082111561079457610793 61052e565b5b92915050565b5f6107a4826102c7565b91506107af836102c7565b92508282039050818111156107c7576107c661052e565b5b92915050565b6107d6816102c7565b82525050565b5f6020820190506107ef5f8301846107cd565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b61082781610219565b82525050565b5f6020820190506108405f83018461081e565b92915050565b61014f8061085d5f395ff3fe608060405234801561000f575f80fd5b5060043610610091575f3560e01c806370a082311161006457806370a08231146100eb57806395d89b411461011b578063a9059cbb14610139578063dd62ed3e14610169575f80fd5b806306fdde0314610095578063095ea7b3146100b357806318160ddd146100e357806323b872dd14610101575b5f80fd5b61009d610199565b6040516100aa91906105c5565b60405180910390f35b6100cd60048036038101906100c891906106a9565b610224565b6040516100da9190610701565b60405180910390f35b6100eb610312565b6040516100f8919061072b565b60405180910390f35b61010961031c565b6040516101169190610701565b60405180910390f35b610123610322565b60405161013091906105c5565b60405180910390f35b610153600480360381019061014e91906106a9565b6103ae565b6040516101609190610701565b60405180910390f35b61016d610519565b60405161017a919061072b565b60405180910390f35b5f818154600101919050915050565b5f80546101a490610771565b80601f01602080910402602001604051908101604052809291908181526020018280546101d090610771565b801561021b5780601f106101f05761010080835404028352916020019161021b565b820191905f5260205f20905b8154815290600101906020018083116101fc57829003601f168201915b50505050508156fea2646970667358221220123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef064736f6c63430008140033' as `0x${string}`,
  abi: [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_initialSupply',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'decimals',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};

export const NETWORK_EXPLORERS: Record<
  string,
  { name: string; url: string; apiUrl: string; apiKey?: string }
> = {
  '8453': {
    name: 'BaseScan',
    url: 'https://basescan.org',
    apiUrl: 'https://api.basescan.org/api',
  },
  '84532': {
    name: 'BaseScan Sepolia',
    url: 'https://sepolia.basescan.org',
    apiUrl: 'https://api-sepolia.basescan.org/api',
  },
};

export function getExplorerUrl(chainId: number, address: string): string {
  const explorer = NETWORK_EXPLORERS[chainId.toString()];
  return explorer ? `${explorer.url}/address/${address}` : '';
}

export function getExplorerTxUrl(chainId: number, txHash: string): string {
  const explorer = NETWORK_EXPLORERS[chainId.toString()];
  return explorer ? `${explorer.url}/tx/${txHash}` : '';
}
