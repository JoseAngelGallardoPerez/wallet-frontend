import { AccountModel } from '@models/account-model';

export class ManualTransactionReportModel {
  public id: number;
  public description: string;
  public purpose: string;
  public amount: string;
  public createdAt: string;
  public statusChangedAt: string;
  account: AccountModel;

  constructor (data: any) {
    this.id = data.id;
    this.description = data.description;
    this.amount = data.amount;
    this.createdAt = data.createdAt;
    this.statusChangedAt = data.statusChangedAt;
    this.purpose = data.purpose;
    this.account = new AccountModel(data.account);
  }
}
