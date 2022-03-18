import React, { useEffect, useState } from 'react';
import { BigNumberish, ethers } from 'ethers';
import rdntConfig from '../../../../ui-config/rdnt';
import TableValueCol from '../DashboardTable/TableValueCol';
import TableAprCol from '../DashboardTable/TableAprCol';
import TableItem from '../DashboardTable/TableItem';

import { MultiFeeDistributionFactory } from '../../../../libs/aave-protocol-js/MultiFeeDistributionFactory';

export default function RdntTableItem() {
  const [lockedBalance, setLockedBalance] = useState<BigNumberish>(0);
  const [total, setTotal] = useState<BigNumberish>(0);

  useEffect(() => {
    const fn = async () => {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const multiFeeDistributionContract = MultiFeeDistributionFactory.connect(
        rdntConfig.multiFeeDistribution,
        signer
      );
      try {
        const data = await multiFeeDistributionContract.earnedBalances(rdntConfig.account);
        console.log(data);
        const data2 = await multiFeeDistributionContract.lockedBalances(rdntConfig.account);
        console.log(data2);
        setLockedBalance(data2.locked);
        setTotal(data2.total);
      } catch (e) {
        console.log(e);
      }
    };

    fn();
  });

  return (
    <TableItem tokenSymbol={'RDNT'}>
      <TableValueCol value={Number(total)} subValue={Number(total)} />
      <TableAprCol
        value={123}
        thirtyDaysAverage={'123'}
        liquidityMiningValue={'123'}
        symbol={'RDNT'}
        type={'123'}
      />
      <TableValueCol value={Number(lockedBalance)} subValue={Number(lockedBalance)} />
      <TableValueCol value={123} subValue={234} />
    </TableItem>
  );
}
