const rdntConfig = {
  lendingPoolAddressProvider: (
    localStorage.getItem('LendingPoolAddressProvider') ||
    '0xCE9717880502dD946567b71b5205097BC036313d'
  ).toLowerCase(),
  lendingPool: localStorage.getItem('LendingPool') || '0xa747cBB40D66945f4b3661919B5B47aaa3aAE9b3',
  rdntToken: localStorage.getItem('RadiantToken') || '0xE21a769FD98EA5179A3098A79895008Cd35d43bF',
  aaveProtocolDataProvider:
    localStorage.getItem('AaveProtocolDataProvider') ||
    '0xe3B278838D9A8a1A807dD2d82B897Ed64Bf6F6Da',
  wethGateway: localStorage.getItem('WETHGateway') || '0x7cbF0a7CBAC2e081Ec71D058ebEEF45DA846117D',
  multiFeeDistribution:
    localStorage.getItem('MultiFeeDistribution') || '0xC497f851624c0758e4a1BAf247B0529d5cbED80E',
  chefIncentivesController:
    localStorage.getItem('ChefIncentivesController') ||
    '0x31466e4D84e2BBA672F06ae87cA4aE77Daa12e95',
  walletBalanceProvider:
    localStorage.getItem('WalletBalanceProvider') || '0x43FB7C55973487886dF45BdA4D7b8E020cc1e41B',
  uiPoolDataProvider:
    localStorage.getItem('UiPoolDataProviderV2V3') || '0xA23Aa4874096B2A77C70cF6Ab9a2B517EfA01df8',
};

export default rdntConfig;
