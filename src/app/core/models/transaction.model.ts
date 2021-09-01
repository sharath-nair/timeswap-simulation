import { User } from '@app/core/models/user.model';
import { TxType } from '../config/app.config';

export interface Transaction {
  id?: number;
  txDate?: Date | string;
  txType?: TxType;
  user?: User;
  assetValue?: number;
  collateralValue?: number;
  interestRate?: number;
  isExecutable?: boolean;
  hasBeenExecuted?: boolean;
}
