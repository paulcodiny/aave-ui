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
import { AaveProtocolDataProvider__factory } from './AaveProtocolDataProvider__factory';
import { AaveProtocolDataProvider } from './AaveProtocolDataProvider';

// export interface ChefIncentivesInterface {
//   stakingContractAddress: tEthereumAddress;
//
//   stake: (
//     user: tEthereumAddress,
//     amount: string,
//     isLock: boolean
//   ) => Promise<EthereumTransactionTypeExtended[]>;
// }

export class AaveProtocolDataProviderContract extends BaseService<AaveProtocolDataProvider> {
  // implements ChefIncentivesInterface
  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider) {
    super(provider, AaveProtocolDataProvider__factory);

    this.erc20Service = new ERC20Service(provider);
  }

  public async getTokens(): Promise<string[]> {
    const aaveProtocolDataProvider: AaveProtocolDataProvider = this.getContractInstance(
      rdntConfig.aaveProtocolDataProvider
    );

    const res: string[] = [];

    const tokens = await aaveProtocolDataProvider.getAllReservesTokens();
    for (let i = 0; i < tokens.length; i += 1) {
      const [aToken, , vToken] = await aaveProtocolDataProvider.getReserveTokensAddresses(
        tokens[i].tokenAddress
      );
      // @ts-ignore
      res.push(aToken, vToken);
    }

    return res;
  }
}
