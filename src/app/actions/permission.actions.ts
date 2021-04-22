import { CustomActionInterface, staticImplementsDecorator } from '@interfaces/staticAction.interface';
import { Action } from '@ngrx/store';
import { buildReducer, checkToBeUniqueType } from '@helpers/redux-type-cashe';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserPermissionModel } from '@models/userPermission.model';

export interface State extends EntityState<UserPermissionModel> {
  loading: boolean;
}

export const userPermissionsAdapter: EntityAdapter<UserPermissionModel> = createEntityAdapter<UserPermissionModel>({
  selectId: (options: UserPermissionModel) => options.actionKey,
});

export const initialUserPermissionState: State = userPermissionsAdapter.getInitialState({
  loading: false,
});

export enum UserPermissionActionsTypes {
  LOAD_PERMISSIONS = '[Permissions] load user permissions',
  LOAD_PERMISSIONS_SUCCESS = '[Permissions] load user permissions success',
  LOAD_PERMISSIONS_FAILURE = '[Permissions] load user permissions failure'
}

@staticImplementsDecorator<CustomActionInterface<LoadUserPermissions, State>>()
export class LoadUserPermissions implements Action {
  static type = checkToBeUniqueType(UserPermissionActionsTypes.LOAD_PERMISSIONS);
  readonly type = UserPermissionActionsTypes.LOAD_PERMISSIONS;

  static reduce(state: State, action: LoadUserPermissions): State {
    return {
      ...state,
      loading: true,
    };
  }

  constructor() {
  }
}

@staticImplementsDecorator<CustomActionInterface<LoadUserPermissionsSuccess, State>>()
export class LoadUserPermissionsSuccess implements Action {
  static type = checkToBeUniqueType(UserPermissionActionsTypes.LOAD_PERMISSIONS_SUCCESS);
  readonly type = UserPermissionActionsTypes.LOAD_PERMISSIONS_SUCCESS;

  static reduce(state: State, action: LoadUserPermissionsSuccess): State {
    return {
      ...userPermissionsAdapter.upsertMany(action.permissions, state),
      loading: false
    };
  }

  constructor(public permissions: UserPermissionModel[]) {
  }
}

@staticImplementsDecorator<CustomActionInterface<LoadUserPermissionsFailure, State>>()
export class LoadUserPermissionsFailure implements Action {
  static type = checkToBeUniqueType(UserPermissionActionsTypes.LOAD_PERMISSIONS_FAILURE);
  readonly type = UserPermissionActionsTypes.LOAD_PERMISSIONS_FAILURE;

  static reduce(state: State, action: LoadUserPermissionsFailure): State {
    userPermissionsAdapter.removeAll(state);
    return {
      ...userPermissionsAdapter.addAll(action.permissions || [], state),
    };
  }

  constructor(public permissions?: UserPermissionModel[]) {
  }
}

export const reducer = buildReducer(LoadUserPermissions,
  LoadUserPermissionsSuccess,
  LoadUserPermissionsFailure);
