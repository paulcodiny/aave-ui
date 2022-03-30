import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';
import rdntConfig from '../../../../ui-config/rdnt';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { MultiFeeDistributionService } from '../../../../libs/aave-protocol-js/MulteFeeDistribution/MultiFeeDistributionContract';
import { getProvider } from '../../../../helpers/config/markets-and-network-config';

import TableValueCol from '../DashboardTable/TableValueCol';
import TableAprCol from '../DashboardTable/TableAprCol';
import TableItem from '../DashboardTable/TableItem';
import { AaveProtocolDataProviderContract } from '../../../../libs/aave-protocol-js/AaveProtocolDataProvider/AaveProtocolDataProviderContract';
import { ChefIncentivesService } from '../../../../libs/aave-protocol-js/ChefIncentivesContract/ChefIncentivesContract';
import TableButtonCol from '../DashboardTable/TableButtonCol';
import defaultMessages from '../../../../defaultMessages';
import TableButtonsWrapper from '../DashboardTable/TableButtonsWrapper';
import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';
import { sendEthTransaction } from '../../../../helpers/send-ethereum-tx';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';

export default function RdntTableItem() {
  const intl = useIntl();
  const { chainId } = useProtocolDataContext();
  const { user } = useDynamicPoolDataContext();
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const [earned, setEarned] = useState<BigNumber>(valueToBigNumber(0));
  const [locked, setLocked] = useState<BigNumber>(valueToBigNumber(0));
  const [staked, setStaked] = useState<BigNumber>(valueToBigNumber(0));
  const [availableForVesting, setAvailableForVesting] = useState<Number>(0);
  const [vestable, setVestable] = useState<string[]>([]);

  if (!user) {
    return null;
  }

  useEffect(() => {
    (async () => {
      // todo: pavlik extract this to a separate context
      const multiFeeDistributionService = new MultiFeeDistributionService(getProvider(chainId));

      try {
        const [totalBalance, unlocked, earned] = await multiFeeDistributionService.getBalances(
          user.id
        );
        setEarned(earned);
        setLocked(totalBalance.minus(unlocked));
        setStaked(unlocked);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const dataProviderContract = new AaveProtocolDataProviderContract(getProvider(chainId));
  const chefChefIncentivesService = new ChefIncentivesService(getProvider(chainId));
  useEffect(() => {
    (async () => {
      const tokens = await dataProviderContract.getTokens();
      const amounts = await chefChefIncentivesService.claimableRewards(user.id, tokens);
      console.log({ amounts });
      const vestable = amounts.map((n) => n.div(10 ** 9)).map((n) => n.div(10 ** 9));
      const result = vestable
        .filter((amount) => Number(amount) > 0.001)
        .reduce((s, n) => s + Number(n), 0);
      setAvailableForVesting(result);

      const vestableTokens: string[] = [];
      vestable.forEach((amount, i) => {
        if (Number(amount) > 0.001) {
          vestableTokens.push(tokens[i]);
        }
      });
      setVestable(vestableTokens);
    })();
  }, []);

  return (
    <TableItem tokenSymbol={'RDNT'}>
      <TableValueCol value={Number(availableForVesting)} />
      <TableAprCol
        value={0}
        thirtyDaysAverage={'XXX'}
        liquidityMiningValue={'XXX'}
        symbol={'RDNT'}
        type={'XXX'}
      />
      <TableValueCol value={Number(staked)} />
      <TableValueCol value={Number(locked)} />

      <TableButtonsWrapper>
        <TableButtonCol
          onClick={async (event) => {
            event.stopPropagation();
            event.preventDefault();

            const chefIncentivesService = new ChefIncentivesService(getProvider(chainId));

            const actionTx = await chefIncentivesService.claim(user.id, vestable);
            const approveTxData = {
              txType: actionTx[0].txType,
              unsignedData: actionTx[0].tx,
              gas: actionTx[0].gas,
            };

            return sendEthTransaction(
              approveTxData.unsignedData,
              provider,
              () => {
                console.log('state setter');
              },
              null,
              {
                onConfirmation: () => {
                  console.log('vested');
                },
              }
            );
          }}
          disabled={!availableForVesting}
          title={
            intl.formatMessage(defaultMessages.vest, { amount: availableForVesting }) as string
          }
          linkTo={'/claim'}
        />
      </TableButtonsWrapper>
    </TableItem>
  );
}
