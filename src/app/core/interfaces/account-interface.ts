import { IUser } from './user-interface';
import { AccountTypeInterface } from './account-type-interface';

export interface AccountInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  availableAmount: number;
  initialBalance: number;
  number: string;
  type: AccountTypeInterface;
  typeId: number;
  user: IUser;
  userId: string;
  description: string;
  isActive: boolean;
  balance: number;
  allowWithdrawals: boolean;
  allowDeposits: boolean;
  maturityDate: string;
  payoutDay: number;
  interestAccount: AccountInterface;
  interestAccountId: number;
  cards?: any;
}
