import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RefreshTokenService } from '@services/refreshToken.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { ConfigService } from '@app/config.service';
import { catchError, mergeMap } from 'rxjs/operators';
import * as UserPermissionsActions from '@app/actions/permission.actions';
import { Store } from '@ngrx/store';
import * as FromApp from '@app/reducers/app.reducer';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptorService {

  constructor(public jwtHelper: JwtHelperService,
              private tokenService: RefreshTokenService,
              private configService: ConfigService,
              private auth: AuthService,
              private permissionsStore: Store<FromApp.UserPermissionsState>,
              private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = this.auth.getAccessToken();
    const tokenIsExpired = token ? this.jwtHelper.isTokenExpired(token) : true;

    const refreshToken: string | null = this.auth.getRefreshToken();
    const refreshTokenIsExpired = refreshToken ? this.jwtHelper.isTokenExpired(refreshToken) : true;
    if (this.auth.isAuthenticated() && refreshTokenIsExpired) {
      this.auth.logOut();
      this.router.navigate(['/sign-in']);
      return;
    }

    if (this.auth.isAuthenticated()
      && tokenIsExpired
      && !this.tokenService.isProcessing()
      && request.url !== this.configService.config.api.auth.refreshToken
    ) {
      this.tokenService.setProcessing(true);
      if (this.auth.isAdmin()) {
        this.permissionsStore.dispatch(new UserPermissionsActions.LoadUserPermissions());
      }
      return this.auth.refreshAccessToken().pipe(
        mergeMap(
          (res: any) => {
            if (!this.auth.saveToken(res)) {
              this.auth.logOut();
            }
            this.tokenService.publish(res);
            this.tokenService.setProcessing(false);
            return next.handle(request);
          }),
        catchError(() => {
          this.tokenService.publish({});
          this.tokenService.setProcessing(false);
          this.auth.logOut();
          return next.handle(request);
        }));
    } else if (request.url === this.configService.config.api.auth.refreshToken) {
      return next.handle(request);
    }

    if (this.tokenService.isProcessing()) {
      return this.tokenService.storage.pipe(
        mergeMap(
          () => {
            return next.handle(request);
          })
      );
    } else {
      return next.handle(request);
    }
  }

}
