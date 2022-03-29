import { ContractTransaction, providers } from 'ethers';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';
import BaseService from '@aave/contract-helpers/dist/esm/commons/BaseService.js';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
} from '@aave/contract-helpers/dist/esm/commons/types';
import {
  ERC20Service,
  IERC20ServiceInterface,
} from '@aave/contract-helpers/dist/esm/erc20-contract';
import rdntConfig from '../../../ui-config/rdnt';
import { GeistToken__factory } from './GeistToken__factory';
import { GeistToken } from './GeistToken';

export class GeistTokenContract extends BaseService<GeistToken> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider) {
    super(provider, GeistToken__factory);

    this.contractAddress = rdntConfig.rdntToken;
    this.erc20Service = new ERC20Service(provider);
  }

  public async getInfo(
    user: tEthereumAddress
  ): Promise<{ walletBalance: BigNumber; currencySymbol: string; totalSupply: BigNumber }> {
    const geistTokenContract: GeistToken = this.getContractInstance(this.contractAddress);

    const [walletBalance, currencySymbol, totalSupply] = await Promise.all([
      geistTokenContract.callStatic.balanceOf(user),
      geistTokenContract.callStatic.symbol(),
      geistTokenContract.callStatic.totalSupply(),
    ]);

    const balance = walletBalance
      .div(10 ** 9)
      .div(10 ** 9)
      .toString();

    const total = totalSupply
      .div(10 ** 9)
      .div(10 ** 9)
      .toString();

    console.log({ balance, total });

    return {
      walletBalance: valueToBigNumber(balance.toString()),
      currencySymbol,
      totalSupply: valueToBigNumber(total.toString()),
    };
  }

  public async mint(user: tEthereumAddress): Promise<ContractTransaction> {
    const geistTokenContract: GeistToken = this.getContractInstance(this.contractAddress);

    return geistTokenContract.mint(user, 100);
  }
}
