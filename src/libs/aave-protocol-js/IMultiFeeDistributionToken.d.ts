/* Autogenerated file. Do not edit manually. */
/* eslint-disable */

import { ethers, EventFilter, Signer, BigNumber, BigNumberish, PopulatedTransaction } from 'ethers';
import { Contract, ContractTransaction, Overrides, CallOverrides } from '@ethersproject/contracts';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';

interface IMultiFeeDistributionTokenInterface extends ethers.utils.Interface {
  functions: {
    'stack(uint256,boolean)': FunctionFragment;
  };
  encodeFunctionData(functionFragment: 'stake', values: [BigNumberish, boolean]): string;

  decodeFunctionResult(functionFragment: 'stake', data: BytesLike): Result;

  events: {};
}

export class IMultiFeeDistributionToken extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IMultiFeeDistributionTokenInterface;

  functions: {
    stake(amount: BigNumberish, isLock: boolean): Promise<ContractTransaction>;

    'stake(uint256,boolean)'(amount: BigNumberish, isLock: boolean): Promise<ContractTransaction>;
  };

  stake(amount: BigNumberish, isLock: boolean): Promise<ContractTransaction>;

  'stake(address,uint256)'(amount: BigNumberish, isLock: boolean): Promise<ContractTransaction>;

  callStatic: {
    stake(amount: BigNumberish, isLock: boolean): Promise<void>;

    'stake(uint256,boolean)'(amount: BigNumberish, isLock: boolean): Promise<void>;
  };

  filters: {};

  estimateGas: {
    stake(amount: BigNumberish, isLock: boolean): Promise<BigNumber>;

    'stake(uint256,boolean)'(amount: BigNumberish, isLock: boolean): Promise<BigNumber>;
  };

  populateTransaction: {
    stake(amount: BigNumberish, isLock: boolean): Promise<PopulatedTransaction>;

    'stake(uint256,boolean)'(amount: BigNumberish, isLock: boolean): Promise<PopulatedTransaction>;
  };
}
