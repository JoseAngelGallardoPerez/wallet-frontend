import { LogoutActions, SiteTextActions, UserPermissionsActions } from '@app/actions';
import { State as RootState } from '@app/reducers/index';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { getIsLoggedIn, logoutReducer } from '@app/reducers/logout.reducer';
import { selectUserPermissionsEntitiesSelector, userPermissionsReducer } from '@app/reducers/permission.reducer';
import * as FromSiteText from '@app/reducers/siteText.reducer';

export interface LogoutState {
  logOut: LogoutActions.State;
}

export interface UserPermissionsState {
  userPermissions: UserPermissionsActions.State;
}

export interface SiteTextState {
  siteTexts: SiteTextActions.State;
}

export interface State extends RootState {
  logOut: LogoutState;
  userPermissions: UserPermissionsState;
  siteTexts: SiteTextState;
}

export const logoutReducers: ActionReducerMap<LogoutState, any> = {
  logOut: logoutReducer,
};

export const userPermissionsReducers: ActionReducerMap<UserPermissionsState, any> = {
  userPermissions: userPermissionsReducer,
};

export const siteTextsReducers: ActionReducerMap<SiteTextState, any> = {
  siteTexts: FromSiteText.siteTextsReducer,
};

export const getLogOutState = createFeatureSelector<State, LogoutState>('logOut');

export const getUserPermissionsFutureState = createFeatureSelector<State, UserPermissionsState>('userPermissions');

export const getSiteTextsFutureState = createFeatureSelector<State, SiteTextState>('siteTexts');

export const getLogOutEntitiesState = createSelector(
    getLogOutState,
    state => state.logOut
);

export const getLogOutIsLoggedIn: any = createSelector(
    getLogOutEntitiesState,
    getIsLoggedIn
);

// User Permissions

export const getUserPermissionsState = createSelector(
  getUserPermissionsFutureState,
  state => state.userPermissions
);

export const selectUserPermissionsEntities = createSelector(
  getUserPermissionsState,
  selectUserPermissionsEntitiesSelector
);

export const getUserPermissionForKey = (key: string): any => {
  return createSelector(
    selectUserPermissionsEntities,
    () => key,
    (entities, id) => entities[id]
  );
};

// site Texts

export const getSiteTextState = createSelector(
  getSiteTextsFutureState,
  state => state.siteTexts
);

export const selectAllSiteTexts: any = createSelector(
  getSiteTextState,
  FromSiteText.selectAllSiteTextSelector
);

export const selectSiteTextEntities = createSelector(
  getSiteTextState,
  FromSiteText.selectSiteTextEntitiesSelector
);

export const getSiteTextForKey = (key: string) => {
  return createSelector(
    selectSiteTextEntities,
    () => key,
    (entities, id) => entities[id]
  );
};

export const selectSiteTextsLoading: any = createSelector(
  getSiteTextState,
  FromSiteText.getLoading
);

export const selectSiteTextsErrors: any = createSelector(
  getSiteTextState,
  FromSiteText.getErrors
);
