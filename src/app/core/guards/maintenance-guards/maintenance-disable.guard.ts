import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { optionsValuesNames } from '@constants/optionsPrefixes';
import { AppOptionsService } from '@services/appOptions.service';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class MaintenanceDisableGuard implements CanActivate {

  constructor(
    private appOptionService: AppOptionsService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.appOptionService.getOptionsValuePipe(optionsValuesNames.MAINTENANCE).pipe(
      filter((value: string) => value !== undefined),
      map((value: string): boolean => value === 'enable'),
      map((enabled: boolean) => {
        if (!enabled) {
          this.router.navigate(['sign-in']);
        }
        return true;
      })
    );

  }
}
