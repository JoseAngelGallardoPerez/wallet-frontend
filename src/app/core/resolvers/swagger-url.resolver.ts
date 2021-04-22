/**
 * @license
 * Copyright iKantam LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class SwaggerUrlResolver implements Resolve<string> {
  constructor() {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
    return new Promise(() => {
      window.open(environment.apiHost + state.url, '_self');
    });
  }
}
