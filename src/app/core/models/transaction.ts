import { AccountInterface } from '@interfaces/account-interface';

export class Transaction {
  public id: number;
  public description: string;
  public amount: string;
  public status: string;
  public createdAt: string;
  public statusChangedAt: string;
  public accountId: number;
  public currencyCode: string;
  public account: AccountInterface;
  public requestId: string;
  public balanceSnapshot?: number;
  public availableBalanceSnapshot?: number;
  public currentBalanceSnapshot?: number;

  public constructor(params: any) {
    Object.assign(this, params);
  }
}
