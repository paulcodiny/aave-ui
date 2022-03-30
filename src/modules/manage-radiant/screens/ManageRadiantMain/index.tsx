import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { BigNumberish } from 'ethers';
import { useThemeContext } from '@aave/aave-ui-kit';
import { PERMISSION } from '@aave/contract-helpers';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';

import rdntConfig from '../../../../ui-config/rdnt';
import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';
import { getProvider } from '../../../../helpers/config/markets-and-network-config';
import { Stake } from '../../../../libs/aave-protocol-js';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import { MultiFeeDistributionService } from '../../../../libs/aave-protocol-js/MulteFeeDistribution/MultiFeeDistributionContract';
import { GeistTokenContract } from '../../../../libs/aave-protocol-js/GeistToken/GeistTokenContract';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';

import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import NoDataPanel from '../../../../components/NoDataPanel';
import ContentWrapperWithTopLine from '../../../../components/wrappers/ContentWrapperWithTopLine';
import GradientLine from '../../../../components/basic/GradientLine';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import ValuePercent from '../../../../components/basic/ValuePercent';
import ContentItemLock from '../../components/ContentItemLock';
import { ContentItemStake } from '../../components/ContentItemStake';
import { ContentItemHelp } from '../../components/ContentItemHelp';
import { TopStats } from '../../components/TopStats';
import { Table } from '../../components/Table';
import { MainStats } from '../../components/MainStats';

import depositConfirmationMessages from '../../../deposit/screens/DepositConfirmation/messages';
import messages from './messages';
import staticStyles from './style';

