/**
 * @license
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders as Headers, HttpParams, } from '@angular/common/http';
import { ApiCallerService } from '../api-caller.service';
import { ConfigService } from '@app/config.service';
import { Currency, CurrencySettings } from '@models/currency-model';
import { CurrencyInterface } from '@interfaces/currency-interface';
import { CallResponceInterface } from '@interfaces/callResponce.interface';

@Injectable()
export class CurrenciesApiService {
  public constructor(
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService
  ) {
  }

  public apiUpdateSettings(settings: CurrencySettings): Observable<any> {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.patch(
        this.configService.config.api.currency.settings,
        {
          data: settings
        },
        { headers }
      )
    ), 'apiUpdateSettings');
  }

  public apiUpdateCurrencies(currencies: Set<Currency>): Observable<any> {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.patch(
        this.configService.config.api.currency.currenciesAdmin,
        { data: Array.from(currencies.values()) },
        { headers }
      )
    ), 'apiUpdateCurrencies');
  }

  public apiGetCurrencies(params: {} = new HttpParams()): Observable<any> {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.currency.currenciesAdmin,
        { headers, params }
      )
    ), 'apiGetCurrencies');
  }

  public apiGetUserCurrencies(params: {} = new HttpParams()): Observable<any> {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.currency.currencies,
        { headers, params }
      )
    ), 'apiGetUserCurrencies');
  }

  public apiGetSettings(): Observable<any> {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.currency.settings,
        { headers }
      )
    ), 'apiGetSettings');
  }

  public apiCreateNewCurrency(currency: CurrencyInterface): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.currency.currenciesAdmin, currency
      )
    ), 'apiCreateNewCurrency');
  }
}
