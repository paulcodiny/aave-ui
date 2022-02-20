import React from 'react';
import { useIntl } from 'react-intl';

import BasicForm from '../../../../components/forms/BasicForm';
import ContentItem from '../ContentItem';

import defaultMessages from '../../../../defaultMessages';
import iconLock from '../../images/icon-lock.svg';

import staticStyles from './style';

export function ContentItemLock(props: {
  maxAmount: string;
  currencySymbol: string;
  onSubmit: () => void;
}) {
  const intl = useIntl();

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
        <div className="ManageRadiant__form-legend">
          <label className="ManageRadiant__input-label">Wallet Balance:</label>

          <div className="ManageRadiant__value">
            <span className="ManageRadiant__value-rnd">
              <strong>581</strong> RADIANT
            </span>
            <br />
            <span className="ManageRadiant__value-usd">$ 1543</span>
          </div>
        </div>
        <div className="ManageRadiant__form-controls">
          <BasicForm
            maxAmount={props.maxAmount}
            currencySymbol={props.currencySymbol}
            onSubmit={props.onSubmit}
            submitButtonTitle="Lock"
          />
        </div>
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
