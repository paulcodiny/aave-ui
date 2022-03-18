export default {
  walletBalanceProvider:
    localStorage.getItem('WalletBalanceProvider') || '0xA3eb9c9476B067dd626e2c306F97f49DE058456E',
  uiPoolDataProvider:
    localStorage.getItem('UiPoolDataProviderV2V3') || '0x4c6d886e0d2Ab5530B68b92aA00addA1a631351e',
  multiFeeDistribution:
    localStorage.getItem('MultiFeeDistribution') || '0x9A8519d410B8e70e5aD729E2bC596520495c416c',

  lendingPoolAddressProvider: (
    localStorage.getItem('LendingPoolAddressProvider') ||
    '0x3b69a88b942d597C9712fe6d5b000bEF24572B92'
  ).toLowerCase(),
  lendingPool: localStorage.getItem('LendingPool') || '0x7be43046e36349F373fBEc1866c4bb39141DeAef',
  wethGateway: localStorage.getItem('WETHGateway') || '0x975aBD4931fE0E8919b067565ae1C48a63be7B80',

  rdntToken: localStorage.getItem('RadiantToken') || '0x3d99c2bcaf89b61ca54f1f40ca7bf686a4754bcb',
  account: localStorage.getItem('Account') || '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
};
