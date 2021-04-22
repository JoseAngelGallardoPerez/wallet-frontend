import { Action } from '@ngrx/store';
import { initialSiteTextState, reducer, siteTextAdapter, State } from '@app/actions/siteText.actions';

export function siteTextsReducer(state: State = initialSiteTextState, action: Action): State {
  return reducer(state, action);
}

const { selectEntities, selectAll } = siteTextAdapter.getSelectors();

export const selectAllSiteTextSelector = selectAll;

export const selectSiteTextEntitiesSelector = selectEntities;

export const getLoading = (state: State) => state.loading;

export const getErrors = (state: State) => state.errors;
