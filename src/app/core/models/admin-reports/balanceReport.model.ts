import { AccountTypeInterface } from '@interfaces/account-type-interface';

export class BalanceReportModel {
  public id: number;
  public number: string;
  public createdAt: string;
  public status: boolean;
  public balance: string;
  public availableAmount: string;
  public type: AccountTypeInterface;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
