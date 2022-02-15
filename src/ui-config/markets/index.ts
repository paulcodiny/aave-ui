import { ChainId } from '@aave/contract-helpers';
import { MarketDataType } from '../../helpers/config/types';

import * as logos from './images';

export enum CustomMarket {
  proto_kovan = 'proto_kovan',
  proto_mainnet = 'proto_mainnet',
  proto_avalanche = 'proto_avalanche',
  proto_matic = 'proto_matic',
  proto_mumbai = 'proto_mumbai',
}

export const marketsData: { [key in keyof typeof CustomMarket]: MarketDataType } = {
  [CustomMarket.proto_kovan]: {
    chainId: ChainId.kovan,
    logo: logos.aavev2Logo,
    activeLogo: logos.aavev2ActiveLogo,
    aTokenPrefix: 'A',
    enabledFeatures: {
      faucet: true,
      governance: true,
      staking: true,
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x88757f2f99175387ab4c6a4b3067c77a695b0349'.toLowerCase(),
      LENDING_POOL: '0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe',
      WETH_GATEWAY: '0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70',
      FAUCET: '0x600103d518cC5E8f3319D532eB4e5C268D32e604',
    },
  },
  [CustomMarket.proto_mainnet]: {
    chainId: ChainId.mainnet,
    logo: logos.aavev2Logo,
    activeLogo: logos.aavev2ActiveLogo,
    aTokenPrefix: 'A',
    enabledFeatures: {
      governance: true,
      staking: true,
      liquiditySwap: true,
      collateralRepay: true,
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5'.toLowerCase(),
      LENDING_POOL: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
      WETH_GATEWAY: '0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04',
      REPAY_WITH_COLLATERAL_ADAPTER: '0x498c5431eb517101582988fbb36431ddaac8f4b1',
      SWAP_COLLATERAL_ADAPTER: '0x135896DE8421be2ec868E0b811006171D9df802A',
    },
  },
  [CustomMarket.proto_mumbai]: {
    chainId: ChainId.mumbai,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    subLogo: logos.polygon,
    aTokenPrefix: 'AM',
    enabledFeatures: {
      incentives: true,
      faucet: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x178113104fEcbcD7fF8669a0150721e231F0FD4B'.toLowerCase(),
      LENDING_POOL: '0x9198F13B08E299d85E096929fA9781A1E3d5d827',
      WETH_GATEWAY: '0xee9eE614Ad26963bEc1Bec0D2c92879ae1F209fA',
      FAUCET: '0x0b3C23243106A69449e79C14c58BB49E358f9B10',
    },
  },
  [CustomMarket.proto_matic]: {
    chainId: ChainId.polygon,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    subLogo: logos.polygon,
    aTokenPrefix: 'AM',
    enabledFeatures: {
      liquiditySwap: true,
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xd05e3E715d945B59290df0ae8eF85c1BdB684744'.toLowerCase(),
      LENDING_POOL: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf',
      WETH_GATEWAY: '0xbEadf48d62aCC944a06EEaE0A9054A90E5A7dc97',
      SWAP_COLLATERAL_ADAPTER: '0x35784a624D4FfBC3594f4d16fA3801FeF063241c',
    },
  },
  [CustomMarket.proto_avalanche]: {
    chainId: ChainId.avalanche,
    logo: logos.aaveLogo,
    activeLogo: logos.aaveActiveLogo,
    subLogo: logos.avalanche,
    aTokenPrefix: 'AV',
    enabledFeatures: {
      liquiditySwap: true,
      incentives: true,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0xb6A86025F0FE1862B372cb0ca18CE3EDe02A318f'.toLowerCase(),
      LENDING_POOL: '0x4F01AeD16D97E3aB5ab2B501154DC9bb0F1A5A2C',
      WETH_GATEWAY: '0x8a47F74d1eE0e2edEB4F3A7e64EF3bD8e11D27C8',
      SWAP_COLLATERAL_ADAPTER: '0x2EcF2a2e74B19Aab2a62312167aFF4B78E93B6C5',
    },
  },
} as const;
