import { ChainId } from '@aave/contract-helpers';
import { Stake } from '../libs/aave-protocol-js';
import rdntConfig from './rdnt';

export interface StakeConfig {
  chainId: ChainId;
  stakeDataProvider: string;
  tokens: {
    [token: string]: {
      TOKEN_STAKING: string;
      STAKING_REWARD_TOKEN: string;
      STAKING_HELPER?: string;
    };
  };
}

export const stakeConfig: StakeConfig | undefined = {
  // todo:pavlik:staking when the method getUIData is available
  chainId: (localStorage.getItem('stakeChainId') || ChainId.mainnet) as ChainId,
  stakeDataProvider:
    localStorage.getItem('stakeDataProvider') || '0xa82247B44750ae23076D6746A9B5B8dc0eCBB646',
  tokens: {
    // todo:pavlik:staking stake config
    [Stake.rdnt]: {
      TOKEN_STAKING: rdntConfig.rdntToken,
      STAKING_REWARD_TOKEN: rdntConfig.rdntToken,
      STAKING_HELPER: '0xce0424653fb2fd48ed1b621bdbd60db16b2e388a',
    },
  },
};

// kovan config
// export const stakeConfig: StakeConfig | undefined = {
//   chainId: ChainId.kovan,
//   stakeDataProvider: '0x5671387d56eAB334A2D65d6D0BB4D907898C7abA',
//   tokens: {
//     [Stake.rdnt]: {
//       TOKEN_STAKING: '0xf2fbf9A6710AfDa1c4AaB2E922DE9D69E0C97fd2',
//       STAKING_REWARD_TOKEN: '0xb597cd8d3217ea6477232f9217fa70837ff667af',
//       STAKING_HELPER: '0xf267aCc8BF1D8b41c89b6dc1a0aD8439dfbc890c',
//     },
//   },
// };
