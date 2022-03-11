/* Autogenerated file. Do not edit manually. */
/* eslint-disable */

import { Contract, Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';

import type { IMultiFeeDistributionToken } from './IMultiFeeDistributionToken';

export class IMultiFeeDistributionToken__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): IMultiFeeDistributionToken {
    return new Contract(address, _abi, signerOrProvider) as IMultiFeeDistributionToken;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isLock',
        type: 'bool',
      },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
