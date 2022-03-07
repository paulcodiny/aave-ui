import React from 'react';
import { useIntl } from 'react-intl';
import { BigNumber } from '@aave/protocol-js';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import { getAtokenInfo } from '../../../../helpers/get-atoken-info';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import StakeTxConfirmationView from '../../../staking/components/StakeTxConfirmationView';

import stakeMessages from '../../../staking/screens/StakeWithApprovalConfirmation/messages';

interface StakeConfirmationProps {
  amount: BigNumber;
}

function StakeConfirmation({ amount }: StakeConfirmationProps) {
  debugger;
  const intl = useIntl();
  const { userId } = useStaticPoolDataContext();
  const { selectedStake, selectedStakeData, stakingService } = useStakeDataContext();
  // todo:pavlik selectedStake and selectedStakeData should be adjusted to RDNT

  const aTokenData = getAtokenInfo({
    address: stakingService.stakingContractAddress,
    symbol: selectedStake.toUpperCase(),
    decimals: 18,
    prefix: 'stk',
  });

  const handleGetTransactions = async () =>
    await stakingService.stake(userId as string, amount.toString());

  let blockingError = '';
  if (amount.gt(selectedStakeData.underlyingTokenUserBalance)) {
    blockingError = intl.formatMessage(stakeMessages.notEnoughBalance, {
      asset: selectedStake.toUpperCase(),
    });
  }

  return (
    <StakeTxConfirmationView
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(stakeMessages.stake, { asset: selectedStake.toUpperCase() })}
      boxDescription={intl.formatMessage(stakeMessages.boxDescription)}
      mainTxName={intl.formatMessage(stakeMessages.stake, { asset: selectedStake.toUpperCase() })}
      mainTxType="STAKE_ACTION"
      blockingError={blockingError}
      goToAfterSuccess="/manage-radiant"
      successButtonTitle={intl.formatMessage(stakeMessages.backToStaking)}
      buttonTitle={intl.formatMessage(stakeMessages.buttonTitle)}
      aTokenData={aTokenData}
    >
      <Row title={intl.formatMessage(stakeMessages.amount)}>
        <Value
          symbol={selectedStake.toUpperCase()}
          value={amount.toString()}
          tokenIcon={true}
          tooltipId={selectedStake.toUpperCase()}
        />
      </Row>
    </StakeTxConfirmationView>
  );
}

export default StakeConfirmation;
