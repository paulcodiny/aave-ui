import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';
import { ComputedUserReserve } from '@aave/math-utils';

import {
  ComputedReserveData,
  UserSummary,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import BasicForm from '../../../../components/forms/BasicForm';
import Value from '../../../../components/basic/Value';
import ContentItem from '../ContentItem';
import StakeConfirmation from '../StakeConfirmation';

import defaultMessages from '../../../../defaultMessages';
import iconCoins from '../../images/icon-coins.svg';
import staticStyles from './style';

interface ContentItemStakeProps {
  maxAmount: string;
  currencySymbol: string;
  onSubmit: () => void;
  amount?: BigNumber;
  walletBalance: BigNumber;
  walletBalanceUSD: BigNumber;
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
}

export function ContentItemStake({
  maxAmount,
  currencySymbol,
  poolReserve,
  userReserve,
  user,
  onSubmit,
  walletBalance,
}: ContentItemStakeProps) {
  const intl = useIntl();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();

  const [amount, setAmount] = useState<BigNumber | null>(null);

  const amountIntEth = walletBalance.multipliedBy(poolReserve.priceInMarketReferenceCurrency);
  const amountInUsd = amountIntEth.multipliedBy(marketRefPriceInUsd);

  return (
    <>
      <ContentItem
        className="ManageRadiant__content-stake"
        title="Stake RADIANT"
        apr="72.53%"
        description={<p>Stake RADIANT and earn platform fees with on lockup period</p>}
      >
        {!!amount ? (
          <StakeConfirmation
            amount={amount}
            maxAmount={valueToBigNumber(maxAmount)}
            onAfterSuccessClick={() => {
              setAmount(null);
            }}
          />
        ) : (
          <>
            <div className="ManageRadiant__form-legend">
              <label className="ManageRadiant__input-label">Wallet Balance:</label>

              <Value
                className="ManageRadiant__value"
                symbol={currencySymbol}
                value={walletBalance.toString()}
                tokenIcon={true}
                subValue={amountInUsd.toString()}
                subSymbol="USD"
                tooltipId={currencySymbol}
              />
            </div>
            <div className="ManageRadiant__form-controls">
              <BasicForm
                maxAmount={maxAmount}
                currencySymbol={currencySymbol}
                onSubmit={(amount) => setAmount(new BigNumber(amount))}
                submitButtonTitle={intl.formatMessage(defaultMessages.stake)}
              />
            </div>
          </>
        )}
      </ContentItem>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ManageRadiant__content-stake h3:after {
          background: url(${iconCoins}) no-repeat;
        }
      `}</style>
    </>
  );
}
