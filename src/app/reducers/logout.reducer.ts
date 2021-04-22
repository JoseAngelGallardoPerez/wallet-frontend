import { Action } from '@ngrx/store';
import { initialAutoLogoutState, reducer, State } from '@app/actions/logout.actions';

export function logoutReducer(state: State = initialAutoLogoutState, action: Action): State {
  return reducer(state, action);
}

export const getIsLoggedIn = (state: State) => state.isLoggedIn;

export const getIsAutoLogout = (state: State) => state.isAutoLogout;
