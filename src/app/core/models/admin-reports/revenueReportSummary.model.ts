export class RevenueReportSummaryModel {
  public startDate: string;
  public endDate: string;
  public currencyCode: string;
  public totalDebit: string;
  public totalCredit: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
