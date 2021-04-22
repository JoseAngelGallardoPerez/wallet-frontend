import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AppOptionsService } from '@services/appOptions.service';
import { Observable } from 'rxjs';

@Injectable()
export class NoPermissionGuard implements CanActivate {

  public afterRedirect: boolean;

  constructor(
    private appOptionService: AppOptionsService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.afterRedirect) {
      this.router.navigate([route.data['redirectTo'] || '/my-profile']);
    }

    return this.afterRedirect;
  }
}
