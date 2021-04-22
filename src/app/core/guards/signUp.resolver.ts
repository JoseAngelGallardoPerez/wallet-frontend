import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppOptionsService } from '@services/appOptions.service';
import { optionsValuesNames } from '@app/core/constants/optionsPrefixes';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class SignUpResolver implements CanActivate {

  constructor(
    private appOptionService: AppOptionsService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.appOptionService.getOptionsValuePipe(optionsValuesNames.USER_REGISTER).pipe(
      filter((value: string) => value !== undefined),
      map((value: string): boolean => value === 'enable'),
      tap((enabled: boolean) => {
        if (environment.envName === 'demo') {
          return true;
        }
        if (!enabled) {
          this.router.navigate(['not-found']);
        }
      })
    );
  }
}
