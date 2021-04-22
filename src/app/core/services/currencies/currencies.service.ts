import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrenciesApiService } from '@services/currencies/currencies-api.service';
import { Currency, CurrencySettings } from '@models/currency-model';
import { FilterOptions } from '@app/core/shared/filter-options';
import { map, switchMap } from 'rxjs/operators';
import { CurrencyInterface } from '@interfaces/currency-interface';

@Injectable()
export class CurrenciesService {
  public constructor(
    private currenciesApiService: CurrenciesApiService,
  ) {
  }

  private onUpdateSettingsSubject$: Subject<CurrencySettings> = new Subject<CurrencySettings>();
  public onUpdateSettings$: Observable<CurrencySettings> = this.onUpdateSettingsSubject$.asObservable()
    .pipe(switchMap((settings: CurrencySettings) => this.currenciesApiService.apiUpdateSettings(settings)),
      map(({ data, error }: { data: any, error: boolean }) => error ? null : data));

  private onUpdateCurrenciesSubject$: Subject<Set<Currency>> = new Subject<Set<Currency>>();
  public onUpdateCurrencies$: Observable<boolean> = this.onUpdateCurrenciesSubject$.asObservable()
    .pipe(switchMap((currencies: Set<Currency>) => this.currenciesApiService.apiUpdateCurrencies(currencies)),
      map(({ error }: { error: boolean }) => !error));

  private onLoadCurrenciesSubject$: Subject<Currency[]> = new Subject<Currency[]>();
  public onLoadCurrencies$: Observable<Currency[]> = this.onLoadCurrenciesSubject$.asObservable();

  public updateSettings(settings: CurrencySettings): void {
    this.onUpdateSettingsSubject$.next(settings);
  }

  public updateCurrencies(currencies: Set<Currency>): void {
    this.onUpdateCurrenciesSubject$.next(currencies);
  }

  public getAllUserCurrencies(filters: FilterOptions = new FilterOptions()): Observable<Currency[]> {
    const params = filters.getParams();
    params['page[size]'] = '0';

    return this.currenciesApiService.apiGetUserCurrencies(params).pipe(
      map(({ data, error }: { data: any, error: boolean }) => error ? [] : data));
  }

  public getAllCurrencies(filters: FilterOptions = new FilterOptions()): Observable<Currency[]> {
    const params = filters.getParams();
    params['page[size]'] = '0';

    this.currenciesApiService.apiGetCurrencies(params).subscribe(
      ({ data, error }: { data: any, error: boolean }) => {
        if (error) {
          this.onLoadCurrenciesSubject$.next([]);
        } else {
          this.onLoadCurrenciesSubject$.next(data);
        }
      }
    );
    return this.onLoadCurrencies$;
  }

  public getSettings(): Observable<CurrencySettings> {
    return this.currenciesApiService.apiGetSettings().pipe(
      map(({ data, error }: { data: any, error: boolean }) => error ? null : data));
  }

  public createNewCurrency(currency: CurrencyInterface): Observable<boolean> {
    return this.currenciesApiService.apiCreateNewCurrency(currency).pipe(
      map(({ data, error }: { data: any, error: boolean }) => !error));
  }
}
