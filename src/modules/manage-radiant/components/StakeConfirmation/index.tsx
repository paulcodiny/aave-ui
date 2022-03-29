import React, { ChangeEvent } from 'react';
import { useIntl } from 'react-intl';
import { BigNumber } from '@aave/protocol-js';

import { MultiFeeDistributionService } from '../../../../libs/aave-protocol-js/MulteFeeDistribution/MultiFeeDistributionContract';
import { getProvider } from '../../../../helpers/config/markets-and-network-config';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';

import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import StakeTxConfirmationView from '../../../staking/components/StakeTxConfirmationView';

import stakeMessages from '../../../staking/screens/StakeWithApprovalConfirmation/messages';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';

interface StakeConfirmationProps {
  amount: BigNumber;
  maxAmount: BigNumber;
  onAfterSuccessClick?: (e: ChangeEvent) => void;
}

function StakeConfirmation({
  amount,
  maxAmount,
  onAfterSuccessClick = () => {},
}: StakeConfirmationProps) {
  const intl = useIntl();
  const { selectedStake } = useStakeDataContext();
  const { chainId } = useProtocolDataContext();
  const { userId } = useStaticPoolDataContext();
  // todo:pavlik selectedStake and selectedStakeData should be adjusted to RDNT

  if (!amount || !userId) {
    return null;
  }

  const multiFeeDistributionService = new MultiFeeDistributionService(getProvider(chainId));
  const handleGetTransactions = () =>
    multiFeeDistributionService.stake(userId, amount.toString(), false);

  let blockingError = '';
  if (amount.gt(maxAmount)) {
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
      goToAfterSuccess={''}
      onAfterSuccessClick={onAfterSuccessClick}
      successButtonTitle={intl.formatMessage(stakeMessages.backToStaking)}
      buttonTitle={intl.formatMessage(stakeMessages.buttonTitle)}
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
