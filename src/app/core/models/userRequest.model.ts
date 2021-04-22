import { SUBJECT_TEXTS } from '@constants/request-subjects';

export interface Snapshot {
  balanceId: number;
  balanceType: {
    name: string
  };
  value: {
    availableAmount: string;
    balance: string;
  };

}

export interface BalanceDifference {
  balanceType: string;
  balanceId: number;
  currencyCode: string;
  difference: string;

}

export class UserRequestModel {
  public id: number;
  public amount: string;
  public description: string;
  public baseCurrencyCode: string;
  public status: string;
  public subject: string;
  public userId: string;
  public createdAt: string;
  public statusChangedAt: string;
  public balanceSnapshot: string;

  public constructor(params: any, accountId: number) {
    this.id = params.id;
    this.amount = params.amount;
    this.description = params.description || SUBJECT_TEXTS[params.subject];
    this.baseCurrencyCode = params.baseCurrencyCode;
    this.status = params.status;
    this.subject = params.subject;
    this.userId = params.userId;
    this.createdAt = params.createdAt;
    this.statusChangedAt = params.statusChangedAt;
    if (params.snapshots.length) {
      const snapshot: Snapshot | undefined = (<Snapshot[]>params.snapshots)
        .find((data) => data.balanceType.name === 'account' && data.balanceId === accountId);
      this.balanceSnapshot = snapshot ? snapshot.value.availableAmount : '0';
    }
  }
}
