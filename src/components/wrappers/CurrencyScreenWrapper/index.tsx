import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { useThemeContext } from '@aave/aave-ui-kit';
import ScreenWrapper from '../ScreenWrapper';
import ContentWrapper from '../ContentWrapper';
import TopInfoPanel from './TopInfoPanel';
import CurrencyOverview from './CurrencyOverview';

import staticStyles from './style';

import { ValidationWrapperComponentProps } from '../../RouteParamsValidationWrapper';
import { GraphLegendDot } from '../../graphs/GraphLegend';
import { InterestRateSeries } from '../../graphs/types';

import messages from './messages';
import { getAssetInfo, TokenIcon } from '../../../helpers/config/assets-config';
import ContentWrapperWithTopLine from '../ContentWrapperWithTopLine';

interface CurrencyScreenWrapperProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol'
  > {
  title: string;
  isCollapseLocalStorageName: string;
  walletBalance?: string;
  type: 'deposit' | 'borrow';
  showGraphCondition: boolean;
  dots?: GraphLegendDot[];
  series: InterestRateSeries[];
  goBack?: () => void;
  children: ReactNode;
}

export default function CurrencyScreenWrapper({
  title,
  currencySymbol,
  poolReserve,
  user,
  userReserve,
  walletBalance,
  isCollapseLocalStorageName,
  type,
  showGraphCondition,
  dots,
  series,
  goBack,
  children,
}: CurrencyScreenWrapperProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const isCollapse = false;
  const asset = getAssetInfo(currencySymbol);

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(type === 'deposit' ? messages.deposit : messages.borrow)}
      className="CurrencyScreenWrapper"
      isTitleOnDesktop
      titleComponent={
        <div className="CurrencyScreenWrapper__token-title">
          <TokenIcon tokenSymbol={currencySymbol} height={20} width={20} />
          <p>{intl.formatMessage(messages.caption, { symbol: asset && asset.name })}</p>
        </div>
      }
    >
      {/*{title && <p className="CurrencyOverview__caption-title">{title}</p>}*/}
      {/*<div className="CurrencyOverview__caption">*/}
      {/*  <div className="CurrencyOverview__captionLink">*/}
      {/*    <TokenIcon tokenSymbol={currencySymbol} height={20} width={20} />*/}
      {/*    <p>{intl.formatMessage(messages.caption, { symbol: asset && asset.name })}</p>*/}
      {/*  </div>*/}
      {/*  {title && <p className="CurrencyOverview__caption-title">{title}</p>}*/}
      {/*</div>*/}

      <ContentWrapperWithTopLine title={title}>
        <CurrencyOverview
          title={title}
          poolReserve={poolReserve}
          currencySymbol={currencySymbol}
          type={type}
          showGraphCondition={showGraphCondition}
          dots={dots}
          series={series}
          isCollapse={isCollapse}
        >
          <TopInfoPanel
            poolReserve={poolReserve}
            currencySymbol={currencySymbol}
            walletBalance={walletBalance}
            userReserve={userReserve}
            user={user}
            type={type}
          />
        </CurrencyOverview>
      </ContentWrapperWithTopLine>

      <div className="CurrencyScreenWrapper__mobileInner">
        <TopInfoPanel
          poolReserve={poolReserve}
          currencySymbol={currencySymbol}
          walletBalance={walletBalance}
          userReserve={userReserve}
          user={user}
          type={type}
        />
      </div>

      <ContentWrapper
        className="CurrencyScreenWrapper__content"
        withBackButton={true}
        goBack={goBack}
      >
        {children}
      </ContentWrapper>

      <div className="CurrencyScreenWrapper__mobileInner">
        <CurrencyOverview
          poolReserve={poolReserve}
          currencySymbol={currencySymbol}
          type={type}
          showGraphCondition={showGraphCondition}
          dots={dots}
          series={series}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .CurrencyScreenWrapper {
          &__mobileInner {
            background: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </ScreenWrapper>
  );
}
