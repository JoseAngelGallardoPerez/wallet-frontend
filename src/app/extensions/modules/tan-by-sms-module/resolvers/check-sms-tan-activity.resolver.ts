import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ExtensionSmsTanService } from '@extensions/modules/tan-by-sms-module/services/extension-sms-tan.service';
import { Observable } from 'rxjs';

@Injectable()
export class CheckSmsTanActivityResolver implements Resolve<boolean> {

  constructor(
    private extensionsTanService: ExtensionSmsTanService,
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.extensionsTanService.checkSmsTanActivity();
  }
}
