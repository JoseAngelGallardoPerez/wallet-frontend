import { RevenueAccountInterface } from '@interfaces/revenue-account.interface';
import { CurrencyInterface } from '@interfaces/currency-interface';
import { CurrencyModel } from '@models/currency-model';

export class RevenueAccountModel implements RevenueAccountInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  availableAmount: number;
  balance: number;
  currencyId: number;
  currencyCode: string;
  currency: CurrencyInterface;

  public constructor(params: any) {

    if (params.currency) {
      this.currency = new CurrencyModel(params.currency);
      delete params.currency;
    }

    Object.assign(this, params);
  }
}
