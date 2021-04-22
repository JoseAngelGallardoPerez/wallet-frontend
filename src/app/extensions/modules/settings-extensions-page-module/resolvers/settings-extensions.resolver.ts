import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { SecurityQuestion } from '@models/security-question.model';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ExtensionsApiService } from '@extensions/services/extensions-api.service';

@Injectable()
export class SettingsExtensionsResolver implements Resolve<SecurityQuestion[]> {

  constructor(
    private extensionsApi: ExtensionsApiService,
    private router: Router,
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.extensionsApi.apiGetExtensionsList().pipe(
      map((data: CallResponceInterface) => {
        if (!data.error) {
          return data.data;
        } else {
          this.router.navigate(['not-found']);
        }
      }),
      first(),
    );
  }
}
