export interface RevenueReportFilterInterface {
  type: string;
  currencyCode: string | null;
  dateFrom?: string;
  dateTo?: string;
  page: string;
  limit: string;
}
