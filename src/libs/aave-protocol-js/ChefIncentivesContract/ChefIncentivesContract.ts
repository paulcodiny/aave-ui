import { BigNumber, providers } from 'ethers';
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
import rdntConfig from '../../../ui-config/rdnt';
import { ChefIncentivesController } from './ChefIncentivesController';
import { ChefIncentivesController__factory } from './ChefIncentivesController__factory';

// export interface ChefIncentivesInterface {
//   stakingContractAddress: tEthereumAddress;
//
//   stake: (
//     user: tEthereumAddress,
//     amount: string,
//     isLock: boolean
//   ) => Promise<EthereumTransactionTypeExtended[]>;
// }

export class ChefIncentivesService extends BaseService<ChefIncentivesController> {
  // implements ChefIncentivesInterface
  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider) {
    super(provider, ChefIncentivesController__factory);

    this.erc20Service = new ERC20Service(provider);
  }

  // @StakingValidator
  public async claim(
    // @isEthAddress() user: tEthereumAddress,
    // @isPositiveAmount() amount: string,
    // @isEthAddress() onBehalfOf?: tEthereumAddress,
    user: tEthereumAddress,
    tokens: string[]
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];

    const ChefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      rdntConfig.chefIncentivesController
    );

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => ChefIncentivesContract.populateTransaction.claim(user, tokens),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.REWARD_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async claimableRewards(
    // @isEthAddress() user: tEthereumAddress,
    // @isPositiveAmount() amount: string,
    // @isEthAddress() onBehalfOf?: tEthereumAddress,
    user: tEthereumAddress,
    tokens: string[]
  ): Promise<BigNumber[]> {
    const ChefIncentivesContract: ChefIncentivesController = this.getContractInstance(
      rdntConfig.chefIncentivesController
    );

    return ChefIncentivesContract.callStatic.claimableReward(user, tokens);
  }
}
