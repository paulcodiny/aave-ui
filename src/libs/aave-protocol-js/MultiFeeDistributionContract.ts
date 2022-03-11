import { providers } from 'ethers';
import BaseService from '@aave/contract-helpers/dist/esm/commons/BaseService.js';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
} from '@aave/contract-helpers/dist/esm/commons/types';
import { DEFAULT_APPROVE_AMOUNT, valueToWei } from '@aave/contract-helpers/dist/esm/commons/utils';
// import {
//   SignStakingValidator,
//   StakingValidator,
// } from '../commons/validators/methodValidators';
// import {
//   is0OrPositiveAmount,
//   isEthAddress,
//   isPositiveAmount,
//   isPositiveOrMinusOneAmount,
// } from '../commons/validators/paramValidators';
import {
  ERC20Service,
  IERC20ServiceInterface,
} from '@aave/contract-helpers/dist/esm/erc20-contract';
import { IMultiFeeDistributionToken } from './IMultiFeeDistributionToken';
import { IMultiFeeDistributionToken__factory } from './IMultiFeeDistributionToken__factory';

export interface MultiFeeDistributionInterface {
  stakingContractAddress: tEthereumAddress;

  stake: (
    user: tEthereumAddress,
    amount: string,
    isLock: boolean
  ) => Promise<EthereumTransactionTypeExtended[]>;
}

export class MultiFeeDistributionService
  extends BaseService<IMultiFeeDistributionToken>
  implements MultiFeeDistributionInterface
{
  public readonly stakingContractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider) {
    super(provider, IMultiFeeDistributionToken__factory);

    this.stakingContractAddress = '0x0997811feaa3404930c77C40101492C5b95468Bb';
    this.erc20Service = new ERC20Service(provider);
  }

  // @StakingValidator
  public async stake(
    // @isEthAddress() user: tEthereumAddress,
    // @isPositiveAmount() amount: string,
    // @isEthAddress() onBehalfOf?: tEthereumAddress,
    user: tEthereumAddress,
    amount: string,
    isLock: boolean
  ): Promise<EthereumTransactionTypeExtended[]> {
    debugger;
    const txs: EthereumTransactionTypeExtended[] = [];
    const { decimalsOf, isApproved, approve } = this.erc20Service;

    const approved = await isApproved({
      token: '0xe24054e9eB120c5C8d812378f41C6EB0b942A3e5',
      user,
      spender: this.stakingContractAddress,
      amount,
    });
    if (!approved) {
      const approveTx = approve({
        user,
        token: '0xe24054e9eB120c5C8d812378f41C6EB0b942A3e5',
        spender: this.stakingContractAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const multiFeeDistributionContract: IMultiFeeDistributionToken = this.getContractInstance(
      this.stakingContractAddress
    );
    // eslint-disable-next-line new-cap
    const convertedAmount: string = valueToWei(amount, 18); // todo:pavlik HARDCODE 18, should be from settings

    console.log(multiFeeDistributionContract);

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        multiFeeDistributionContract.populateTransaction.stake(convertedAmount, isLock),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }
}
