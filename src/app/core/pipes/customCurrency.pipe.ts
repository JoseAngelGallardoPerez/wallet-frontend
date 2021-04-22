import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { BalanceHelper } from '@helpers/balance.helper';
import { Currency } from '@models/currency-model';
import { select, Store } from '@ngrx/store';
import { CurrenciesState } from '@components/currencies/reducers';
import { LoadCurrencies } from '@components/currencies/actions/currencies.actions';
import * as FromCurrencies from '@components/currencies/reducers';
import { first, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { once } from '@helpers/once.operator';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {
  private decimalPipe: DecimalPipe;
  private currencies: Observable<Currency[]>;
  constructor(
    @Inject(LOCALE_ID) _locale: string,
    private store: Store<CurrenciesState>,
  ) {
    this.decimalPipe = new DecimalPipe(_locale);
    this.currencies = this.store.pipe(
      select(FromCurrencies.getCurrencies),
      once((data: Currency[]) => {
        if (!data.length) {
          this.store.dispatch(new LoadCurrencies({ 'page[size]': '0' }));
        }
      }),
    );
  }

  transform(value: string | number, currencyCode: string): Observable<string> {
    return this.currencies.pipe(
      first((data: Currency[]) => !!data.length),
      map((data: Currency[]) => {
        const res = data.find(currency => currency.code === currencyCode);
        const precision = res ? res.decimalPlaces : 2;
        return this.decimalPipe.transform(BalanceHelper.valueToPrecision(value, precision),
          `1.${ precision }-${ precision }`);
      }),
      take(1)
    );
  }
}
