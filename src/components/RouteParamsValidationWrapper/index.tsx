import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import { useIntl } from 'react-intl';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';

import {
  ComputedReserveData,
  useDynamicPoolDataContext,
  UserSummary,
  useStaticPoolDataContext,
} from '../../libs/pool-data-provider';
import { CurrencyRouteParamsInterface } from '../../helpers/router-types';
import Preloader from '../basic/Preloader';
import ErrorPage from '../ErrorPage';

import messages from './messages';
import { useWalletBalanceProviderContext } from '../../libs/wallet-balance-provider/WalletBalanceProvider';
import { ComputedUserReserve } from '@aave/math-utils';

export interface ValidationWrapperComponentProps
  extends Pick<RouteComponentProps, 'history' | 'location'> {
  currencySymbol: string;
  amount?: BigNumber;
  walletBalance: BigNumber;
  walletBalanceUSD: BigNumber;
  isWalletBalanceEnough: boolean;
  user?: UserSummary;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
}

interface RouteParamValidationWrapperProps {
  withUserReserve?: boolean;
  withWalletBalance?: boolean;
  withAmount?: boolean;
  allowLimitAmount?: boolean; // -1 for sending everything
}

export default function routeParamValidationHOC({
  withUserReserve,
  withWalletBalance,
  withAmount,
  allowLimitAmount,
}: RouteParamValidationWrapperProps) {
  return (ChildComponent: React.ComponentType<ValidationWrapperComponentProps>) =>
    ({ match, location, history }: RouteComponentProps<CurrencyRouteParamsInterface>) => {
      const intl = useIntl();

      // todo:pavlik:staking default asset RDNT
      // const ARBITRUM_AAVE = '0x2e2994cf25a177bd8c9c8dd36b1dd3f331806a57';
      // const ARBITRUM_RDNT = '0xe24054e9eB120c5C8d812378f41C6EB0b942A3e5';
      // const ARBITRUM_RINKEBY_DAI = '0xac18c05990171fc83a67fe4282665cd38ed050c7';
      const ARBITRUM_ETH = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
      // const GEIST_TOKEN = '0x69d6CB6c9c447A9a7c88b71D9C1b078Fba1432f3';
      // const KOVAN_DAI = '0x001b3b4d0f3714ca98ba10f6042daebf0b1b7b6f';
      const underlyingAsset = (
        match.params.underlyingAsset ||
        localStorage.getItem('stakeToken') ||
        ARBITRUM_ETH
      ).toUpperCase();
      const reserveId = match.params.id;

      const { marketRefPriceInUsd } = useStaticPoolDataContext();
      const { reserves, user } = useDynamicPoolDataContext();

      const poolReserve = reserves.find((res) =>
        reserveId
          ? res.id === reserveId
          : res.underlyingAsset.toLowerCase() === underlyingAsset.toLowerCase()
      );
      const userReserve = user
        ? user.userReservesData.find((userReserve) =>
            reserveId
              ? userReserve.reserve.id === reserveId
              : userReserve.reserve.underlyingAsset.toLowerCase() === underlyingAsset.toLowerCase()
          )
        : undefined;

      const currencySymbol = poolReserve?.symbol || '';

      const { walletData } = useWalletBalanceProviderContext({
        skip: !withWalletBalance || !poolReserve || (withUserReserve && !userReserve),
      });
      if (!walletData || !reserves.length) {
        return <Preloader withText={true} />;
      }

      if (!poolReserve) {
        // TODO: 404
        return <Redirect to="/" />;
      }
      if (!userReserve && withUserReserve) {
        return <Redirect to="/" />;
        // TODO: 404 || redirect || ?
      }

      const walletBalance = valueToBigNumber(
        walletData[poolReserve.underlyingAsset] || '0'
      ).dividedBy(valueToBigNumber(10).pow(poolReserve.decimals));
      let isWalletBalanceEnough = true;

      let amount = undefined;
      if (withAmount) {
        const query = queryString.parse(location.search);
        if (typeof query.amount === 'string') {
          amount = valueToBigNumber(query.amount);
        }
        if (
          !amount ||
          amount.isNaN() ||
          !((allowLimitAmount && amount.eq('-1')) || amount.isPositive())
        ) {
          // TODO: amount invalid
          return <ErrorPage description={intl.formatMessage(messages.error)} buttonType="back" />;
        }
        if (
          withWalletBalance &&
          (walletBalance.eq(0) || (!amount.eq('-1') && amount.gt(walletBalance)))
        ) {
          // TODO: wallet balance is too low
          isWalletBalanceEnough = false;
        }
      }

      const walletBalanceUSD = valueToBigNumber(walletBalance)
        .multipliedBy(poolReserve.priceInMarketReferenceCurrency)
        .multipliedBy(marketRefPriceInUsd);

      const props = {
        poolReserve,
        userReserve,
        amount,
        user,
        walletBalance,
        walletBalanceUSD,
        isWalletBalanceEnough,
        currencySymbol,
        underlyingAsset,
        history,
        location,
      };
      return <ChildComponent {...props} />;
    };
}
