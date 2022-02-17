import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber, BigNumber } from '@aave/protocol-js';

import { useThemeContext } from '@aave/aave-ui-kit';
import { useDynamicPoolDataContext } from '../../libs/pool-data-provider';
import Row from '../basic/Row';
import Value from '../basic/Value';
import MaxLTVHelpModal from '../HelpModal/MaxLTVHelpModal';
import ValuePercent from '../basic/ValuePercent';
import HealthFactor from '../HealthFactor';
import DefaultButton from '../basic/DefaultButton';
import NoData from '../basic/NoData';
import CircleCompositionBar, {
  CircleCompositionBarItem,
} from '../compositionBars/CircleCompositionBar';
import CircleCollateralCompositionBar from '../compositionBars/CircleCollateralCompositionBar';
import LTVInfoModal from '../LTVInfoModal';
import ApproximateBalanceHelpModal from '../HelpModal/ApproximateBalanceHelpModal';

import messages from './messages';
import staticStyles from './style';
import { getAssetInfo, getAssetColor } from '../../helpers/config/assets-config';
import ContentWrapperWithTopLine from '../wrappers/ContentWrapperWithTopLine';

export default function DepositBorrowTopPanel() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { user, reserves } = useDynamicPoolDataContext();

  const [isCollapse, setIsCollapse] = useState(
    localStorage.getItem('borrowDepositTopPanelIsCollapse') === 'true'
  );
  const [isLTVModalVisible, setLTVModalVisible] = useState(false);

  const maxBorrowAmount = valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0').plus(
    user?.availableBorrowsMarketReferenceCurrency || '0'
  );
  const collateralUsagePercent = maxBorrowAmount.eq(0)
    ? '1'
    : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
        .div(maxBorrowAmount)
        .toFixed();

  const loanToValue =
    user?.totalCollateralMarketReferenceCurrency === '0'
      ? '0'
      : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
          .dividedBy(user?.totalCollateralMarketReferenceCurrency || '1')
          .toFixed();

  const depositCompositionData: CircleCompositionBarItem[] = [];
  const borrowCompositionData: CircleCompositionBarItem[] = [];

  user?.userReservesData.forEach((userReserve) => {
    const poolReserve = reserves.find((res) => res.symbol === userReserve.reserve.symbol);

    if (!poolReserve) {
      throw new Error('data is inconsistent pool reserve is not available');
    }
    if (userReserve.underlyingBalance !== '0' || userReserve.totalBorrows !== '0') {
      if (userReserve.underlyingBalance !== '0') {
        depositCompositionData.push({
          label: `${getAssetInfo(userReserve.reserve.symbol).formattedName}  ${intl.formatNumber(
            valueToBigNumber(userReserve.underlyingBalanceMarketReferenceCurrency)
              .dividedBy(user?.totalLiquidityMarketReferenceCurrency)
              .multipliedBy(100)
              .toNumber(),
            { maximumFractionDigits: 2 }
          )}%`,
          value: Number(userReserve.underlyingBalanceMarketReferenceCurrency),
          color: getAssetColor(userReserve.reserve.symbol),
        });
      }
      if (userReserve.totalBorrows !== '0') {
        borrowCompositionData.push({
          label: `${getAssetInfo(userReserve.reserve.symbol).formattedName}  ${intl.formatNumber(
            valueToBigNumber(userReserve.totalBorrowsMarketReferenceCurrency)
              .dividedBy(maxBorrowAmount)
              .multipliedBy(100)
              .toNumber(),
            { maximumFractionDigits: 2 }
          )}%`,
          value: Number(userReserve.totalBorrowsMarketReferenceCurrency),
          color: getAssetColor(userReserve.reserve.symbol),
        });

        const availableBorrowPower = borrowCompositionData
          .reduce((acc, slice) => acc.minus(slice.value), maxBorrowAmount)
          .toNumber();
        const usedBorrowPower = borrowCompositionData
          .reduce((acc, slice) => acc.plus(slice.value), new BigNumber(0))
          .toNumber();

        borrowCompositionData.push({
          value: availableBorrowPower,
          label: `${intl.formatMessage(messages.borrowingPowerAvailable)}: ${intl.formatNumber(
            new BigNumber(1)
              .minus(valueToBigNumber(usedBorrowPower).dividedBy(maxBorrowAmount))
              .multipliedBy(100)
              .toNumber(),
            {
              maximumFractionDigits: 2,
            }
          )}%`,
          color: currentTheme.darkBlue.hex,
        });
      }
    }
  });

  // todo:pavlik no user case

  return (
    <div className="DepositBorrowTopPanel">
      <div className="DepositBorrowTopPanel__top-info">
        <ContentWrapperWithTopLine
          className="DepositBorrowTopPanel__left-info"
          title={intl.formatMessage(
            !depositCompositionData.length ? messages.noDeposits : messages.depositInformation
          )}
        >
          <div
            className={classNames(
              'DepositBorrowTopPanel__topPanel-inner',
              'DepositBorrowTopPanel__deposit-top-panel',
              {
                DepositBorrowTopPanel__topPanelInnerFull: !depositCompositionData.length,
              }
            )}
          >
            <div className="DepositBorrowTopPanel__topPanel-values">
              <Row
                title={
                  <ApproximateBalanceHelpModal
                    text={intl.formatMessage(messages.approximateBalance)}
                    lightWeight={true}
                  />
                }
                weight="light"
                isColumn={true}
              >
                {user && user.totalLiquidityUSD !== '0' ? (
                  <Value
                    value={user.totalLiquidityUSD}
                    symbol="USD"
                    tokenIcon={true}
                    withSmallDecimals={true}
                  />
                ) : (
                  <NoData color="dark" onWhiteBackground={true} />
                )}
              </Row>
            </div>

            {!isCollapse && !!depositCompositionData.length && (
              <div className="DepositBorrowTopPanel__topPanel-bars">
                <CircleCompositionBar
                  title={intl.formatMessage(messages.depositComposition)}
                  totalValue={Number(user?.totalLiquidityMarketReferenceCurrency || 0)}
                  data={depositCompositionData}
                />
              </div>
            )}
          </div>
        </ContentWrapperWithTopLine>

        <ContentWrapperWithTopLine
          title={intl.formatMessage(messages.borrowInformation)}
          className="DepositBorrowTopPanel__right-info"
        >
          {!!depositCompositionData.length && (
            <div className="DepositBorrowTopPanel__topPanel-inner">
              <div
                className={classNames('DepositBorrowTopPanel__topPanel-values', {
                  DepositBorrowTopPanel__topPanelValuesCollapse: isCollapse,
                })}
              >
                <div
                  className={classNames('DepositBorrowTopPanel__topPanel-valuesInner', {
                    DepositBorrowTopPanel__topPanelValuesInnerCollapse: isCollapse,
                  })}
                >
                  <Row
                    title={intl.formatMessage(messages.youBorrowed)}
                    weight="light"
                    isColumn={true}
                  >
                    {user && user.totalBorrowsUSD !== '0' ? (
                      <Value
                        value={user.totalBorrowsUSD}
                        symbol="USD"
                        tokenIcon={true}
                        minimumValueDecimals={2}
                        maximumValueDecimals={2}
                      />
                    ) : (
                      <NoData color="dark" onWhiteBackground={true} />
                    )}
                  </Row>

                  {isCollapse && (
                    <Row
                      title={intl.formatMessage(messages.yourCollateral)}
                      weight="light"
                      isColumn={true}
                    >
                      {user && user.totalCollateralUSD !== '0' ? (
                        <Value
                          value={user.totalCollateralUSD}
                          symbol="USD"
                          tokenIcon={true}
                          minimumValueDecimals={2}
                          maximumValueDecimals={2}
                        />
                      ) : (
                        <NoData color="dark" onWhiteBackground={true} />
                      )}
                    </Row>
                  )}

                  <HealthFactor
                    titleColor="dark"
                    onWhiteBackground={true}
                    value={user?.healthFactor || '-1'}
                    isColumn={true}
                    titleLightWeight={true}
                    withHALLink={true}
                  />
                </div>

                <div
                  className={classNames('DepositBorrowTopPanel__topPanel-valuesInner', {
                    DepositBorrowTopPanel__topPanelValuesInnerCollapse: isCollapse,
                  })}
                >
                  {!isCollapse && (
                    <Row
                      title={intl.formatMessage(messages.yourCollateral)}
                      weight="light"
                      isColumn={true}
                    >
                      {user && user.totalCollateralUSD !== '0' ? (
                        <Value
                          value={user.totalCollateralUSD}
                          symbol="USD"
                          tokenIcon={true}
                          minimumValueDecimals={2}
                          maximumValueDecimals={2}
                        />
                      ) : (
                        <NoData color="dark" onWhiteBackground={true} />
                      )}
                    </Row>
                  )}

                  {!isCollapse && (
                    <Row
                      title={intl.formatMessage(messages.borrowingPowerUsed)}
                      weight="light"
                      isColumn={true}
                    >
                      {user && collateralUsagePercent !== '0' ? (
                        <ValuePercent value={collateralUsagePercent} />
                      ) : (
                        <NoData color="dark" onWhiteBackground={true} />
                      )}
                    </Row>
                  )}
                </div>

                <div
                  className={classNames('DepositBorrowTopPanel__topPanel-valuesInner', {
                    DepositBorrowTopPanel__topPanelValuesInnerCollapse: isCollapse,
                  })}
                >
                  {!isCollapse && (
                    <Row
                      title={
                        <MaxLTVHelpModal
                          text={intl.formatMessage(messages.currentLTV)}
                          lightWeight={true}
                        />
                      }
                      weight="light"
                      isColumn={true}
                    >
                      {user && loanToValue !== '0' ? (
                        <ValuePercent value={loanToValue} />
                      ) : (
                        <NoData color="dark" onWhiteBackground={true} />
                      )}
                    </Row>
                  )}

                  {loanToValue !== '0' && (
                    <DefaultButton
                      color="dark"
                      title={intl.formatMessage(messages.details)}
                      transparent={true}
                      className={classNames('DepositBorrowTopPanel__button', {
                        DepositBorrowTopPanel__buttonCollapse: isCollapse,
                      })}
                      size="normal"
                      onClick={() => setLTVModalVisible(true)}
                    />
                  )}
                </div>
              </div>

              {!isCollapse && (
                <div className="DepositBorrowTopPanel__topPanel-bars">
                  {!!borrowCompositionData.length && (
                    <CircleCompositionBar
                      title={intl.formatMessage(messages.borrowComposition)}
                      totalValue={Number(maxBorrowAmount || 0)}
                      data={borrowCompositionData}
                    />
                  )}

                  {+collateralUsagePercent !== 1 && <CircleCollateralCompositionBar />}
                </div>
              )}
            </div>
          )}
        </ContentWrapperWithTopLine>
      </div>

      {loanToValue !== '0' && (
        <LTVInfoModal visible={isLTVModalVisible} setVisible={setLTVModalVisible} />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DepositBorrowTopPanel {
          &__topPanel-caption {
            p {
            }
          }

          &__topPanel-inner {
          }

          &__topPanel-captionWrapper {
          }
        }
      `}</style>
    </div>
  );
}
