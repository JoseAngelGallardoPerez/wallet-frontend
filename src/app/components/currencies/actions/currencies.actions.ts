import { Action } from '@ngrx/store';
import { ApiError } from '@models/api-error.model';
import { Currency } from '@models/currency-model';

export enum CurrenciesActionsTypes {
  LOAD_CURRENCIES = '[Currencies] Load currencies',
  LOAD_CURRENCIES_SUCCESS = '[Currencies/API] Load currencies Success',
  LOAD_CURRENCIES_FAILURE = '[Currencies/API] Load currencies Failure',
}

export class LoadCurrencies implements Action {
  readonly type = CurrenciesActionsTypes.LOAD_CURRENCIES;

  constructor(public filter?: any) {
  }
}

export class LoadCurrenciesSuccess implements Action {
  readonly type = CurrenciesActionsTypes.LOAD_CURRENCIES_SUCCESS;

  constructor(public currencies: Currency[]) {
  }
}

export class LoadCurrenciesFailure implements Action {
  readonly type = CurrenciesActionsTypes.LOAD_CURRENCIES_FAILURE;

  constructor(public errors: ApiError[]) {
  }
}

export type CurrenciesActionsUnion = LoadCurrencies | LoadCurrenciesSuccess | LoadCurrenciesFailure;
