import { Inject, Injectable } from '@angular/core';
import { JWT_OPTIONS, JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '@app/config.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';
import { TEMP_AUTH_HEADER_NAME } from '@constants/signUp';
import { parse, UrlWithStringQuery } from 'url';

@Injectable()
export class AuthHeaderInterceptor extends JwtInterceptor {
  public headerName = 'Authorization';
  public authScheme = 'Bearer';

  private urlsNotNeedClone: string[] = [
    this.configService.config.api.auth.refreshToken,
    this.configService.config.api.message.unread,
  ];

  constructor(
    private configService: ConfigService,
    jwtHelper: JwtHelperService,
    @Inject(JWT_OPTIONS) config: any,
    private auth: AuthService,
    private router: Router,
  ) {
    super(config, jwtHelper);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const anotherApi = req.url.match(/^https?:\/\/|^\.\/assets\//ig);
    let request: HttpRequest<any>;
    if (!anotherApi) {
      request = req.clone({
        url: this.configService.config.endpoint + req.url

      });
    } else {
      request = req.clone();
    }

    const token: any = this.tokenGetter();
    if (token instanceof Promise) {
      return fromPromise(token).pipe(
        mergeMap((asyncToken: string) => {
          return this.handleInterception(asyncToken, request, next);
        }));
    } else {
      return this.handleInterception(token, request, next);
    }
  }

  handleInterception(token: string, request: HttpRequest<any>, next: HttpHandler) {
    if (!token && request.headers.get(TEMP_AUTH_HEADER_NAME)) {
      token = request.headers.get(TEMP_AUTH_HEADER_NAME);
      request.headers.delete(TEMP_AUTH_HEADER_NAME);
    }

    let tokenIsExpired: boolean;
    if (!token && this.throwNoTokenError) {
      throw new Error('Could not get token from tokenGetter function.');
    }

    if (this.skipWhenExpired) {
      tokenIsExpired = token ? this.jwtHelper.isTokenExpired(token) : true;
    }

    const url: UrlWithStringQuery = parse(request.url);

    if (token && tokenIsExpired && this.skipWhenExpired) {
      request = request.clone();
    } else if (
      token
      && this.isWhitelistedDomain(request)
      && !this.urlsNotNeedClone.includes(url.path)
    ) {
      request = request.clone({
        setHeaders: {
          [this.headerName]: `${this.authScheme} ${token}`
        }
      });
    }

    return next.handle(request).pipe(tap(() => {
    }, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.auth.logOut();
          this.router.navigate(['/sign-in']);
        }
      }
    }));
  }
}
