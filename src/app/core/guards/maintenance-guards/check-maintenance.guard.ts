import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { optionsValuesNames } from '@constants/optionsPrefixes';
import { AuthService } from '@services/auth/auth.service';
import { AppOptionsService } from '@services/appOptions.service';

@Injectable()
export class CheckMaintenanceGuard implements CanActivate {

  constructor(
    private appOptionService: AppOptionsService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isRoot = this.authService.isRoot();

    return this.appOptionService.getOptionsValuePipe(optionsValuesNames.MAINTENANCE).pipe(
      filter((value: string) => value !== undefined),
      map((value: string): boolean => value === 'enable'),
      map((enabled: boolean) => {
        if (enabled && !isRoot) {
          this.router.navigate(['/unavailable-message']);
          this.authService.logOut();
          return false;
        }
        return true;
      })
    );
  }
}
