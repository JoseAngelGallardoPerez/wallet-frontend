import { CurrencyInterface } from '@interfaces/currency-interface';
import { CardTypeInterface } from '@interfaces/card-type-interface';

export class CardTypeModel implements CardTypeInterface {
  id: number;
  name: string;
  currencyCode: string;
  iconId: number;
  cardTypeCategoryId: number;
  cardTypeFormatId: number;
  createdAt: number;
  updatedAt: number;
  currency: CurrencyInterface;
  category?: {
    id: number;
    name: string;
  };
  format?: {
    id: number;
    name: string;
    code: string;
  };

  public constructor(params: any) {
    Object.assign(this, params);
  }
}
