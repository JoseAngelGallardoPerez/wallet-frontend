import { CurrencyInterface } from '@interfaces/currency-interface';
import { CurrencySettingsInterface } from '@interfaces/currency-settings-interface';

export class CurrencySettingsModel implements CurrencySettingsInterface {
  id: number;
  mainCurrencyId: number;
  mainCurrency: CurrencyInterface;
  autoUpdatingRates: boolean;

  public constructor(params: any) {
    Object.assign(this, params);
  }
}
