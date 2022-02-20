import React from 'react';

import GradientLine from '../../../../components/basic/GradientLine';
import DefaultButton from '../../../../components/basic/DefaultButton';

import staticStyles from './style';

interface MainStatsProps {}

export function MainStats({}: MainStatsProps) {
  return (
    <>
      <div className="Table">
        <div className="Table__body">
          <div className="Table__row">
            <div className="Table__column">
              <h4>Unlock</h4>
              <p>Stacked RADIANT and expired RADIANT vest</p>
            </div>
            <div className="Table__column">
              <strong>12</strong> RADIANT
            </div>
            <div className="Table__column">
              <DefaultButton title="Lock" color="purple" transparent />
            </div>
          </div>

          <GradientLine size={2} />

          <div className="Table__row">
            <div className="Table__column">
              <h4>Vesting</h4>
              <p>
                Early Exit Penalty: <strong>0.000</strong>
              </p>
            </div>
            <div className="Table__column">
              <strong>12</strong> RADIANT
            </div>
            <div className="Table__column"></div>
          </div>

          <GradientLine size={2} />

          <div className="Table__row">
            <div className="Table__column">
              <h4>Claim all of the above</h4>
              <p>
                RADIANT that can be claimed with a <strong>50% penalty</strong>
              </p>
            </div>
            <div className="Table__column"></div>
            <div className="Table__column">
              <DefaultButton title="Claim all" color="purple" transparent disabled />
            </div>
          </div>

          <GradientLine size={2} />

          <div className="Table__row">
            <div className="Table__column">
              <h4>Expired Locked </h4>
              <p>RADIANT locks that have exceeded the 3 month lock period and now withdrawable</p>
            </div>
            <div className="Table__column">
              <strong>12</strong> RADIANT
            </div>
            <div className="Table__column">
              <DefaultButton title="Lock" color="purple" transparent />
            </div>
          </div>
        </div>
      </div>

      <style jsx={true}>{staticStyles}</style>
    </>
  );
}
