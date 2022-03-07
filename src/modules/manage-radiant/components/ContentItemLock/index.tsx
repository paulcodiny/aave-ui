import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { BigNumber } from '@aave/protocol-js';

import BasicForm from '../../../../components/forms/BasicForm';
import ContentItem from '../ContentItem';

import iconLock from '../../images/icon-lock.svg';

import staticStyles from './style';
import depositConfirmationMessages from '../../../deposit/screens/DepositConfirmation/messages';
import Value from '../../../../components/basic/Value';
import {
  ComputedReserveData,
  UserSummary,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import NoDataPanel from '../../../../components/NoDataPanel';
import { ComputedUserReserve } from '@aave/math-utils';
import { getAssetInfo } from '../../../../helpers/config/assets-config';
import LockConfirmation from '../LockConfirmation';

interface ContentItemLockProps {
  maxAmount: string;
  currencySymbol: string;
  onSubmit: () => void;
  amount?: BigNumber;
  walletBalance: BigNumber;
  walletBalanceUSD: BigNumber;
  user: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
}

function ContentItemLock({
  maxAmount,
  currencySymbol,
  onSubmit = () => {},
  poolReserve,
  userReserve,
  user,
  // amount,
  walletBalance,
}: ContentItemLockProps) {
  // todo:pavlik

  // const amount = new BigNumber('100');

  const intl = useIntl();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const [amount, setAmount] = useState<BigNumber | null>(null);
  const assetDetails = getAssetInfo(poolReserve.symbol);

  const amountIntEth = walletBalance.multipliedBy(poolReserve.priceInMarketReferenceCurrency);
  const amountInUsd = amountIntEth.multipliedBy(marketRefPriceInUsd);

  return (
    <>
      <ContentItem
        className="ManageRadiant__content-lock"
        title="Lock RADIANT"
        apr="189.42%"
        description={
          <>
            <p>Lock RADIANT and earn platform fees and penalty fees in unlocked RADIANT</p>
            <p>
              Locked is subject to a a three month lock and will continue to earn after locks expire
              if you do not withdraw
            </p>
          </>
        }
      >
        {!!amount ? (
          <LockConfirmation
            maxAmount={maxAmount}
            currencySymbol={currencySymbol}
            onSubmit={(...args) => console.log(args)}
            amount={amount}
            user={user}
            userReserve={userReserve}
            walletBalance={walletBalance}
            poolReserve={poolReserve}
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