export function ManageRadiantMain() {
  const intl = useIntl();
  const { chainId } = useProtocolDataContext();
  const { currentTheme } = useThemeContext();
  const { data, cooldownStep, setCooldownStep, usdPriceEth, selectedStake } = useStakeDataContext();
  const { user } = useDynamicPoolDataContext();

  const [tokenInfo, setTokenInfo] = useState<{
    walletBalance: BigNumber;
    currencySymbol: string;
    totalSupply: BigNumber;
  }>({
    walletBalance: valueToBigNumber(0),
    currencySymbol: 'RDNT',
    totalSupply: valueToBigNumber(0),
  });
  const [locked, setLocked] = useState<BigNumber>(valueToBigNumber(0));
  const [total, setTotal] = useState<BigNumber>(valueToBigNumber(0));
  const [earned, setEarned] = useState<BigNumber>(valueToBigNumber(0));
  const [lockedTable, setLockedTable] = useState<{ amount: string; expiryDate: Date }[]>([]);
  const [earnedTable, setEarnedTable] = useState<{ amount: string; expiryDate: Date }[]>([]);
  const [currentAsset, setCurrentAsset] = useState<Stake>(Stake.rdnt);

  // todo: pavlik
  const priceInMarketReferenceCurrency = 0;

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(depositConfirmationMessages.connectWallet)}
        description={intl.formatMessage(depositConfirmationMessages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  useEffect(() => {
    (async () => {
      const contract = new GeistTokenContract(getProvider(chainId));
      const rdntInfo = await contract.getInfo(user.id);
      console.log(rdntInfo);
      setTokenInfo(rdntInfo);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // todo: pavlik extract this to a separate context
      const multiFeeDistributionService = new MultiFeeDistributionService(getProvider(chainId));

      try {
        const [totalBalance, unlocked, earned] = await multiFeeDistributionService.getBalances(
          user.id
        );
        setTotal(totalBalance);
        setLocked(totalBalance.minus(unlocked));
        setEarned(earned);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // todo: pavlik extract this to a separate context
      const multiFeeDistributionService = new MultiFeeDistributionService(getProvider(chainId));

      try {
        const lockedTable = await multiFeeDistributionService.getLockedBalances(user.id);
        setLockedTable(lockedTable);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // todo: pavlik extract this to a separate context
      const multiFeeDistributionService = new MultiFeeDistributionService(getProvider(chainId));

      try {
        const earnedTable = await multiFeeDistributionService.getEarnedBalances(user.id);
        setEarnedTable(earnedTable);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // const selectedStakeData = data[currentAsset];
  //
  // const rewardTokenPriceInUsd = valueToBigNumber(selectedStakeData.rewardTokenPriceEth).dividedBy(
  //   usdPriceEth
  // );
  //
  // const stakeCooldownDays = selectedStakeData.stakeCooldownSeconds / 60 / 60 / 24;
  //
  // const userEarningsPerDay = valueToBigNumber(selectedStakeData.userEarningsPerDay);
  // const userEarningsPerMonth = userEarningsPerDay.multipliedBy(30).toString();
  // const userEarningsPerMonthInUSD = rewardTokenPriceInUsd
  //   .multipliedBy(userEarningsPerMonth)
  //   .toString();

  return (
    <>
      <PermissionWarning requiredPermission={PERMISSION.BORROWER}>
        <ScreenWrapper
          pageTitle={intl.formatMessage(messages.title)}
          isTitleOnDesktop={true}
          withMobileGrayBg={true}
        >
          {intl.formatMessage(messages.subTitle)}

          <div className="ManageRadiantMain__top">
            <ContentWrapperWithTopLine
              title={intl.formatMessage(messages.walletDashboard)}
              className="ManageRadiantMain__top-revenue"
            >
              <div className="ManageRadiantMain__revenue-item">
                <TopStats
                  title={intl.formatMessage(messages.lockedStakedGeist)}
                  value={total.toString()}
                >
                  <p>
                    Locked: {locked.toString()} RDNT <br />
                    Staked: {total.minus(locked).toString()} RDNT
                  </p>
                </TopStats>
              </div>

              <GradientLine size={1} direction="vertical" />

              <div className="ManageRadiantMain__revenue-item">
                <TopStats title={intl.formatMessage(messages.dailyRevenue)} value="$X,XX" />
              </div>

              <GradientLine size={1} direction="vertical" />

              <div className="ManageRadiantMain__revenue-item">
                <TopStats title={intl.formatMessage(messages.weeklyRevenue)} value="$X,XX">
                  <p>
                    Month: $ XX.X <br />
                    Year: $ X XXX
                  </p>
                </TopStats>
              </div>
            </ContentWrapperWithTopLine>

            <ContentWrapperWithTopLine title="&nbsp;" className="ManageRadiantMain__top-fee">
              <div className="ManageRadiantMain__fee-item">
                <TopStats title={intl.formatMessage(messages.dailyPlatformFees)} value="$X,X" />
              </div>

              <GradientLine size={1} direction="vertical" />

              <div className="ManageRadiantMain__fee-item">
                <TopStats title={intl.formatMessage(messages.dailyPenaltyFees)} value="$X,X" />
              </div>
            </ContentWrapperWithTopLine>
          </div>

          <div className="ManageRadiant__content">
            <div className="ManageRadiant__left-column">
              <ContentItemStake
                maxAmount={tokenInfo.walletBalance.toString()}
                currencySymbol={tokenInfo.currencySymbol}
                walletBalance={tokenInfo.walletBalance}
                priceInMarketReferenceCurrency={priceInMarketReferenceCurrency.toString(10)}
              />

              <ContentItemLock
                maxAmount={tokenInfo.walletBalance.toString()}
                currencySymbol={tokenInfo.currencySymbol}
                walletBalance={tokenInfo.walletBalance}
                priceInMarketReferenceCurrency={priceInMarketReferenceCurrency.toString(10)}
              />

              <ContentItemHelp />
            </div>

            <div className="ManageRadiant__right-column">
              <div className="ManageRadiant__content-item">
                <MainStats earned={earned.toString()} staked={total.minus(locked).toString()} />
              </div>

              <div className="ManageRadiant__content-item">
                <Table title="RDNT vests" value={earned.toString()} table={earnedTable} />
              </div>

              <div className="ManageRadiant__content-item">
                <Table
                  title="RDNT locks"
                  action="Locked"
                  value={locked.toString()}
                  table={lockedTable}
                />
              </div>

              {/*<div className="ManageRadiant__content-item">*/}
              {/*  <Row*/}
              {/*    title={intl.formatMessage(messages.incentivesPerMonth)}*/}
              {/*    className="StakingWrapper__row"*/}
              {/*  >*/}
              {/*    <Value*/}
              {/*      value={userEarningsPerMonth}*/}
              {/*      symbol="RDNT"*/}
              {/*      withoutSymbol={true}*/}
              {/*      subSymbol="USD"*/}
              {/*      subValue={userEarningsPerMonthInUSD !== '0' ? userEarningsPerMonthInUSD : '0'}*/}
              {/*    />*/}
              {/*  </Row>*/}

              {/*  <GradientLine size={2} />*/}

              {/*  <Row*/}
              {/*    title={intl.formatMessage(messages.cooldownPeriod)}*/}
              {/*    className="StakingWrapper__row"*/}
              {/*  >*/}
              {/*    <strong className="StakingWrapper__cooldownPeriodTime">*/}
              {/*      {intl.formatNumber(*/}
              {/*        stakeCooldownDays < 1*/}
              {/*          ? selectedStakeData.stakeCooldownSeconds*/}
              {/*          : stakeCooldownDays*/}
              {/*      )}{' '}*/}
              {/*      <span>*/}
              {/*        {intl.formatMessage(stakeCooldownDays < 1 ? messages.seconds : messages.days)}*/}
              {/*      </span>*/}
              {/*    </strong>*/}
              {/*  </Row>*/}

              {/*  <GradientLine size={2} />*/}

              {/*  <Row*/}
              {/*    title={intl.formatMessage(messages.stakingAPY)}*/}
              {/*    className="StakingWrapper__row"*/}
              {/*  >*/}
              {/*    <ValuePercent value={+selectedStakeData.stakeApy} />*/}
              {/*  </Row>*/}

              {/*  <GradientLine size={2} />*/}

              {/*  <Row*/}
              {/*    title={intl.formatMessage(messages.currentMaxSlashing)}*/}
              {/*    className="StakingWrapper__row"*/}
              {/*  >*/}
              {/*    <ValuePercent value={0.3} color="red" percentColor={currentTheme.red.hex} />*/}
              {/*  </Row>*/}
              {/*</div>*/}
            </div>
          </div>
        </ScreenWrapper>
      </PermissionWarning>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}

export default ManageRadiantMain;
