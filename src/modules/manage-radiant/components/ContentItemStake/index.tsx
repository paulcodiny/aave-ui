import React from 'react';
import { useIntl } from 'react-intl';

import BasicForm from '../../../../components/forms/BasicForm';
import ContentItem from '../ContentItem';

import defaultMessages from '../../../../defaultMessages';
import iconCoins from '../../images/icon-coins.svg';
import staticStyles from './style';

export function ContentItemStake(props: {
  maxAmount: string;
  currencySymbol: string;
  onSubmit: () => void;
}) {
  const intl = useIntl();

  return (
    <>
      <ContentItem
        className="ManageRadiant__content-stake"
        title="Stake RADIANT"
        apr="72.53%"
        description={<p>Stake RADIANT and earn platform fees with on lockup period</p>}
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
            submitButtonTitle={intl.formatMessage(defaultMessages.stake)}
          />
        </div>
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
