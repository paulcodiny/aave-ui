import { valueToBigNumber } from '@aave/protocol-js';
import { ethers } from 'ethers';
import { MultiFeeDistributionFactory } from '../../../../libs/aave-protocol-js/MultiFeeDistributionFactory';
import GeistToken from '../../../../../src/libs/aave-protocol-js/GeistToken.json';

const amount = valueToBigNumber(1);
const stake = async () => {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const radiantContract = new ethers.Contract(
    '0xe24054e9eB120c5C8d812378f41C6EB0b942A3e5',
    GeistToken.abi,
    signer
  );
  const multiFeeDistributionContract = MultiFeeDistributionFactory.connect(
    '0x0997811feaa3404930c77C40101492C5b95468Bb',
    signer
  );
  try {
    const amountAsString = ethers.utils.parseEther(amount.toString());
    const test = await radiantContract.approve(
      '0x0997811feaa3404930c77C40101492C5b95468Bb',
      amountAsString
    );
    await test.wait();

    return multiFeeDistributionContract.stake(amountAsString, false);
  } catch (e) {
    console.log(e);
  }
};
