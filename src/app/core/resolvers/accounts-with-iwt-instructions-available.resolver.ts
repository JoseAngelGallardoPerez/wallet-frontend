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
import { AuthService } from '@services/auth/auth.service';

@Injectable()
export class AccountsWithIwtInstructionsAvailableResolver implements Resolve<AccountInterface[]> {
  constructor(
    private accountService: AccountService,
    private auth: AuthService,
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccountInterface[]> {
    return this.auth.isAdmin() ? null : this.accountService.loadAccountsWithIwtInstructionsAvailable().pipe(take(1));
  }
}
