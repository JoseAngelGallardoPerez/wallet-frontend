import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiErrorService } from '@services/apiError.service';
import { APPLICATION_CONFIG } from '@environments/application-config';
import { parse, UrlWithStringQuery } from 'url';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  private static blackListUrls: string[] = [
    APPLICATION_CONFIG.api.auth.refreshToken,
    APPLICATION_CONFIG.api.auth.logout
  ];

  private static blackListSuccess: string[] = [
    APPLICATION_CONFIG.api.asynchronous.jobs(''),
  ];

  constructor(private errorService: ApiErrorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(() => {
        const url: UrlWithStringQuery = parse(req.url);
        const blackSuccessPath = url.path.substring(0, url.path.lastIndexOf('/') + 1);
        if (!ApiErrorInterceptor.blackListSuccess.includes(blackSuccessPath)) {
          this.errorService.handleSuccessResponse();
        }
      }, (res: HttpErrorResponse) => {
        const url: UrlWithStringQuery = parse(req.url);
        if (!ApiErrorInterceptor.blackListUrls.includes(url.path)) {
          this.errorService.handleErrorResponse(res);
        }
      }
    ));
  }
}
