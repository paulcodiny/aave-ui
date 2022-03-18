import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';
import { PERMISSION } from '@aave/contract-helpers';
import { valueToBigNumber } from '@aave/protocol-js';

import rdntConfig from '../../../../ui-config/rdnt';
import { Stake } from '../../../../libs/aave-protocol-js';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
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
import { ethers } from 'ethers';
import GeistToken from '../../../../libs/aave-protocol-js/GeistToken.json';

interface ContentItemLockProps
  extends Pick<
    ValidationWrapperComponentProps,
    'userReserve' | 'poolReserve' | 'user' | 'currencySymbol' | 'walletBalance' | 'walletBalanceUSD'
  > {}

export function ManageRadiantMain({
  currencySymbol,
  poolReserve,
  userReserve,
  user,
  walletBalance,
  walletBalanceUSD,
}: ContentItemLockProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { data, cooldownStep, setCooldownStep, usdPriceEth, selectedStake } = useStakeDataContext();
  const [contract, setContract] = useState(rdntConfig.multiFeeDistribution);
  useEffect(() => {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // @ts-ignore
    window.$contract = new ethers.Contract(contract, GeistToken.abi, signer);
  }, [contract]);

  const [currentAsset, setCurrentAsset] = useState<Stake>(Stake.rdnt);

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(depositConfirmationMessages.connectWallet)}
        description={intl.formatMessage(depositConfirmationMessages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  const currencyName = selectedStake.toUpperCase();
  const selectedStakeData = data[currentAsset];

  const rewardTokenPriceInUsd = valueToBigNumber(selectedStakeData.rewardTokenPriceEth).dividedBy(
    usdPriceEth
  );

  const stakeCooldownDays = selectedStakeData.stakeCooldownSeconds / 60 / 60 / 24;

  const userEarningsPerDay = valueToBigNumber(selectedStakeData.userEarningsPerDay);
  const userEarningsPerMonth = userEarningsPerDay.multipliedBy(30).toString();
  const userEarningsPerMonthInUSD = rewardTokenPriceInUsd
    .multipliedBy(userEarningsPerMonth)
    .toString();

  const handleSubmit = () => {};
  const handleMaxButtonClick = () => {};
  const error = '';

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
                <TopStats title={intl.formatMessage(messages.lockedStakedGeist)} value="$432">
                  <p>
                    Locked: 2 RADIANT <br />
                    Staked: 4 RADIANT
                  </p>
                </TopStats>
              </div>

              <GradientLine size={1} direction="vertical" />

              <div className="ManageRadiantMain__revenue-item">
                <TopStats title={intl.formatMessage(messages.dailyRevenue)} value="$0,43" />
              </div>

              <GradientLine size={1} direction="vertical" />

              <div className="ManageRadiantMain__revenue-item">
                <TopStats title={intl.formatMessage(messages.weeklyRevenue)} value="$3,01">
                  <p>
                    Month: $ 90.3 <br />
                    Year: $ 1 083
                  </p>
                </TopStats>
              </div>
            </ContentWrapperWithTopLine>

            <ContentWrapperWithTopLine title="&nbsp;" className="ManageRadiantMain__top-fee">
              <div className="ManageRadiantMain__fee-item">
                <TopStats title={intl.formatMessage(messages.dailyPlatformFees)} value="$0,2" />
              </div>

              <GradientLine size={1} direction="vertical" />

              <div className="ManageRadiantMain__fee-item">
                <TopStats title={intl.formatMessage(messages.dailyPenaltyFees)} value="$0,1" />
              </div>
            </ContentWrapperWithTopLine>
          </div>

          <div className="ManageRadiant__content">
            <div className="ManageRadiant__left-column">
              <ContentItemStake
                maxAmount={walletBalance.toString(10)}
                currencySymbol={currencySymbol}
                onSubmit={handleSubmit}
                walletBalance={walletBalance}
                walletBalanceUSD={walletBalanceUSD}
                poolReserve={poolReserve}
                userReserve={userReserve}
                user={user}
              />

              <ContentItemLock
                maxAmount={walletBalance.toString(10)}
                currencySymbol={currencySymbol}
                onSubmit={handleSubmit}
                walletBalance={walletBalance}
                walletBalanceUSD={walletBalanceUSD}
                poolReserve={poolReserve}
                userReserve={userReserve}
                user={user}
              />

              <ContentItemHelp />
            </div>

            <div className="ManageRadiant__right-column">
              <div className="ManageRadiant__content-item">
                <MainStats />
              </div>

              <div className="ManageRadiant__content-item">
                <Table title="Stake RADIANT" />
              </div>

              <div className="ManageRadiant__content-item">
                <Table title="RADIANT vents" />
              </div>

              <div className="ManageRadiant__content-item">
                <Row
                  title={intl.formatMessage(messages.incentivesPerMonth)}
                  className="StakingWrapper__row"
                >
                  <Value
                    value={userEarningsPerMonth}
                    symbol="RDNT"
                    withoutSymbol={true}
                    subSymbol="USD"
                    subValue={userEarningsPerMonthInUSD !== '0' ? userEarningsPerMonthInUSD : '0'}
                  />
                </Row>

                <GradientLine size={2} />

                <Row
                  title={intl.formatMessage(messages.cooldownPeriod)}
                  className="StakingWrapper__row"
                >
                  <strong className="StakingWrapper__cooldownPeriodTime">
                    {intl.formatNumber(
                      stakeCooldownDays < 1
                        ? selectedStakeData.stakeCooldownSeconds
                        : stakeCooldownDays
                    )}{' '}
                    <span>
                      {intl.formatMessage(stakeCooldownDays < 1 ? messages.seconds : messages.days)}
                    </span>
                  </strong>
                </Row>

                <GradientLine size={2} />

                <Row
                  title={intl.formatMessage(messages.stakingAPY)}
                  className="StakingWrapper__row"
                >
                  <ValuePercent value={+selectedStakeData.stakeApy} />
                </Row>

                <GradientLine size={2} />

                <Row
                  title={intl.formatMessage(messages.currentMaxSlashing)}
                  className="StakingWrapper__row"
                >
                  <ValuePercent value={0.3} color="red" percentColor={currentTheme.red.hex} />
                </Row>

                <Row
                  title={intl.formatMessage(messages.currentMaxSlashing)}
                  className="StakingWrapper__row"
                >
                  <select onChange={(e) => setContract(e.target.value)}>
                    {[
                      'walletBalanceProvider',
                      'uiPoolDataProvider',
                      'multiFeeDistribution',
                      'lendingPoolAddressProvider',
                      'lendingPool',
                      'wethGateway',
                    ].map((contractName) => (
                      /* @ts-ignore */
                      <option value={rdntConfig[contractName]}>{contractName}</option>
                    ))}
                  </select>
                </Row>
              </div>
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

export default routeParamValidationHOC({ withWalletBalance: true })(ManageRadiantMain);
