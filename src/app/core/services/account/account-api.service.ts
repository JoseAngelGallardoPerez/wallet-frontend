/**
 * @license
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders as Headers, HttpResponse } from '@angular/common/http';
import { AccountInterface } from '@interfaces/account-interface';
import { ApiCallerService } from '../api-caller.service';
import { AccountFilterInterface } from '@interfaces/account-filter-interface';
import { ConfigService } from '@app/config.service';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';
import { map } from 'rxjs/operators';
import { FileDownloadModel } from '@models/file-download.model';

@Injectable()
export class AccountApiService {

  /**
   * AccountApiService constructor.
   * @param {HttpClient} http
   * @param {ApiCallerService} apiCallerService
   * @param configService
   */
  public constructor(
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService
  ) {
  }

  /**
   * Create a new accounts
   * @param {AccountInterface} account
   * @returns {Observable<any>}
   */
  public apiCreateAccount(account: AccountInterface) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.account.accounts,
        account,
        { headers }
      )
    ), 'apiCreateAccount');
  }

  /**
   * Update an existing accounts
   * @param {AccountInterface} account
   * @returns {Observable<any>}
   */
  public apiUpdateAccount(account: AccountInterface) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.put(
        this.configService.config.api.account.accountById(account.id),
        account,
        { headers }
      )
    ), 'apiUpdateAccount');
  }

  /**
   * Load single account
   * @param {string} id
   * @returns {Observable<any>}
   */
  public apiLoadAccount(id: number) {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.account.accountById(id),
        { headers }
      )
    ), 'apiLoadAccount');
  }

  /**
   * Load accounts
   * @returns {Observable<any>}
   */
  public apiLoadAccounts(filter: AccountFilterInterface, include: string = 'type,user') {
    const headers = new Headers();

    const params = this.getParamsFromFilter(filter, include);

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.account.accounts,
        {
          params, headers
        }
      )
    ), 'apiLoadAccounts');
  }

  /**
   * Load accounts
   * @returns {Observable<any>}
   */
  public apiLoadAdminAccounts(params: { [key: string]: string }): Observable<any> {

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.account.adminAccounts,
        {
          params
        }
      )
    ), 'apiLoadAccounts');
  }

  /**
   * Load accounts by user id for admin
   * @param {string} userId
   * @param limit
   * @param ignoreBlocked
   * @returns {Observable<any>}
   */
  public apiLoadAdminAccountsByUserId(userId: string, limit?: number, ignoreBlocked: boolean = true) {
    const params = {
      include: 'type',
    };

    if (ignoreBlocked) {
      params['filter[isActive]'] = ignoreBlocked;
    }

    if (limit) {
      params['page[size]'] = limit;
    }

    if (userId !== null) {
      params['filter[userId]'] = userId;
    }

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.account.adminAccounts,
        { params }
      )
    ), 'apiLoadAdminAccountsByUserId');
  }

  /**
   * Generate account number
   * @returns {Observable<any>}
   */
  public apiGenerateAccountNumber(prefix: string) {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.account.generateAccountNumber,
        {
          prefix: prefix
        },
        { headers }
      )
    ), 'apiGenerateAccountNumber');
  }

  /**
   * Import accounts from csv
   * @returns {Observable<any>}
   */
  public apiImportAccountsFromCsv(csv: FormData) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.account.importAccountsFromCsv,
        csv,
        { headers }
      )
    ), 'apiImportAccountsFromCsv');
  }

  /**
   * @returns {Observable<any>}
   */
  public apiExportAccountsToCsv(params: { [key: string]: string }) {

    return this.http.get(
      this.configService.config.api.account.exportAccountsToCsv,
      {
        params,
        responseType: 'arraybuffer',
        observe: 'response'
      }
    ).pipe(
      map((res: HttpResponse<ArrayBuffer>): FileDownloadModel => {
          return new FileDownloadModel(
            new Blob([res.body], { type: 'text/csv' }),
            res.headers.get('Content-Disposition').split(';')[1].trim().split('=')[1]
          );
        }
      )
    );
  }

  /**
   * @param filter
   * @param include
   */
  private getParamsFromFilter(filter: AccountFilterInterface, include: string = null): {} {
    const params = {
      sort: filter.sort ? filter.sort : '',
    };

    if (filter.numberContains) {
      params['filter[numberContains]'] = filter.numberContains;
    }
    if (filter.accountTypeId) {
      params['filter[typeId]'] = filter.accountTypeId;
    }
    if (filter.accountTypeCurrencyCode) {
      params['filter[accountType.currencyCode]'] = filter.accountTypeCurrencyCode;
    }

    if (filter.isActive) {
      params['filter[isActive]'] = filter.isActive;
    }
    if (filter.userId !== undefined) {
      params['filter[userId]'] = filter.userId;
    }
    if (filter.allowDeposits !== undefined) {
      params['filter[allowDeposits]'] = filter.allowDeposits.toString();
    }
    if (filter.typeCurrencyCode !== undefined) {
      params['filter[accountType.currencyCode]'] = filter.typeCurrencyCode;
    }
    if (filter.createdAtFrom) {
      params['filter[createdAtFrom]'] = moment(filter.createdAtFrom).startOf('day').utc().format();
    }
    if (filter.createdAtTo) {
      params['filter[createdAtTo]'] = moment(filter.createdAtTo).endOf('day').utc().format();
    }
    if (filter.isIwtInstructionsAvailable) {
      params['filter[isIwtInstructionsAvailable]'] = filter.isIwtInstructionsAvailable;
    }
    if (filter.pageSize !== undefined) {
      params['page[size]'] = filter.pageSize;
    }
    if (filter.pageNumber) {
      params['page[number]'] = filter.pageNumber;
    }
    if (include) {
      params['include'] = include;
    }

    return params;
  }
}
