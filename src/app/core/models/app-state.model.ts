import { User } from '@app/core/models/user.model';
import { Pool } from '@app/core/models/pool.model';
import { Transaction } from '@app/core/models/transaction.model';

export interface AppState {
  poolInfo?: Pool;
  transactions?: Transaction[];
  users?: User[];
}
