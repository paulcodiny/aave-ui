import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber } from '@aave/protocol-js';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { useLanguageContext } from '../../../../libs/language-provider';
import Row from '../../../basic/Row';
import ValuePercent from '../../../basic/ValuePercent';
import Value from '../../../basic/Value';
import GradientLine from '../../../basic/GradientLine';
import MaxLTVHelpModal from '../../../HelpModal/MaxLTVHelpModal';
import LiquidationThresholdHelpModal from '../../../HelpModal/LiquidationThresholdHelpModal';
import LiquidationBonusHelpModal from '../../../HelpModal/LiquidationBonusHelpModal';
import { ValidationWrapperComponentProps } from '../../../RouteParamsValidationWrapper';
import { InterestRateSeries } from '../../../graphs/types';
import { GraphLegendDot } from '../../../graphs/GraphLegend';

import messages from './messages';
import staticStyles from './style';

interface CurrencyOverviewProps
  extends Pick<ValidationWrapperComponentProps, 'poolReserve' | 'currencySymbol'> {
  title?: string;
  type: 'deposit' | 'borrow';
  showGraphCondition: boolean;
  dots?: GraphLegendDot[];
  series: InterestRateSeries[];
  isCollapse?: boolean;
  children?: JSX.Element;
}

export default function CurrencyOverview({
  title,
  poolReserve,
  currencySymbol,
  type,
  showGraphCondition,
  dots,
  series,
  isCollapse,
  children,
}: CurrencyOverviewProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { marketRefPriceInUsd } = useStaticPoolDataContext();
  const { currentLangSlug } = useLanguageContext();

  // const { mode, setMode } = useReservesRateHistoryHelper({
  //   poolReserveId: poolReserve.id,
  // }); TODO: uncomment when filters are added to history graphs

  const overviewData = {
    utilizationRate: Number(poolReserve.utilizationRate),
    availableLiquidity: poolReserve.availableLiquidity,
    priceInUsd: valueToBigNumber(poolReserve.priceInMarketReferenceCurrency)
      .multipliedBy(marketRefPriceInUsd)
      .toNumber(),
    depositApy: Number(poolReserve.supplyAPY),
    avg30DaysLiquidityRate: Number(poolReserve.avg30DaysLiquidityRate) || 0,
    stableRate: Number(poolReserve.stableBorrowAPY),
    variableRate: Number(poolReserve.variableBorrowAPY),
    avg30DaysVariableRate: Number(poolReserve.avg30DaysVariableBorrowRate),
    usageAsCollateralEnabled: poolReserve.usageAsCollateralEnabled,
    stableBorrowRateEnabled: poolReserve.stableBorrowRateEnabled,
    baseLTVasCollateral: Number(poolReserve.baseLTVasCollateral),
    liquidationThreshold: Number(poolReserve.reserveLiquidationThreshold),
    liquidationBonus: Number(poolReserve.reserveLiquidationBonus),
    borrowingEnabled: poolReserve.borrowingEnabled,
  };

  const graphBorder = rgba(`${currentTheme.white.rgb}, 0.5`);

  const isDeposit = type === 'deposit';

  const LeftInformation = useCallback(() => {
    return (
      <>
        <Row
          className="CurrencyOverview__row"
          title={intl.formatMessage(messages.utilizationRate)}
          isColumn={isCollapse}
        >
          {overviewData.borrowingEnabled ? (
            <ValuePercent
              value={overviewData.utilizationRate ? overviewData.utilizationRate : '0'}
            />
          ) : (
            <span className="CurrencyOverview__noData">—</span>
          )}
        </Row>

        <Row
          className="CurrencyOverview__row"
          title={intl.formatMessage(messages.availableLiquidity)}
          isColumn={isCollapse}
        >
          <Value symbol={currencySymbol} value={overviewData.availableLiquidity} />
        </Row>

        {isDeposit ? (
          <>
            <Row
              className="CurrencyOverview__row"
              title={intl.formatMessage(messages.depositAPY)}
              subTitle={
                !!overviewData.avg30DaysLiquidityRate && !isCollapse
                  ? intl.formatMessage(messages.depositAPR)
                  : ''
              }
              isColumn={isCollapse}
            >
              <div className="CurrencyOverview__rowWithDoubleValue">
                {overviewData.borrowingEnabled ? (
                  <>
                    <ValuePercent value={overviewData.depositApy} />
                    {!!overviewData.avg30DaysLiquidityRate && !isCollapse && (
                      <ValuePercent
                        value={overviewData.avg30DaysLiquidityRate}
                        className="CurrencyOverview__thirtyDays"
                      />
                    )}
                  </>
                ) : (
                  <span className="CurrencyOverview__no-data">—</span>
                )}
              </div>
            </Row>

            <Row
              className="CurrencyOverview__row"
              title={intl.formatMessage(messages.canBeUsedAsCollateral)}
              isColumn={isCollapse}
            >
              <p
                className={classNames('CurrencyOverview__usageAsCollateral', {
                  CurrencyOverview__usageAsCollateralDisabled:
                    !overviewData.usageAsCollateralEnabled,
                })}
              >
                {intl.formatMessage(
                  overviewData.usageAsCollateralEnabled ? messages.yes : messages.no
                )}
              </p>
            </Row>
          </>
        ) : (
          <>
            {!isCollapse && (
              <Row
                className="CurrencyOverview__row"
                title={intl.formatMessage(messages.assetPrice)}
                isColumn={isCollapse}
              >
                <Value
                  tokenIcon={true}
                  symbol="USD"
                  value={overviewData.priceInUsd}
                  maximumValueDecimals={2}
                />
              </Row>
            )}
          </>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCollapse,
    overviewData.availableLiquidity,
    overviewData.avg30DaysLiquidityRate,
    overviewData.borrowingEnabled,
    overviewData.depositApy,
    overviewData.priceInUsd,
    overviewData.usageAsCollateralEnabled,
    overviewData.utilizationRate,
    currentLangSlug,
  ]);

  const RightInformation = useCallback(() => {
    return (
      <>
        {isDeposit ? (
          <>
            {!isCollapse && (
              <Row
                className="CurrencyOverview__row"
                title={intl.formatMessage(messages.assetPrice)}
                isColumn={isCollapse}
              >
                <Value
                  tokenIcon={true}
                  symbol="USD"
                  value={overviewData.priceInUsd}
                  maximumValueDecimals={2}
                />
              </Row>
            )}

            <Row
              className="CurrencyOverview__row"
              title={<MaxLTVHelpModal text={intl.formatMessage(messages.maximumLTV)} />}
              isColumn={isCollapse}
            >
              {overviewData.baseLTVasCollateral === 0 ? (
                <span className="CurrencyOverview__no-data">—</span>
              ) : (
                <ValuePercent value={overviewData.baseLTVasCollateral} />
              )}
            </Row>

            {!isCollapse && (
              <Row
                className="CurrencyOverview__row"
                title={
                  <LiquidationThresholdHelpModal
                    text={intl.formatMessage(messages.liquidationThreshold)}
                  />
                }
                isColumn={isCollapse}
              >
                {overviewData.liquidationThreshold <= 0 ? (
                  <span className="CurrencyOverview__no-data">—</span>
                ) : (
                  <ValuePercent value={overviewData.liquidationThreshold} />
                )}
              </Row>
            )}

            {!isCollapse && (
              <Row
                className="CurrencyOverview__row"
                title={
                  <LiquidationBonusHelpModal
                    text={intl.formatMessage(messages.liquidationPenalty)}
                  />
                }
                isColumn={isCollapse}
              >
                {overviewData.liquidationBonus <= 0 ? (
                  <span className="CurrencyOverview__no-data">—</span>
                ) : (
                  <ValuePercent value={overviewData.liquidationBonus} />
                )}
              </Row>
            )}
          </>
        ) : (
          <>
            <Row
              className="CurrencyOverview__row"
              title={intl.formatMessage(messages.stableAPY)}
              isColumn={isCollapse}
            >
              {overviewData.stableBorrowRateEnabled ? (
                <ValuePercent value={overviewData.stableRate} />
              ) : (
                <span className="CurrencyOverview__no-data">—</span>
              )}
            </Row>
            <Row
              className="CurrencyOverview__row"
              title={intl.formatMessage(messages.variableAPY)}
              isColumn={isCollapse}
            >
              <div className="CurrencyOverview__rowWithDoubleValue">
                <ValuePercent value={overviewData.variableRate} />
                {!!overviewData.avg30DaysVariableRate && !isCollapse && (
                  <ValuePercent
                    value={overviewData.avg30DaysVariableRate}
                    className="CurrencyOverview__thirtyDays"
                  />
                )}
              </div>
            </Row>
          </>
        )}

        {isCollapse && (
          <Row
            className="CurrencyOverview__row"
            title={intl.formatMessage(messages.assetPrice)}
            isColumn={isCollapse}
          >
            <Value
              tokenIcon={true}
              symbol="USD"
              value={overviewData.priceInUsd}
              maximumValueDecimals={2}
            />
          </Row>
        )}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCollapse,
    overviewData.priceInUsd,
    overviewData.baseLTVasCollateral,
    overviewData.liquidationThreshold,
    overviewData.liquidationBonus,
    overviewData.stableBorrowRateEnabled,
    overviewData.stableRate,
    overviewData.avg30DaysVariableRate,
    overviewData.variableRate,
    currentLangSlug,
  ]);

  return (
    <div
      className={classNames('CurrencyOverview', {
        CurrencyOverview__borrow: !isDeposit,
        CurrencyOverview__collapsed: isCollapse,
      })}
    >
      <div className="CurrencyOverview__content">
        <div className="CurrencyOverview__content-left">
          <div className="CurrencyOverview__inner">
            <LeftInformation />
          </div>

          <GradientLine size={1} direction="vertical" />

          <div className="CurrencyOverview__inner">
            <RightInformation />
          </div>

          <GradientLine size={1} direction="vertical" />

          <div className="CurrencyOverview__inner">{children}</div>
        </div>

        {/*<div className="CurrencyOverview__mobileFilterButtons">*/}
        {/*  <GraphFilterButtons setMode={setMode} mode={mode} />*/}
        {/*</div> TODO: uncomment when filters are added to history graphs */}

        {/*{!isCollapse && (*/}
        {/*  <div*/}
        {/*    className={classNames('CurrencyOverview__content-right', {*/}
        {/*      CurrencyOverview__contentNoBorder: !(*/}
        {/*        showGraphCondition && poolReserve.borrowingEnabled*/}
        {/*      ),*/}
        {/*    })}*/}
        {/*  >*/}
        {/*     todo:pavlik not sure what is this */}
        {/*    <GraphInner*/}
        {/*      showGraph={showGraphCondition && poolReserve.borrowingEnabled}*/}
        {/*      dots={dots}*/}
        {/*      seriesData={series}*/}
        {/*      type={type}*/}
        {/*      poolReserveId={poolReserve.id}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .CurrencyOverview {
          color: ${currentTheme.darkBlue.hex};

          .CurrencyOverview__caption {
            .GradientLine {
              @include respond-to(sm) {
                background: ${currentTheme.darkBlue.hex};
              }
            }
          }

          .ValuePercent.ValuePercent__darkOrange,
          .ValuePercent.ValuePercent__primary,
          .ValuePercent.ValuePercent__secondary {
            .ValuePercent__value.ValuePercent__value {
              span {
                color: ${currentTheme.darkBlue.hex};
              }
            }
          }

          &__usageAsCollateral {
          }
          &__usageAsCollateralDisabled {
          }

          &__content-right {
            border: 1px solid ${graphBorder};
            color: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
