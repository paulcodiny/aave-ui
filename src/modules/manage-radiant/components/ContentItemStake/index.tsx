import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
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
  walletBalance: BigNumber;
  priceInMarketReferenceCurrency: string;
}

export function ContentItemStake({
  maxAmount,
  currencySymbol,
  priceInMarketReferenceCurrency,
  walletBalance,
}: ContentItemStakeProps) {
  const intl = useIntl();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();

  const [amount, setAmount] = useState<BigNumber | null>(null);

  const amountIntEth = walletBalance.multipliedBy(priceInMarketReferenceCurrency);
  const amountInUsd = amountIntEth.multipliedBy(marketRefPriceInUsd);

  return (
    <>
      <ContentItem
        className="ManageRadiant__content-stake"
        title="Stake RDNT"
        apr="XXX.XX%"
        description={<p>Stake RDNT and earn platform fees with no lockup period</p>}
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
