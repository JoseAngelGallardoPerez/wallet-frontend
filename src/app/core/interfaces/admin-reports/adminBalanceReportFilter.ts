export interface AdminBalanceReportFilterInterface {
  dateTo?: string;
  page: string;
  limit: string;
}

export interface PageFiltersInterface {
  page: {
    number: string;
    size: string;
  };
  filters?: {
    dateTo: string
  };
}
