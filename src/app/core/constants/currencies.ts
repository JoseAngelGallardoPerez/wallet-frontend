import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';

export const AUTO_UPDATING_CURRENCY_CODE = 'EUR';

export const CurrenciesPrecision = new Map<string, number>([
  ['AUD', 2],
  ['BGN', 2],
  ['CAD', 2],
  ['BRL', 2],
  ['CHF', 2],
  ['CNY', 2],
  ['CZK', 2],
  ['DKK', 2],
  ['EUR', 2],
  ['GBP', 2],
  ['HKD', 2],
  ['HRK', 2],
  ['HUF', 2],
  ['ILS', 2],
  ['INR', 2],
  ['JPY', 0],
  ['MXN', 2],
  ['NOK', 2],
  ['NZD', 2],
  ['PLN', 2],
  ['RON', 2],
  ['RUB', 2],
  ['SEK', 2],
  ['SGD', 2],
  ['THB', 2],
  ['TRY', 2],
  ['USD', 2],
  ['ZAR', 2],
  ['BTC', 8],
]);

export const CURRENCY_TYPE = {
  FIAT: 'fiat',
  CRYPTO: 'crypto',
  OTHER: 'other',
};

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  allowNegative: false,
  align: 'left',
  thousands: ' ',
  decimal: '.',
  precision: 2,
  suffix: '',
  prefix: ''
};
