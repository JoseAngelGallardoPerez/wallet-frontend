import { transferToCamelCaseObject } from '@helpers/stringHelpers';

export class AccountReportModel {
  id: number;
  balanceSnapshot: number;
  description: string;
  amount: string;
  requestId: number;
  createdAt: string;
  statusChangedAt: string;

  constructor(data: any) {
    Object.assign(this, transferToCamelCaseObject(data));
  }
}
