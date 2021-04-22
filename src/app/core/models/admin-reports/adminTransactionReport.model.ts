import { UserReportInterface } from '@interfaces/admin-reports/userReportInterface';
import { AccountTypeInterface } from '@interfaces/account-type-interface';

export class AdminTransactionReportModel {
  public id: number;
  public description: string;
  public amount: string;
  public subject: string;
  public createdAt: string;
  public statusChangedAt: string;
  account: {
    id: number,
    number: string,
    user: UserReportInterface,
    type: AccountTypeInterface
  };

  constructor(data: any) {
    Object.assign(this, data);
  }
}
