import React from 'react';
import { useIntl } from 'react-intl';

import { useThemeContext } from '@aave/aave-ui-kit';
import Value from '../../../../components/basic/Value';

import messages from './messages';
import staticStyles from './style';
import GradientLine from "../../../../components/basic/GradientLine";

interface StakingTopPanelProps {
  title: string;
  fundsInTheSM: number | string;
  totalEmissionPerDay: number | string;
}

export default function StakingTopPanel({
  title,
  fundsInTheSM,
  totalEmissionPerDay,
}: StakingTopPanelProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const data = [
    {
      title: messages.fundsInTheSM,
      value: fundsInTheSM,
      symbol: 'USD',
    },
    {
      title: messages.totalEmissionPerDay,
      value: totalEmissionPerDay,
      symbol: 'AAVE',
    },
  ];

  return (
    <div className="StakingTopPanel">
      <div className="StakingTopPanel__values">
        {data.map((item, itemIndex) => (
          <React.Fragment  key={item.symbol}>
            <div className="StakingTopPanel__value-inner">
              <p className="StakingTopPanel__value-title">{intl.formatMessage(item.title)}</p>
              <Value
                value={item.value}
                symbol={item.symbol}
                maximumValueDecimals={2}
                minimumValueDecimals={2}
                tokenIcon={item.symbol === 'USD'}
                leftSided={true}
              />
            </div>

            {(itemIndex < data.length - 1) ? <GradientLine size={2} direction="vertical" /> : null}
          </React.Fragment>
        ))}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .StakingTopPanel {
          color: ${currentTheme.darkBlue.hex};
        }
      `}</style>
    </div>
  );
}
