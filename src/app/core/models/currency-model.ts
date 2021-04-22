export class CurrencyModel {
  id: number;
  code: string;
  name: string;
  active: boolean;
  type: string;
  feed: string;
  decimalPlaces: string;
  disabled?: boolean;

  public constructor(params: any) {
    (<any>Object).assign(this, params);
  }
}

export class CurrenciesListModel {
  data: Currency[];
}

export class Currency {
  id: number;
  code: string;
  active: boolean;
  type: string;
  feed: string;
  decimalPlaces: number;

  public constructor(params: any) {
    (<any>Object).assign(this, params);
    if (!params.decimalPlaces) {
      this.decimalPlaces = 2;
    }
  }
}

export class CurrencySettingsModel {
  data: CurrencySettings;
}

export class CurrencySettings {
  mainCurrencyId: number;
  autoUpdatingRates: boolean;
}
