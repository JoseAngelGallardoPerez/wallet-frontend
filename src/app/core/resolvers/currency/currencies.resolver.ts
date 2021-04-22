/**
 * @license
 * Copyright iKantam LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, } from '@angular/router';
import { CurrenciesService } from '@services/currencies/currencies.service';
import { FilterOptions } from '@app/core/shared/filter-options';
import { Currency } from '@models/currency-model';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

export enum CurrenciesFilter {
  Active,
  ActiveCrypto,
}

@Injectable()
export class CurrenciesResolver implements Resolve<Currency[]> {
  constructor(
    private currenciesService: CurrenciesService,
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<Currency[]> {
    const filters: FilterOptions = new FilterOptions();
    filters.setSort('type');
    switch (route.data.currenciesFilters) {
      case CurrenciesFilter.Active:
        filters.addFilter('active', ['true']);
        break;
      case CurrenciesFilter.ActiveCrypto:
        filters.addFilter('active', ['true']);
        filters.addFilter('type', ['crypto']);
        break;
    }

    return this.currenciesService.getAllCurrencies(filters).pipe(first());
  }
}
