import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { UserPermissionsActions } from '@app/actions';
import { PermissionGroupApiService } from '@services/permission-group/permission-group-api.service';
import { AuthService } from '@services/auth/auth.service';
import { UserPermissionModel } from '@models/userPermission.model';
import { UserPermissions } from '@constants/userPermissions';

@Injectable()
export class PermissionEffects {

  @Effect()
  loadCurrentUserPermissions$ = (): Observable<Action> =>
    this.actions$.pipe(
      ofType<UserPermissionsActions.LoadUserPermissions>(UserPermissionsActions.UserPermissionActionsTypes.LOAD_PERMISSIONS),
      exhaustMap(() => {
          return this.apiService
            .apiLoadUserPermissions(this.authService.currentUserId()).pipe(
              take(1),
              map(({ data, error }: CallResponceInterface) => {
                if (error || (data && data['items'] && data['items'].length === 0)) {
                  const permissions = Object.values(UserPermissions).map((actionKey) => new UserPermissionModel({
                    actionKey,
                    isAllowed: false
                  }));

                  return new UserPermissionsActions.LoadUserPermissionsFailure(permissions);
                }

                return new UserPermissionsActions
                  .LoadUserPermissionsSuccess((<{ items: any[] }>data).items.map((item) => new UserPermissionModel(item)));
              }),
              catchError(err => of(new UserPermissionsActions
                .LoadUserPermissionsFailure()))
            );
        }
      )
    )

  constructor(
    private actions$: Actions,
    private apiService: PermissionGroupApiService,
    private authService: AuthService,
  ) {
  }
}
