import { providers } from 'ethers';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';
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
import { MultiFeeDistribution } from './MultiFeeDistribution';
import { MultiFeeDistribution__factory } from './MultiFeeDistribution__factory';

export class MultiFeeDistributionService extends BaseService<MultiFeeDistribution> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider) {
    super(provider, MultiFeeDistribution__factory);

    this.contractAddress = rdntConfig.multiFeeDistribution;
    this.erc20Service = new ERC20Service(provider);
  }

  // @StakingValidator
  public async getBalances(
    // @isEthAddress() user: tEthereumAddress,
    // @isPositiveAmount() amount: string,
    // @isEthAddress() onBehalfOf?: tEthereumAddress,
    user: tEthereumAddress
  ): Promise<[BigNumber, BigNumber, BigNumber]> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const [totalBalance, unlockedBalance, earnedBalances] = await Promise.all([
      multiFeeDistributionContract.callStatic.totalBalance(user),
      multiFeeDistributionContract.callStatic.unlockedBalance(user),
      multiFeeDistributionContract.callStatic.earnedBalances(user),
    ]);

    const balance = totalBalance
      .div(10 ** 9)
      .div(10 ** 9)
      .toString();

    const unlocked = unlockedBalance
      .div(10 ** 9)
      .div(10 ** 9)
      .toString();

    const earned = earnedBalances.total
      .div(10 ** 9)
      .div(10 ** 9)
      .toString();

    console.log({ totalBalance, unlockedBalance, earnedBalances });
    console.log(totalBalance.toString(), unlockedBalance.toString(), earnedBalances.toString());
    console.log({ balance, unlocked, earned });

    return [valueToBigNumber(balance), valueToBigNumber(unlocked), valueToBigNumber(earned)];
  }

  public async getLockedBalances(
    user: tEthereumAddress
  ): Promise<{ amount: string; expiryDate: Date }[]> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const lockedBalances = await multiFeeDistributionContract.callStatic.lockedBalances(user);

    return lockedBalances.lockData.map(({ amount, unlockTime }) => {
      return {
        amount: amount
          .div(10 ** 9)
          .div(10 ** 9)
          .toString(),
        expiryDate: new Date(+unlockTime.mul(1000).toString()),
      };
    });
  }

  public async getEarnedBalances(
    user: tEthereumAddress
  ): Promise<{ amount: string; expiryDate: Date }[]> {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    const earnedBalances = await multiFeeDistributionContract.callStatic.earnedBalances(user);
    console.log({ earnedBalances });

    return earnedBalances.earningsData.map(({ amount, unlockTime }) => {
      return {
        amount: amount
          .div(10 ** 9)
          .div(10 ** 9)
          .toString(),
        expiryDate: new Date(+unlockTime.mul(1000).toString()),
      };
    });
  }

  public async withdraw(user: tEthereumAddress, amount: string) {
    const txs: EthereumTransactionTypeExtended[] = [];

    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );
    // eslint-disable-next-line new-cap
    const convertedAmount: string = valueToWei(amount, 18); // todo:pavlik HARDCODE 18, should be from settings

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () => multiFeeDistributionContract.populateTransaction.withdraw(convertedAmount),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public async exit(user: tEthereumAddress) {
    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );

    return this.generateTxCallback({
      rawTxMethod: () => multiFeeDistributionContract.populateTransaction.exit(false),
      from: user,
    });
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
    const txs: EthereumTransactionTypeExtended[] = [];
    const { decimalsOf, isApproved, approve } = this.erc20Service;

    const approved = await isApproved({
      token: rdntConfig.rdntToken,
      user,
      spender: this.contractAddress,
      amount,
    });
    if (!approved) {
      const approveTx = approve({
        user,
        token: rdntConfig.rdntToken,
        spender: this.contractAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const multiFeeDistributionContract: MultiFeeDistribution = this.getContractInstance(
      this.contractAddress
    );
    // eslint-disable-next-line new-cap
    const convertedAmount: string = valueToWei(amount, 18); // todo:pavlik HARDCODE 18, should be from settings

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
