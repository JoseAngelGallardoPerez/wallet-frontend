import { PaginationPageLimitInterface } from '@interfaces/pagination-page-limit.interface';
import { Transaction } from '@models/transaction';

export interface CurrencyBalanceInterface {
  currencyCode: string;
  totalBalances: string;
  pendingTransactions: string;
  futureBalance: string;
}

export interface AllAccBalanceData {
  id: number;
  name: string;
  currencyCode: string;
  numberOfAccounts: number;
  totalBalances: string;
}

export interface Links {
  next: string;
  prev: string;
  first: string;
  last: string;
}

export interface IAmountDetails {
  amount: string;
  currencyCode: string;
  purpose: string;
}

export interface UserAllAccBalanceInterface {
  accBalance: AllAccBalanceData[];
  pagination: PaginationPageLimitInterface;
  currencyBalance?: CurrencyBalanceInterface[];
}

export class UserReportData {
  constructor(public transactions: Transaction[], public pagination: PaginationPageLimitInterface,
              public includeEntities?: CurrencyBalanceInterface[]) {
    this.transactions = transactions;
    this.pagination = pagination;
    this.includeEntities = includeEntities;
  }
}

export class UserReportBalanceData {
  constructor(public accBalance: AllAccBalanceData[] , public pagination: PaginationPageLimitInterface,
              public currencyBalance?: CurrencyBalanceInterface[]) {
    this.accBalance = accBalance;
    this.pagination = pagination;
    this.currencyBalance = currencyBalance;
  }
}
