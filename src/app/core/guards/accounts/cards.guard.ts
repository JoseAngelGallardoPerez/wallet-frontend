import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppOptionsService } from '@services/appOptions.service';
import { optionsValuesNames } from '@app/core/constants/optionsPrefixes';
import { filter, map, tap } from 'rxjs/operators';

@Injectable()
export class AccountsCardsGuard implements CanActivate {

  constructor(
    private appOptionService: AppOptionsService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.appOptionService.getOptionsValuePipe(optionsValuesNames.CARD_MODULE).pipe(
      filter((value: string): boolean => !!value),
      map((value: string): boolean => value === 'enable'),
      tap((enabled: boolean) => {
        if (!enabled) {
          this.router.navigate(['not-found']);
        }
      })
    );
  }
}
