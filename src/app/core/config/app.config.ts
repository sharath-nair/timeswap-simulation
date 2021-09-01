export enum TxType {
  Lend = 'Lend',
  Withdraw = 'Withdraw',
  Borrow = 'Borrow',
  Repay = 'Repay',
  AddLiquidity = 'Add Liquidity',
  RemoveLiquidity = 'Remove Liquidity'
}

export const transactionTypes = ['Borrow', 'Repay', 'Lend', 'Withdraw', 'Add Liquidity', 'Remove Liquidity'];

export const txTypesBeforeMat = [TxType.Borrow, TxType.Repay, TxType.Lend, TxType.AddLiquidity];

export const txTypesAfterMat = [TxType.Withdraw, TxType.RemoveLiquidity];

export const defaultAsset = 'DAI';
export const defaultCollateral = 'ETH';
