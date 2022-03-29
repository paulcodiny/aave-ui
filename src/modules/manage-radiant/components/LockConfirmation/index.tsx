import React, { ChangeEvent } from 'react';
import { useIntl } from 'react-intl';
import { BigNumber } from '@aave/protocol-js';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { MultiFeeDistributionService } from '../../../../libs/aave-protocol-js/MulteFeeDistribution/MultiFeeDistributionContract';
import { getProvider } from '../../../../helpers/config/markets-and-network-config';

import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';
import StakeTxConfirmationView from '../../../staking/components/StakeTxConfirmationView';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import stakeMessages from '../../../staking/screens/StakeWithApprovalConfirmation/messages';

interface LockConfirmationProps {
  amount: BigNumber;
  maxAmount: BigNumber;
  onAfterSuccessClick?: (e: ChangeEvent) => void;
}

function LockConfirmation({
  amount,
  maxAmount,
  onAfterSuccessClick = () => {},
}: LockConfirmationProps) {
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
    multiFeeDistributionService.stake(userId, amount.toString(), true);

  let blockingError = '';
  if (amount.gt(maxAmount)) {
    blockingError = intl.formatMessage(stakeMessages.notEnoughBalance, {
      asset: selectedStake.toUpperCase(),
    });
  }

  return (
    <StakeTxConfirmationView
      getTransactionsData={handleGetTransactions}
      boxTitle={intl.formatMessage(defaultMessages.lock, { asset: selectedStake.toUpperCase() })}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      mainTxName={intl.formatMessage(defaultMessages.lock, { asset: selectedStake.toUpperCase() })}
      mainTxType="LOCK_ACTION"
      blockingError={blockingError}
      goToAfterSuccess={''}
      onAfterSuccessClick={onAfterSuccessClick}
      successButtonTitle={intl.formatMessage(messages.backToStaking)}
      buttonTitle={intl.formatMessage(messages.buttonTitle)}
    >
      <Row title={intl.formatMessage(messages.amount)}>
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

export default LockConfirmation;
