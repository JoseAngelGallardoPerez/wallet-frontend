import { CurrencyInterface } from './currency-interface';

export interface CardTypeInterface {
  id: number;
  name: string;
  currencyCode: string;
  iconId: number;
  cardTypeCategoryId?: number;
  cardTypeFormatId?: number;
  providerCode?: string;
  category?: {
    id: number;
    name: string;
  };
  format?: {
    id: number;
    name: string;
    code: string;
  };
  createdAt: number;
  updatedAt: number;
  currency: CurrencyInterface;
}
