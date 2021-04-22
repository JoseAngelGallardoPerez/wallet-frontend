import { UserReportInterface } from '@interfaces/admin-reports/userReportInterface';
import { AccountTypeInterface } from '@interfaces/account-type-interface';

export class AdminBalanceReportModel {
  public id: number;
  public number: string;
  public createdAt: string;
  public status: boolean;
  public balance: string;
  public availableAmount: string;
  user: UserReportInterface;
  type: AccountTypeInterface;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
