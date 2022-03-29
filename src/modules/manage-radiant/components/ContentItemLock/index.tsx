import React, { useState } from 'react';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';

import BasicForm from '../../../../components/forms/BasicForm';
import Value from '../../../../components/basic/Value';
import ContentItem from '../ContentItem';
import LockConfirmation from '../LockConfirmation';

import iconLock from '../../images/icon-lock.svg';

import staticStyles from './style';

interface ContentItemLockProps {
  maxAmount: string;
  currencySymbol: string;
  walletBalance: BigNumber;
  priceInMarketReferenceCurrency: string;
}

function ContentItemLock({
  maxAmount,
  currencySymbol,
  priceInMarketReferenceCurrency,
  walletBalance,
}: ContentItemLockProps) {
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const [amount, setAmount] = useState<BigNumber | null>(null);

  const amountIntEth = walletBalance.multipliedBy(priceInMarketReferenceCurrency);
  const amountInUsd = amountIntEth.multipliedBy(marketRefPriceInUsd);

  return (
    <>
      <ContentItem
        className="ManageRadiant__content-lock"
        title="Lock RDNT"
        apr="XXX.XX%"
        description={
          <>
            <p>Lock RDNT and earn platform fees and penalty fees in unlocked RDNT.</p>
            <p>
              Locked RDNT is subject to a three month lock and will continue to earn fees after the
              locks expire if you do not withdraw.
            </p>
          </>
        }
      >
        {!!amount ? (
          <LockConfirmation
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
                submitButtonTitle="Lock"
              />
            </div>
          </>
        )}
      </ContentItem>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ManageRadiant__content-lock h3:after {
          background: url(${iconLock}) no-repeat;
        }
      `}</style>
    </>
  );
}

export default ContentItemLock;
