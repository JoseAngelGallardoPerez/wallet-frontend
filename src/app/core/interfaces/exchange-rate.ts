export interface ExchangeRate {
  id: number;
  value: string;
  exchangeMargin: string;
  currencyFrom?: {
    id: number,
    code: string,
  };
  currencyTo?: {
    id: number,
    code: string,
    type?: string,
  };
}
