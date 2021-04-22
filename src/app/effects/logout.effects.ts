import { Injectable, NgZone } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { LogoutActions } from '@app/actions';
import { exhaustMap, filter, mergeMap, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import * as FromLogout from '@app/reducers/app.reducer';
import { NotificationsService } from 'angular2-notifications';
import { AppOptionsService } from '@services/appOptions.service';
import { optionsValuesNames } from '@app/core/constants/optionsPrefixes';
import { Router } from '@angular/router';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AutoLogoutPopupService } from '@services/auto-logout-popup.service';
import { SessionService } from '@services/session.service';

@Injectable()
export class LogoutEffects {

  @Effect()
  extendApplicationTimeout$ = (): Observable<Action> =>
    this.actions$.pipe(
      ofType<LogoutActions.ExtendLogoutTimer>(LogoutActions.AutoLogoutActionsTypes.EXTEND_LOGOUT_TIMER),
      withLatestFrom(this.store.pipe(select(FromLogout.getLogOutIsLoggedIn))),
      filter(([, isLoggedIn]: [undefined, boolean]) => isLoggedIn),
      switchMap((action) => {
        this.session.resetLastActivity();

        return this.appOptionService.getOptionsValuePipe(optionsValuesNames.AUTO_LOGOUT_TIMEOUT).pipe(
          filter((timeout: string | undefined): boolean => timeout !== undefined),
          take(1),
          mergeMap((timeout: string) => timer(parseInt(timeout, 10) * 60 * 1000)),
        );
      }),
      withLatestFrom(this.store.pipe(select(FromLogout.getLogOutIsLoggedIn)),
        this.appOptionService.getOptionsValuePipe(optionsValuesNames.AUTO_LOGOUT_PADDING),
        this.appOptionService.getOptionsValuePipe(optionsValuesNames.AUTO_LOGOUT_MESSAGE),
        this.appOptionService.getOptionsValuePipe(optionsValuesNames.AUTO_LOGOUT_STATUS).pipe(filter(a => a !== undefined)),
      ),
      tap(([, isLoggedIn, autoLogoutPadding, beforeLogoutMessage, status]: [undefined, boolean, string, string, boolean]) => {
        if ((isLoggedIn && status && autoLogoutPadding && this.session.isLastActivityExpired(autoLogoutPadding)) && !this.auth.isAdmin()) {
          this.autoLogoutPopupService.showPopup(beforeLogoutMessage, autoLogoutPadding);
        }
      }),
      mergeMap(([, isLoggedIn, autoLogoutPadding]) =>
        timer(parseInt(autoLogoutPadding, 10) * 1000)
      ),
      withLatestFrom(
        this.store.pipe(select(FromLogout.getLogOutIsLoggedIn)),
        this.appOptionService.getOptionsValuePipe(optionsValuesNames.AUTO_LOGOUT_PADDING),
        this.appOptionService.getOptionsValuePipe(optionsValuesNames.AUTO_LOGOUT_STATUS).pipe(filter(a => a !== undefined)),
        this.appOptionService.getOptionsValuePipe(optionsValuesNames.AUTO_LOGOUT_INACTIVITY_MESSAGE).pipe(filter(a => a !== undefined)),
        this.autoLogoutPopupService.userConfirm.asObservable(),
      ),
      map(([, isLoggedIn, autoLogoutPadding, status, message, userConfirm]: [undefined, boolean, string, boolean, string, boolean]) => {
        if (!userConfirm && !this.auth.isAdmin() && isLoggedIn && status && this.session.isLastActivityExpired(autoLogoutPadding)) {
          this.auth.logOut();
          this.notificationsService.success(
            message,
            null,
            {
              timeOut: 0,
              showProgressBar: false,
              pauseOnHover: true,
              clickToClose: true
            });

          return new LogoutActions.ExtendLogoutTimer();
        } else {
          return !this.auth.isAdmin() ? new LogoutActions.ExtendLogoutTimer() : new LogoutActions.ClearLogoutTimer();
        }
      })
    )

  @Effect()
  logOut = (): Observable<Action> =>
    this.actions$.pipe(
      ofType<LogoutActions.LogOut>(LogoutActions.AutoLogoutActionsTypes.LOG_OUT),
      exhaustMap(() => fromPromise(this.router.navigateByUrl('/'))),
      map(() => {
        return new LogoutActions.ExtendLogoutTimer();
      })
    )

  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private store: Store<FromLogout.LogoutState>,
    private notificationsService: NotificationsService,
    private autoLogoutPopupService: AutoLogoutPopupService,
    private router: Router,
    private ngZone: NgZone,
    private appOptionService: AppOptionsService,
    private session: SessionService,
  ) {
  }
}
