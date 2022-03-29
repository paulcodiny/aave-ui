/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/providers';
import type {
  AaveProtocolDataProvider,
  AaveProtocolDataProviderInterface,
} from './AaveProtocolDataProvider';

const _abi = [
  {
    inputs: [
      {
        internalType: 'contract ILendingPoolAddressesProvider',
        name: 'addressesProvider',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'ADDRESSES_PROVIDER',
    outputs: [
      {
        internalType: 'contract ILendingPoolAddressesProvider',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllATokens',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'tokenAddress',
            type: 'address',
          },
        ],
        internalType: 'struct AaveProtocolDataProvider.TokenData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllReservesTokens',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'tokenAddress',
            type: 'address',
          },
        ],
        internalType: 'struct AaveProtocolDataProvider.TokenData[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
    ],
    name: 'getReserveConfigurationData',
    outputs: [
      {
        internalType: 'uint256',
        name: 'decimals',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'ltv',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'liquidationThreshold',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'liquidationBonus',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'reserveFactor',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'usageAsCollateralEnabled',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'borrowingEnabled',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'stableBorrowRateEnabled',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'isActive',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: 'isFrozen',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
    ],
    name: 'getReserveData',
    outputs: [
      {
        internalType: 'uint256',
        name: 'availableLiquidity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalStableDebt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'totalVariableDebt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'liquidityRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'variableBorrowRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'stableBorrowRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'averageStableBorrowRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'liquidityIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'variableBorrowIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint40',
        name: 'lastUpdateTimestamp',
        type: 'uint40',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
    ],
    name: 'getReserveTokensAddresses',
    outputs: [
      {
        internalType: 'address',
        name: 'aTokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'stableDebtTokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'variableDebtTokenAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'asset',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getUserReserveData',
    outputs: [
      {
        internalType: 'uint256',
        name: 'currentATokenBalance',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'currentStableDebt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'currentVariableDebt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'principalStableDebt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'scaledVariableDebt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'stableBorrowRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'liquidityRate',
        type: 'uint256',
      },
      {
        internalType: 'uint40',
        name: 'stableRateLastUpdated',
        type: 'uint40',
      },
      {
        internalType: 'bool',
        name: 'usageAsCollateralEnabled',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const _bytecode =
  '0x60a060405234801561001057600080fd5b50604051611b77380380611b7783398101604081905261002f91610044565b60601b6001600160601b031916608052610072565b600060208284031215610055578081fd5b81516001600160a01b038116811461006b578182fd5b9392505050565b60805160601c611ac56100b26000398061015b528061018e528061029f52806107945280610b125280610c625280610fd952806111095250611ac56000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80633e1501411161005b5780633e150141146100f1578063b316ff891461011a578063d2493b6c1461012f578063f561ae41146101515761007d565b80630542975c1461008257806328dd2d01146100a057806335ea6a75146100c8575b600080fd5b61008a610159565b6040516100979190611879565b60405180910390f35b6100b36100ae3660046115cd565b61017d565b604051610097999897969594939291906119db565b6100db6100d636600461158e565b610781565b6040516100979a9998979695949392919061198f565b6101046100ff36600461158e565b610aff565b6040516100979a99989796959493929190611940565b610122610c5c565b60405161009791906118b0565b61014261013d36600461158e565b610fd1565b6040516100979392919061188d565b610122611103565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000806000806000806000806000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630261bf8b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156101e557600080fd5b505afa1580156101f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021d91906115b1565b6001600160a01b03166335ea6a758d6040518263ffffffff1660e01b81526004016102489190611879565b6101806040518083038186803b15801561026157600080fd5b505afa158015610275573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102999190611757565b905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630261bf8b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156102f657600080fd5b505afa15801561030a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032e91906115b1565b6001600160a01b0316634417a5838d6040518263ffffffff1660e01b81526004016103599190611879565b60206040518083038186803b15801561037157600080fd5b505afa158015610385573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a9919061173c565b60e08301516040516370a0823160e01b81529192506001600160a01b0316906370a08231906103dc908f90600401611879565b60206040518083038186803b1580156103f457600080fd5b505afa158015610408573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061042c9190611847565b6101208301516040516370a0823160e01b8152919c506001600160a01b0316906370a0823190610460908f90600401611879565b60206040518083038186803b15801561047857600080fd5b505afa15801561048c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104b09190611847565b6101008301516040516370a0823160e01b8152919a506001600160a01b0316906370a08231906104e4908f90600401611879565b60206040518083038186803b1580156104fc57600080fd5b505afa158015610510573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105349190611847565b61010083015160405163631a6fd560e11b8152919b506001600160a01b03169063c634dfaa90610568908f90600401611879565b60206040518083038186803b15801561058057600080fd5b505afa158015610594573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b89190611847565b610120830151604051630ed1279f60e11b81529199506001600160a01b031690631da24f3e906105ec908f90600401611879565b60206040518083038186803b15801561060457600080fd5b505afa158015610618573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063c9190611847565b965081606001516001600160801b031694508161010001516001600160a01b031663e78c9b3b8d6040518263ffffffff1660e01b815260040161067f9190611879565b60206040518083038186803b15801561069757600080fd5b505afa1580156106ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106cf9190611847565b610100830151604051631e739ae360e21b81529197506001600160a01b0316906379ce6b8c90610703908f90600401611879565b60206040518083038186803b15801561071b57600080fd5b505afa15801561072f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610753919061185f565b935061077082610160015160ff16826113c490919063ffffffff16565b925050509295985092959850929598565b60008060008060008060008060008060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630261bf8b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156107eb57600080fd5b505afa1580156107ff573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061082391906115b1565b6001600160a01b03166335ea6a758d6040518263ffffffff1660e01b815260040161084e9190611879565b6101806040518083038186803b15801561086757600080fd5b505afa15801561087b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061089f9190611757565b60e08101516040516370a0823160e01b81529192506001600160a01b038e16916370a08231916108d191600401611879565b60206040518083038186803b1580156108e957600080fd5b505afa1580156108fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109219190611847565b8161010001516001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561095f57600080fd5b505afa158015610973573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109979190611847565b8261012001516001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156109d557600080fd5b505afa1580156109e9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a0d9190611847565b836060015184608001518560a001518661010001516001600160a01b03166390f6fcf26040518163ffffffff1660e01b815260040160206040518083038186803b158015610a5a57600080fd5b505afa158015610a6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a929190611847565b876020015188604001518960c00151866001600160801b03169650856001600160801b03169550846001600160801b03169450826001600160801b03169250816001600160801b031691509a509a509a509a509a509a509a509a509a509a50509193959799509193959799565b60008060008060008060008060008060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630261bf8b6040518163ffffffff1660e01b815260040160206040518083038186803b158015610b6957600080fd5b505afa158015610b7d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ba191906115b1565b6001600160a01b031663c44b11f78d6040518263ffffffff1660e01b8152600401610bcc9190611879565b60206040518083038186803b158015610be457600080fd5b505afa158015610bf8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c1c919061173c565b9050610c2781611487565b909e50929c50909a5098509650610c3d816114b2565b9d9f9c9e509a9c999b989a8d15159a9099909850919650945092505050565b606060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630261bf8b6040518163ffffffff1660e01b815260040160206040518083038186803b158015610cb957600080fd5b505afa158015610ccd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf191906115b1565b90506000816001600160a01b031663d1946dbc6040518163ffffffff1660e01b815260040160006040518083038186803b158015610d2e57600080fd5b505afa158015610d42573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610d6a9190810190611605565b90506000815167ffffffffffffffff81118015610d8657600080fd5b50604051908082528060200260200182016040528015610dc057816020015b610dad6114ee565b815260200190600190039081610da55790505b50905060005b8251811015610fc957739f8f72aa9304c8b593d555f12ef6589cc3a579a26001600160a01b0316838281518110610df957fe5b60200260200101516001600160a01b03161415610e785760405180604001604052806040518060400160405280600381526020016226a5a960e91b8152508152602001848381518110610e4857fe5b60200260200101516001600160a01b0316815250828281518110610e6857fe5b6020026020010181905250610fc1565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee6001600160a01b0316838281518110610ea257fe5b60200260200101516001600160a01b03161415610ef15760405180604001604052806040518060400160405280600381526020016208aa8960eb1b8152508152602001848381518110610e4857fe5b6040518060400160405280848381518110610f0857fe5b60200260200101516001600160a01b03166395d89b416040518163ffffffff1660e01b815260040160006040518083038186803b158015610f4857600080fd5b505afa158015610f5c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f8491908101906116b2565b8152602001848381518110610f9557fe5b60200260200101516001600160a01b0316815250828281518110610fb557fe5b60200260200101819052505b600101610dc6565b509250505090565b6000806000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630261bf8b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561103057600080fd5b505afa158015611044573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061106891906115b1565b6001600160a01b03166335ea6a75866040518263ffffffff1660e01b81526004016110939190611879565b6101806040518083038186803b1580156110ac57600080fd5b505afa1580156110c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110e49190611757565b60e0810151610100820151610120909201519097919650945092505050565b606060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316630261bf8b6040518163ffffffff1660e01b815260040160206040518083038186803b15801561116057600080fd5b505afa158015611174573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061119891906115b1565b90506000816001600160a01b031663d1946dbc6040518163ffffffff1660e01b815260040160006040518083038186803b1580156111d557600080fd5b505afa1580156111e9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526112119190810190611605565b90506000815167ffffffffffffffff8111801561122d57600080fd5b5060405190808252806020026020018201604052801561126757816020015b6112546114ee565b81526020019060019003908161124c5790505b50905060005b8251811015610fc9576000846001600160a01b03166335ea6a7585848151811061129357fe5b60200260200101516040518263ffffffff1660e01b81526004016112b79190611879565b6101806040518083038186803b1580156112d057600080fd5b505afa1580156112e4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113089190611757565b905060405180604001604052808260e001516001600160a01b03166395d89b416040518163ffffffff1660e01b815260040160006040518083038186803b15801561135257600080fd5b505afa158015611366573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261138e91908101906116b2565b81526020018260e001516001600160a01b03168152508383815181106113b057fe5b60209081029190910101525060010161126d565b60006080821060405180604001604052806002815260200161373760f01b8152509061146e5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561143357818101518382015260200161141b565b50505050905090810190601f1680156114605780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5050815160016002830281019190911c16151592915050565b5161ffff80821692601083901c821692602081901c831692603082901c60ff169260409290921c1690565b51670100000000000000811615159167020000000000000082161515916704000000000000008116151591670800000000000000909116151590565b60408051808201909152606081526000602082015290565b805161151181611a77565b919050565b600060208284031215611527578081fd5b6040516020810181811067ffffffffffffffff8211171561154457fe5b6040529151825250919050565b80516001600160801b038116811461151157600080fd5b805164ffffffffff8116811461151157600080fd5b805160ff8116811461151157600080fd5b60006020828403121561159f578081fd5b81356115aa81611a77565b9392505050565b6000602082840312156115c2578081fd5b81516115aa81611a77565b600080604083850312156115df578081fd5b82356115ea81611a77565b915060208301356115fa81611a77565b809150509250929050565b60006020808385031215611617578182fd5b825167ffffffffffffffff8082111561162e578384fd5b818501915085601f830112611641578384fd5b81518181111561164d57fe5b838102915061165d848301611a23565b8181528481019084860184860187018a1015611677578788fd5b8795505b838610156116a5578051945061169085611a77565b8483526001959095019491860191860161167b565b5098975050505050505050565b6000602082840312156116c3578081fd5b815167ffffffffffffffff808211156116da578283fd5b818401915084601f8301126116ed578283fd5b8151818111156116f957fe5b61170c601f8201601f1916602001611a23565b9150808252856020828501011115611722578384fd5b611733816020840160208601611a47565b50949350505050565b60006020828403121561174d578081fd5b6115aa8383611516565b600061018080838503121561176a578182fd5b61177381611a23565b905061177f8484611516565b815261178d60208401611551565b602082015261179e60408401611551565b60408201526117af60608401611551565b60608201526117c060808401611551565b60808201526117d160a08401611551565b60a08201526117e260c08401611568565b60c08201526117f360e08401611506565b60e0820152610100611806818501611506565b90820152610120611818848201611506565b9082015261014061182a848201611506565b9082015261016061183c84820161157d565b908201529392505050565b600060208284031215611858578081fd5b5051919050565b600060208284031215611870578081fd5b6115aa82611568565b6001600160a01b0391909116815260200190565b6001600160a01b0393841681529183166020830152909116604082015260600190565b60208082528251828201819052600091906040908185019080840286018301878501865b8381101561193257603f1989840301855281518051878552805180898701526060611904828289018d8601611a47565b928a01516001600160a01b0316868b015296890196601f01601f1916909401019250908601906001016118d4565b509098975050505050505050565b998a5260208a0198909852604089019690965260608801949094526080870192909252151560a0860152151560c0850152151560e0840152151561010083015215156101208201526101400190565b998a5260208a019890985260408901969096526060880194909452608087019290925260a086015260c085015260e084015261010083015264ffffffffff166101208201526101400190565b988952602089019790975260408801959095526060870193909352608086019190915260a085015260c084015264ffffffffff1660e083015215156101008201526101200190565b60405181810167ffffffffffffffff81118282101715611a3f57fe5b604052919050565b60005b83811015611a62578181015183820152602001611a4a565b83811115611a71576000848401525b50505050565b6001600160a01b0381168114611a8c57600080fd5b5056fea2646970667358221220c42799446754345a7dcc76d9907bb30694ea49ffe2051f5cd91351726b5c01b764736f6c63430007060033';

export class AaveProtocolDataProvider__factory extends ContractFactory {
  constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    addressesProvider: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AaveProtocolDataProvider> {
    return super.deploy(addressesProvider, overrides || {}) as Promise<AaveProtocolDataProvider>;
  }
  getDeployTransaction(
    addressesProvider: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(addressesProvider, overrides || {});
  }
  attach(address: string): AaveProtocolDataProvider {
    return super.attach(address) as AaveProtocolDataProvider;
  }
  connect(signer: Signer): AaveProtocolDataProvider__factory {
    return super.connect(signer) as AaveProtocolDataProvider__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AaveProtocolDataProviderInterface {
    return new utils.Interface(_abi) as AaveProtocolDataProviderInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): AaveProtocolDataProvider {
    return new Contract(address, _abi, signerOrProvider) as AaveProtocolDataProvider;
  }
}
