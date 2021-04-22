import { AccountInterface } from '@interfaces/account-interface';
import { AccountTypeInterface } from '@interfaces/account-type-interface';
import { IUser } from '@interfaces/user-interface';

export class AccountModel implements AccountInterface {
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

  public constructor(params: any) {
    Object.assign(this, params);

    // Dirty hack! I am so sorry ;(
    if (this.user && !this.user.humanId) {
      this.user.humanId = function () {
        const fullName = `${this.firstName.trim()} ${this.lastName.trim()}`.trim();
        if (fullName) {
          return `${fullName} ( ${this.email} )`;
        }

        return this.email;
      };
    }
  }
}
