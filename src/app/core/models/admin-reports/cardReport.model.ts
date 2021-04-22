import { UserReportInterface } from '@interfaces/admin-reports/userReportInterface';
import { AccountTypeInterface } from '@interfaces/account-type-interface';

export class CardReportModel {
  public id: number;
  public number: string;
  public createdAt: string;
  public status: boolean;
  user: UserReportInterface;
  type: AccountTypeInterface;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
