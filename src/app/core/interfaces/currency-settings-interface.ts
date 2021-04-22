import { CurrencyInterface } from '@interfaces/currency-interface';

export interface CurrencySettingsInterface {
  id: number;
  mainCurrencyId: number;
  mainCurrency: CurrencyInterface;
  autoUpdatingRates: boolean;
}
