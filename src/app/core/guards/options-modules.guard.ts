import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { optionsValuesNames } from '@constants/optionsPrefixes';
import { AppOptionsService } from '@services/appOptions.service';

@Injectable()
export class OptionsModulesGuard implements CanActivate {

  constructor(
    private appOptionService: AppOptionsService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return combineLatest(route.data['options'].map((key: optionsValuesNames) => this.appOptionService.getOptionsValuePipe(key)))
      .pipe(
        map((values: [boolean | string]): boolean[] => values.map((value: string) => value === 'enable')),
        map((enabled: boolean[]) => {
          const isAllowed: boolean = !enabled.includes(false);
          if (!isAllowed) {
            this.router.navigate([route.data['redirectTo'] || 'not-found']);
          }
          return isAllowed;
        })
      );
  }
}
