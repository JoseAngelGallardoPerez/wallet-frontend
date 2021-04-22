import { UserReportInterface } from '@interfaces/admin-reports/userReportInterface';
import { AccountTypeInterface } from '@interfaces/account-type-interface';

export class MaturityDatesModel {
  public id: number;
  public number: string;
  public balance: string;
  public status: boolean;
  public createdAt: string;
  public maturityDate: string;
  user: UserReportInterface;
  type: AccountTypeInterface;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
