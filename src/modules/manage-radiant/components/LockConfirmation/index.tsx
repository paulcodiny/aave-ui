import React from 'react';
import { useIntl } from 'react-intl';
import { BigNumber } from '@aave/protocol-js';

import defaultMessages from '../../../../defaultMessages';

import messages from './messages';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import { getReferralCode } from '../../../../libs/referral-handler';
import { ComputedReserveData, UserSummary } from '../../../../libs/pool-data-provider';
import { useTxBuilderContext } from '../../../../libs/tx-provider';
import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import NoDataPanel from '../../../../components/NoDataPanel';
import { ComputedUserReserve } from '@aave/math-utils';
import { getAssetInfo } from '../../../../helpers/config/assets-config';

interface LockConfirmationProps {
  maxAmount: string;
  currencySymbol: string;
  onSubmit: () => void;
  amount: BigNumber;
  walletBalance: BigNumber;
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
}

function LockConfirmation({
  onSubmit = () => {},
  currencySymbol,
  poolReserve,
  userReserve,
  user,
  amount,
  walletBalance,
}: LockConfirmationProps) {
  console.log({
    currencySymbol,
    poolReserve,
    userReserve,
    user,
    amount,
  });

  const intl = useIntl();
  const { lendingPool } = useTxBuilderContext();

  const aTokenData = getAtokenInfo({
    address: poolReserve.aTokenAddress,
    symbol: currencySymbol,
    decimals: poolReserve.decimals,
  });
  const assetDetails = getAssetInfo(poolReserve.symbol);

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  let blockingError = '';
  if (walletBalance.lt(amount)) {
    blockingError = intl.formatMessage(messages.errorWalletBalanceNotEnough, {
      poolReserveSymbol: assetDetails.formattedSymbol || assetDetails.symbol,
    });
  }

  const handleGetTransactions = async () => {
    return lendingPool.lock({
      user: user.id,
      reserve: poolReserve.underlyingAsset,
      amount: amount.toString(),
      referralCode: getReferralCode(),
    });
  };

  return (
    <PoolTxConfirmationView
      className="LockConfirmation"
      mainTxName={intl.formatMessage(defaultMessages.lock)}
      boxTitle={intl.formatMessage(defaultMessages.lock)}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      approveDescription={intl.formatMessage(messages.approveDescription)}
      getTransactionsData={handleGetTransactions}
      blockingError={blockingError}
      aTokenData={aTokenData}
    />
  );
}

export default LockConfirmation;
