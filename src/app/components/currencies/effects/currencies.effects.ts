import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { asyncScheduler, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, skip, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';

import * as CurrenciesActions from '../actions/currencies.actions';
import { ErrorHandlerService } from '@services/error-handler.service';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { ApiError } from '@models/api-error.model';
import * as FromCurrencies from '../../currencies/reducers';
import { Currency } from '@models/currency-model';
import { CurrenciesApiService } from '@services/currencies/currencies-api.service';

@Injectable()
export class CurrenciesEffects {

  @Effect()
  loadCurrencies$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<CurrenciesActions.LoadCurrencies>(CurrenciesActions.CurrenciesActionsTypes.LOAD_CURRENCIES),
      debounceTime(debounce, scheduler),
      withLatestFrom(this.store.pipe(select(FromCurrencies.getCurrenciesFilter))),
      map(([action, filter]): any => filter),
      switchMap((filters: any) => {
        const nextSearch$ = this.actions$.pipe(
          ofType(CurrenciesActions.CurrenciesActionsTypes.LOAD_CURRENCIES),
          skip(1)
        );
        return this.apiService.apiGetUserCurrencies(filters).pipe(
          takeUntil(nextSearch$),
          map(({ data, error }: CallResponceInterface) => {
            if (error) {
              return new CurrenciesActions
                .LoadCurrenciesFailure(<ApiError[]>data);
            }
            const currencies: Currency[] = (<Currency[]>data).map((item) => new Currency(item));
            return new CurrenciesActions.LoadCurrenciesSuccess(currencies);
          }),
          catchError(err => of(new CurrenciesActions
            .LoadCurrenciesFailure(ErrorHandlerService.generateApiErrors(err))))
        );
      })
    )

  constructor(
    private actions$: Actions,
    private store: Store<FromCurrencies.CurrenciesState>,
    private apiService: CurrenciesApiService) {
  }
}
