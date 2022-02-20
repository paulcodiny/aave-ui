import React from 'react';

import GradientLine from '../../../../components/basic/GradientLine';

import staticStyles from './style';

interface TableProps {
  title: string;
}

export function Table({ title }: TableProps) {
  return (
    <>
      <div className="Table">
        <h3>{title}</h3>

        <div className="Table__header">
          <div className="Table__header-column">Vesting</div>
          <div className="Table__header-column">Sum</div>
          <div className="Table__header-column">Expiry</div>
        </div>

        <GradientLine size={2} />

        <div className="Table__body">
          <div className="Table__row">
            <div className="Table__column">Total RADIANT Vesting</div>
            <div className="Table__column">
              <strong>12.00</strong> RADIANT
            </div>
            <div className="Table__column">3 day 1 month</div>
          </div>
          <div className="Table__row">
            <div className="Table__column">Total value</div>
            <div className="Table__column">
              <strong>$ 14.21</strong> USD
            </div>
            <div className="Table__column" />
          </div>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
