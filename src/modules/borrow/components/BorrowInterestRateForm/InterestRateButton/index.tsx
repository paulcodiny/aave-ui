import React from 'react';
import classNames from 'classnames';
import { gradient, rgba, useThemeContext } from '@aave/aave-ui-kit';

import ValuePercent from '../../../../../components/basic/ValuePercent';

import fixedIcon from '../images/fixedIcon.svg';
import variableIcon from '../images/variableIcon.svg';

import staticStyles from './style';

export interface InterestRateButtonProps {
  title: string;
  type: 'stable' | 'variable';
  percent: number;
  disabled?: boolean;
  isActive: boolean;
  onClick: () => void;
}

export default function InterestRateButton({
  title,
  type,
  percent,
  disabled,
  isActive,
  onClick,
}: InterestRateButtonProps) {
  const { currentTheme } = useThemeContext();

  const primaryButtonHoverColor = rgba(`${currentTheme.primary.rgb}, 0.5`);
  const secondaryButtonHoverColor = rgba(`${currentTheme.secondary.rgb}, 0.5`);
  const gradientOnActive = gradient(
    217,
    `${currentTheme.primary.rgb}, 1`,
    25,
    `${currentTheme.secondary.rgb}, 1`,
    100
  );

  return (
    <button
      className={classNames('InterestRateButton', {
        InterestRateButtonActive: isActive,
        InterestRateButtonVariable: type === 'variable',
      })}
      disabled={disabled || isActive}
      onClick={onClick}
      type="button"
    >
      <div className="InterestRateButton__inner">
        <div className="InterestRateButton__image-inner">
          {type === 'stable' ? <img src={fixedIcon} alt="" /> : <img src={variableIcon} alt="" />}
        </div>

        <div className="InterestRateButton__description-inner">
          <p className="InterestRateButton__description">{title}</p>
          <ValuePercent
            value={percent}
            color="dark"
            className="InterestRateButton__percent"
            onWhiteBackground={!disabled}
          />
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .InterestRateButton {
          border: 1px solid #e2e2e2;
          border-radius: 5px;

          &__description {
            color: ${currentTheme.darkBlue.hex};
          }
        }

        .InterestRateButtonVariable {
          &:hover {
            &:after {
              background: ${secondaryButtonHoverColor};
            }
          }
        }

        .InterestRateButtonActive {
          background: #7159ff;
          border-color: #7159ff;
          &:disabled {
            .InterestRateButton__percent {
              .ValuePercent__value {
                color: ${currentTheme.white.hex} !important;
                span {
                  color: ${currentTheme.white.hex} !important;
                }
              }
            }
            .InterestRateButton__description {
              color: ${currentTheme.white.hex} !important;
            }
          }
        }
        .InterestRateButtonVariable.InterestRateButtonActive {
          &:disabled {
            .InterestRateButton__percent {
              .ValuePercent__value {
                color: ${currentTheme.white.hex} !important;
              }
            }
          }
        }
      `}</style>
    </button>
  );
}
