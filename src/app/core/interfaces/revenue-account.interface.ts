import { CurrencyInterface } from '@interfaces/currency-interface';

export interface RevenueAccountInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  availableAmount: number;
  balance: number;
  currencyId: number;
  currencyCode: string;
  currency: CurrencyInterface;
}
