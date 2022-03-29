import React from 'react';

import GradientLine from '../../../../components/basic/GradientLine';

import staticStyles from './style';

interface TableProps {
  title: string;
  value?: string;
  action?: string;
  table?: { amount: string; expiryDate: Date }[];
}

export function Table({ title, value = '', action = 'Vesting', table = [] }: TableProps) {
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
            {table.map((record) => (
              <>
                <div className="Table__column">Total RADIANT {action}</div>
                <div className="Table__column">
                  <strong>{record.amount}</strong> RDNT
                </div>
                <div className="Table__column">{record.expiryDate.toLocaleString('en-GB')}</div>
              </>
            ))}
          </div>
          {/*<div className="Table__row">*/}
          {/*  <div className="Table__column">Total value</div>*/}
          {/*  <div className="Table__column">*/}
          {/*    <strong>$ 14.21</strong> USD*/}
          {/*  </div>*/}
          {/*  <div className="Table__column" />*/}
          {/*</div>*/}
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
