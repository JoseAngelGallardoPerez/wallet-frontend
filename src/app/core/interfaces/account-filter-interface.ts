export interface AccountFilterInterface {
  createdAtFrom?: string;
  createdAtTo?: string;
  numberContains?: string;
  accountTypeId?: string;
  accountTypeCurrencyCode?: string;
  isActive?: string;
  userId?: string;
  allowDeposits?: boolean;
  typeCurrencyCode?: string;
  sort: string;
  pageSize: string;
  pageNumber: string;
  isIwtInstructionsAvailable?: string;
}
