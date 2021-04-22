import { CurrenciesPrecision } from '@constants/currencies';

export class BalanceHelper {

  public static valueToCurrencyPrecision(value: number | string, currencyCode: string): string {
    return BalanceHelper.valueToPrecision(value, BalanceHelper.getCurrencyPrecision(currencyCode));
  }

  public static valueToPrecision(value: number | string, precision: number = 2): string {
    const amountWithoutComma: number = parseFloat(BalanceHelper.amountWithoutComma(value && value.toString() || '0'));
    return amountWithoutComma.toFixed(precision);
  }

  public static getCurrencyPrecision(currencyCode: string): number {
    return CurrenciesPrecision.has(currencyCode) ? CurrenciesPrecision.get(currencyCode) : 2;
  }

  public static valueToCurrencyPrecisionWithCommas(value: number | string, currencyCode: string): string {
    return BalanceHelper.convertToAmountWithCommas(BalanceHelper.valueToPrecision(value, BalanceHelper.getCurrencyPrecision(currencyCode)));
  }

  public static convertToAmountWithCommas(value: number | string) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  private static amountWithoutComma(amount: string): string {
    return amount.replace(/,/g, '');
  }

  private static bankRounding(amount: number, precision: number): number {
    const m: number = Math.pow(10, precision);
    const n: number = +(precision ? amount * m : amount).toFixed(8);
    const i: number = Math.floor(n);
    const f: number = n - i;
    const e = 1e-8;
    const r: number = (f > 0.5 - e && f < 0.5 + e) ? ((i % 2 === 0) ? i : i + 1) : Math.round(n);
    return precision ? r / m : r;
  }
}
