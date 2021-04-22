/**
 * @license
 * Copyright iKantam LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AppOptionsService } from '@services/appOptions.service';
import { Observable, of } from 'rxjs';
import { optionsValuesNames } from '@app/core/constants/optionsPrefixes';
import { catchError, filter, first, map, take } from 'rxjs/operators';
import { DATEPICKER_BASE_OPTIONS } from '@app/core/constants/datepickerBaseOptions';

@Injectable()
export class DatepickerBaseOptionsResolver implements Resolve<object> {
  constructor(
    private appOptionService: AppOptionsService
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    return this.appOptionService.getOptionsValuePipe(optionsValuesNames.DEFAULT_DATE_FORMAT)
      .pipe(
        take(2),
        filter((value: string | boolean): boolean => value !== undefined),
        map((displayFormat: string): object => Object.assign({},
          DATEPICKER_BASE_OPTIONS,
          { displayFormat })),
        first(),
        catchError(() => of(null))
      );
  }
}
