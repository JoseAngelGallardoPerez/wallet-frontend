import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ExtensionSmsTanService } from '@extensions/modules/tan-by-sms-module/services/extension-sms-tan.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ExtensionSmsTanActivityGuard implements CanActivate {

  constructor(
    private extensionsTanService: ExtensionSmsTanService,
    private router: Router,
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.extensionsTanService.checkSmsTanActivity().pipe(
      map((isActive: boolean) => {
        if (!isActive) {
          this.router.navigate(['settings']);
        }
          return true;
      })
    );
  }
}
