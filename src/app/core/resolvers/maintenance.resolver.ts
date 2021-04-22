import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { OptionsApiService } from '@services/options/options-api.service';
import { OptionsPaths } from '@constants/optionsPrefixes';

@Injectable()
export class MaintenanceResolver implements Resolve<any>  {

    constructor(
    private optionsApiService: OptionsApiService,
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.optionsApiService.apiLoadOptions(OptionsPaths.REGIONAL_GENERAL, true ).pipe(
      tap((data: any) => {
      }),
      first()
    );
  }
}
