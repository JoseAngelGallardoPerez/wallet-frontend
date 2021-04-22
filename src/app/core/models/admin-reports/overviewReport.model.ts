import { OverviewDepositInterface } from '@interfaces/admin-reports/overviewDeposit.interface';
import { OverviewBalanceInterface } from '@interfaces/admin-reports/overviewBalance.interface';
import { OverviewPendingTransactionInterface } from '@interfaces/admin-reports/overviewPendingTransaction.interface';

export class OverviewReportModel {
  public deposits: OverviewDepositInterface[];
  public revenues: { currencyCode: string, sum: string, count: string }[];
  public revenuesAccounts: OverviewBalanceInterface[];
  public totalBalance: OverviewBalanceInterface[];
  public pendingTransactions: OverviewPendingTransactionInterface[];
  public futureBalance: OverviewBalanceInterface[];
  public summary: { active: string, pending: string};

  constructor(data: any, includeEntities: any) {
    this.deposits = data.deposits;
    this.revenues = data.revenues;
    this.revenuesAccounts = data.revenuesAccounts;
    this.totalBalance = data.totalBalance;
    this.pendingTransactions = data.pendingTransactions;
    this.futureBalance = data.futureBalance;
    this.summary = includeEntities;
  }
}
