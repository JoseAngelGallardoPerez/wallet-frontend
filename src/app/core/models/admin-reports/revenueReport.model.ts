import { UserReportInterface } from '@interfaces/admin-reports/userReportInterface';
import { AccountTypeInterface } from '@interfaces/account-type-interface';

export class RevenueReportModel {
  public id: number;
  public description: string;
  public amount: string;
  public subject: string;
  public createdAt: string;
  account: {
    id: number,
    number: string,
    user: UserReportInterface,
    type: AccountTypeInterface
  };
  user: UserReportInterface;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
