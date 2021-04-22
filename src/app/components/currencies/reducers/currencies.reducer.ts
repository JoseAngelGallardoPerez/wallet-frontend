import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as CurrenciesActions from '@app/components/currencies/actions/currencies.actions';
import { ApiError } from '@models/api-error.model';
import { PaginationPageLimitInterface } from '@interfaces/pagination-page-limit.interface';
import { PaginationService } from '@services/pagination/pagination.service';
import { Currency } from '@models/currency-model';
import { CurrenciesActionsTypes } from '@components/currencies/actions/currencies.actions';

export interface State extends EntityState<Currency> {
  loading: boolean;
  saved: boolean;
  errors: ApiError[];
  filter: any;
  pagination: PaginationPageLimitInterface;
}

export const defaultCurrencyFilter: any = {
  'page[size]': '0'
};

export const adapter: EntityAdapter<Currency> = createEntityAdapter<Currency>({
  selectId: (currency: Currency) => currency.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  saved: false,
  errors: [],
  filter: defaultCurrencyFilter,
  pagination: PaginationService.defaultPaginationPageLimit
});

export function reducer(
  state = initialState,
  action: CurrenciesActions.CurrenciesActionsUnion
): State {
  switch (action.type) {
    case CurrenciesActionsTypes.LOAD_CURRENCIES:
      return {
        ...state,
        filter: action.filter ? action.filter : state.filter,
        loading: true,
        errors: []
      };
    case CurrenciesActionsTypes.LOAD_CURRENCIES_SUCCESS:
      return {
        ...adapter.addAll(action.currencies, state),
        loading: false
      };
    case CurrenciesActionsTypes.LOAD_CURRENCIES_FAILURE:
    default: {
      return state;
    }
  }
}

const { selectAll } = adapter.getSelectors();

export const selectAllCurrencies = selectAll;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.errors;

export const getCurrenciesFilter = (state: State) => state.filter;

export const getCurrenciesPagination = (state: State) => state.pagination;
