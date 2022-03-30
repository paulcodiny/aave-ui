import React, { useCallback } from 'react';

import GradientLine from '../../../../components/basic/GradientLine';
import DefaultButton from '../../../../components/basic/DefaultButton';
import Link from '../../../../components/basic/Link';

import staticStyles from './style';
import { ChefIncentivesService } from '../../../../libs/aave-protocol-js/ChefIncentivesContract/ChefIncentivesContract';
import { getProvider } from '../../../../helpers/config/markets-and-network-config';
import { sendEthTransaction } from '../../../../helpers/send-ethereum-tx';
import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { useDynamicPoolDataContext } from '../../../../libs/pool-data-provider';
import { MultiFeeDistributionService } from '../../../../libs/aave-protocol-js/MulteFeeDistribution/MultiFeeDistributionContract';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';

interface MainStatsProps {
  staked: string;
  earned: string;
}

export function MainStats({ earned, staked }: MainStatsProps) {
  const { chainId } = useProtocolDataContext();
  const { user } = useDynamicPoolDataContext();
  const { library: provider } = useWeb3React<providers.Web3Provider>();

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="Table">
        <div className="Table__body">
          <div className="Table__row">
            <div className="Table__column">
              <h4>Unlocked RDNT</h4>
              <p>Stacked RDNT and expired RDNT vests</p>
            </div>
            <div className="Table__column">
              <strong>{staked}</strong> RDNT
            </div>
            <div className="Table__column">
              <DefaultButton
                title="Claim RDNT"
                color="purple"
                transparent
                onClick={async () => {
                  const multiFeeDistributionService = new MultiFeeDistributionService(
                    getProvider(chainId)
                  );

                  const actionTx = await multiFeeDistributionService.withdraw(user.id, staked);
                  const approveTxData = {
                    txType: actionTx[0].txType,
                    unsignedData: actionTx[0].tx,
                    gas: actionTx[0].gas,
                  };

                  return sendEthTransaction(
                    approveTxData.unsignedData,
                    provider,
                    () => {
                      console.log('updated');
                    },
                    null,
                    {
                      onConfirmation: () => {
                        console.log('withdrawn');
                      },
                    }
                  );
                }}
              />
            </div>
          </div>

          <GradientLine size={2} />

          <div className="Table__row">
            <div className="Table__column">
              <h4>Vesting RDNT</h4>
              <p>
                RDNT that can be claimed with a <strong>50% penalty</strong>
              </p>
            </div>
            <div className="Table__column">
              <strong>{earned}</strong> RDNT
            </div>
            <div className="Table__column" />
          </div>

          <GradientLine size={2} />

          <div className="Table__row">
            <div className="Table__column">
              <h4>Claim all of the above</h4>
              <p>
                Early Exit Penalty: <strong>0.001 RDNT</strong>
              </p>
            </div>
            <div className="Table__column" />
            <div className="Table__column">
              <DefaultButton
                title="Claim all"
                color="purple"
                transparent
                onClick={async () => {
                  const multiFeeDistributionService = new MultiFeeDistributionService(
                    getProvider(chainId)
                  );

                  const actionTx = await multiFeeDistributionService.exit(user.id);

                  return sendEthTransaction(
                    actionTx,
                    provider,
                    () => {
                      console.log('updated');
                    },
                    null,
                    {
                      onConfirmation: () => {
                        console.log('exited');
                      },
                    }
                  );
                }}
              />
            </div>
          </div>

          <GradientLine size={2} />

          <div className="Table__row">
            <div className="Table__column">
              <h4>Expired Locked </h4>
              <p>RDNT locks that have exceeded the 3 month lock period and now withdrawable</p>
            </div>
            <div className="Table__column">
              <strong>XX</strong> RADIANT
            </div>
            <div className="Table__column">
              <DefaultButton title="Lock" color="purple" transparent />
            </div>
          </div>
        </div>
      </div>

      <style jsx={true}>{staticStyles}</style>
    </>
  );
}
