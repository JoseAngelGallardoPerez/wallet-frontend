import { ExchangeRate } from '@interfaces/exchange-rate';

export class ExchangeRateModel implements ExchangeRate {
  id: number;
  value: string;
  exchangeMargin: string;
  code?: string;
  type?: string;
  feed?: string;

  currencyFrom?: {
    id: number,
    code: string,
  };
  currencyTo?: {
    id: number,
    code: string,
  };

  public constructor(params: any) {
    (<any>Object).assign(this, params);
    this.code = params.currencyTo.code;
    this.type = params.currencyTo.type;

    if (this.value === '0') {
      this.value = '';
    }
  }
}
