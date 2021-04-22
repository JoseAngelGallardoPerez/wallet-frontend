/**
 * @license
 * Copyright iKantam LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { AccountInterface } from '@interfaces/account-interface';
import { AccountService } from '@services/account/account.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AccountsResolver implements Resolve<AccountInterface[]> {
  constructor(
    private accountService: AccountService,
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccountInterface[]> {
    return this.accountService.loadAccounts().pipe(take(1));
  }
}
