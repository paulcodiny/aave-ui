import { LendingPool as ParentLendingPool } from '@aave/contract-helpers';
import {
  API_ETH_MOCK_ADDRESS,
  DEFAULT_APPROVE_AMOUNT,
  getTxValue,
  valueToWei,
} from '@aave/contract-helpers/dist/esm/commons/utils';
import { eEthereumTxType, ProtocolAction } from '@aave/contract-helpers/dist/esm/commons/types';
import { LPValidator } from '@aave/contract-helpers/src/commons/validators/methodValidators';
import {
  isEthAddress,
  isPositiveAmount,
} from '@aave/contract-helpers/src/commons/validators/paramValidators';
import { tEthereumAddress } from '@aave/contract-helpers/src/commons/types';
import { FunctionFragment } from '@ethersproject/abi';
import { BigNumberish } from 'ethers';
import { ILendingPoolWithLock } from './ILendingPoolWithLock';

export type LPLockParamsType = {
  user: tEthereumAddress;
  reserve: tEthereumAddress;
  amount: string;
  onBehalfOf?: tEthereumAddress;
  referralCode?: string;
};

interface withLock {
  functions: {
    'lock(address,uint256,address,uint16)': FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: 'lock',
    values: [string, BigNumberish, string, BigNumberish]
  ): string;
}

export default class LendingPool extends ParentLendingPool {
  // @LPValidator
  public async lock(
    // @isEthAddress('user')
    // @isEthAddress('reserve')
    // @isPositiveAmount('amount')
    // @isEthAddress('onBehalfOf')
    { user, reserve, amount, onBehalfOf, referralCode }: LPLockParamsType
  ) {
    // todo:pavlik what's this
    // if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
    //   return this.wethGatewayService.depositETH({
    //     lendingPool: this.lendingPoolAddress,
    //     user,
    //     amount,
    //     onBehalfOf,
    //     referralCode,
    //   });
    // }
    const { isApproved, approve, decimalsOf } = this.erc20Service;
    const txs = [];
    const reserveDecimals = await decimalsOf(reserve);
    const convertedAmount = valueToWei(amount, reserveDecimals);
    const fundsAvailable = await this.synthetixService.synthetixValidation({
      user,
      reserve,
      amount: convertedAmount,
    });
    if (!fundsAvailable) {
      throw new Error('Not enough funds to execute operation');
    }

    const approved = await isApproved({
      token: reserve,
      user,
      spender: this.lendingPoolAddress,
      amount,
    });
    if (!approved) {
      const approveTx = approve({
        user,
        token: reserve,
        spender: this.lendingPoolAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const lendingPoolContract: ILendingPoolWithLock = this.getContractInstance(
      this.lendingPoolAddress
    );
    const txCallback = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.lock(
          reserve,
          convertedAmount,
          onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user,
          referralCode !== null && referralCode !== void 0 ? referralCode : '0'
        ),
      from: user,
      value: getTxValue(reserve, convertedAmount),
    });
    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.deposit),
    });

    return txs;
  }
}
