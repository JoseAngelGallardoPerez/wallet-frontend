export interface AccountReportFilterInterface {
  accountId: number | null;
  dateFrom?: string;
  dateTo?: string;
  page: string;
  limit: string;
}
