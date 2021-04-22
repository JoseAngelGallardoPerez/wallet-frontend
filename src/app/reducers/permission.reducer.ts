import { Action } from '@ngrx/store';
import { userPermissionsAdapter,  reducer, State, initialUserPermissionState } from '@app/actions/permission.actions';

export function userPermissionsReducer(state: State = initialUserPermissionState, action: Action): State {
  return reducer(state, action);
}

const { selectEntities } = userPermissionsAdapter.getSelectors();

export const selectUserPermissionsEntitiesSelector = selectEntities;

export const getUserPermissionsLoading = (state: State) => state.loading;
