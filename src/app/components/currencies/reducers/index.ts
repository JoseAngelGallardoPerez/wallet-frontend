import * as FromCurrencies from '@components/currencies/reducers/currencies.reducer';
import { State as RootState } from '@app/reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface CurrenciesState {
  currencies: FromCurrencies.State;
}

export interface State extends RootState {
  currencies: CurrenciesState;
}

export const currenciesReducers: ActionReducerMap<CurrenciesState, any> = {
  currencies: FromCurrencies.reducer,
};

export const getCurrenciesState = createFeatureSelector<State, CurrenciesState>('currencies');

// Currencies

export const getCurrenciesEntitiesState = createSelector(
  getCurrenciesState,
  state => state.currencies
);

export const getCurrencies: any = createSelector(
  getCurrenciesEntitiesState,
  FromCurrencies.selectAllCurrencies
);

export const getCurrenciesFilter: any = createSelector(
  getCurrenciesEntitiesState,
  FromCurrencies.getCurrenciesFilter
);

export const getCurrenciesLoading = createSelector(
  getCurrenciesEntitiesState,
  FromCurrencies.getLoading
);
