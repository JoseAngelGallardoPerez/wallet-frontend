/**
 * @license
 * Copyright iKantam LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';

import { AccountInterface } from '@interfaces/account-interface';
import { AccountModel } from '@models/account-model';
import { Observable, Subject } from 'rxjs';
import { AccountApiService } from './account-api.service';
import { PaginationService } from '@services/pagination/pagination.service';
import { PaginationPageLimitInterface } from '@interfaces/pagination-page-limit.interface';
import * as FileSaver from 'file-saver';
import { FileDownloadModel } from '@models/file-download.model';
import { exhaustMap, map } from 'rxjs/operators';
import { PaginationFieldInterface } from '@interfaces/sort-bar/paginationField.interface';
import { SortFieldInterface } from '@interfaces/sort-bar/sortField.interface';
import { QueryFieldInterface } from '@interfaces/sort-bar/queryField.interface';
import { DateToFromFieldInterface } from '@interfaces/sort-bar/dateToFromField.interface';
import { queryParamsStringify } from '@helpers/queryParamsHelpers';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';

export type AccountFilterSearchInterface = PaginationFieldInterface & SortFieldInterface
  & QueryFieldInterface & DateToFromFieldInterface & {
  accountTypeCurrencyCode?: string;
  accountTypeId?: string;
  isActive?: string;
  userId?: string;
  allowDeposits?: boolean;
};

@Injectable()
export class AccountService {
  public accountNameSubject: Subject<string> = new Subject<string>();
  /**z
   * @type {Subject<AccountInterface>}
   */
  private onCreateAccountSubject$: Subject<AccountInterface> = new Subject<AccountInterface>();
  /**
   * @type {Observable<AccountInterface>}
   */
  public onCreateAccount$: Observable<boolean> = this.onCreateAccountSubject$.asObservable()
    .pipe(exhaustMap((account: AccountInterface) => this.accountApiService.apiCreateAccount(account)),
      map(({ data, error }: { data: any, error: boolean }) => !error));
  /**
   * @type {Subject<AccountInterface>}
   */
  private onUpdateAccountSubject$: Subject<AccountInterface> = new Subject<AccountInterface>();
  /**
   * @type {Observable<AccountInterface>}
   */
  public onUpdateAccount$: Observable<boolean> = this.onUpdateAccountSubject$.asObservable()
    .pipe(
      exhaustMap((account: AccountInterface) => this.accountApiService.apiUpdateAccount(account)),
      map(({ data, error }: { data: any, error: boolean }) => !error)
    );
  /**
   * @type {Subject<any>}
   */
  private onImportAccountsSubject$: Subject<any> = new Subject<any>();
  /**
   * @type {Observable<any[]>}
   */
  public onImportAccounts$: Observable<any> = this.onImportAccountsSubject$.asObservable();

  /**
   * AccountApiService constructor.
   * @param {AccountApiService} accountApiService
   */
  public constructor(
    protected accountApiService: AccountApiService,
  ) {
  }

  public static transformParams(queryParams: AccountFilterSearchInterface, forCsv = false): { [key: string]: string } {
    const params = {
      include: ['user', 'type']
    };

    if (!forCsv) {
      params['page'] = { number: queryParams.page, size: queryParams.size };
    }

    const filter = {};

    if (queryParams.sort) {
      params['sort'] = queryParams.sort;
    }

    if (queryParams.query) {
      filter['numberContains'] = queryParams.query;
    }

    if (queryParams.dateTo) {
      filter['createdAtTo'] = moment(queryParams.dateTo).endOf('day').utc().format();
    }

    if (queryParams.dateFrom) {
      filter['createdAtFrom'] = moment(queryParams.dateFrom).startOf('day').utc().format();
    }

    if (queryParams.accountTypeId) {
      filter['typeId'] = queryParams.accountTypeId;
    }

    if (queryParams.userId) {
      filter['userId'] = queryParams.userId;
    }

    if (queryParams.accountTypeCurrencyCode) {
      filter['accountType.currencyCode'] = queryParams.accountTypeCurrencyCode;
    }

    if (queryParams.isActive) {
      filter['isActive'] = queryParams.isActive;
    }

    if (typeof queryParams.allowDeposits === 'boolean') {
      filter['allowDeposits'] = queryParams.allowDeposits;
    }

    if (Object.keys(filter).length) {
      params['filter'] = filter;
    }

    return queryParamsStringify(params, false);
  }

  /**
   * Create a new accounts
   * @param {AccountInterface} account
   * @returns {Observable<AccountInterface>}
   */
  public createAccount(account: AccountInterface): void {
    this.onCreateAccountSubject$.next(account);
  }

  /**
   * Update an existing accounts
   * @param {AccountInterface} account
   * @returns {Observable<AccountInterface>}
   */
  public updateAccount(account: AccountInterface): void {
    this.onUpdateAccountSubject$.next(account);
  }

  /**
   * Load single account
   * @param {number} id accounts's identifier
   * @returns {Observable<AccountInterface>}
   */
  public loadAccount(id: number): Observable<AccountInterface | null> {
    return this.accountApiService.apiLoadAccount(id).pipe(
      map(({ data, error }: { data: any, error: boolean }) => error ? null : new AccountModel(data)
      ));
  }

  /**
   * Load accounts list
   * @returns {Observable<AccountInterface[]>}
   */
  public loadAccounts(): Observable<AccountInterface[]> {
    return this.accountApiService.apiLoadAccounts({
      sort: 'createdAt',
      pageSize: '0',
      pageNumber: '1',
      isActive: 'true'
    }).pipe(
      map(({ data, error }: { data: any[], error: boolean, links: any }) => error ? [] : data
        .map((item) => new AccountModel(item))));
  }

  /**
   * Load accounts list
   * @returns {Observable<AccountInterface[]>}
   */
  public loadAccountsWithIwtInstructionsAvailable(include: string = 'type,user'): Observable<AccountInterface[]> {
    return this.accountApiService.apiLoadAccounts({
      sort: 'createdAt',
      pageSize: '0',
      pageNumber: '1',
      isActive: 'true',
      isIwtInstructionsAvailable: 'true'
    }, include).pipe(
      map(({ data, error }: { data: any[], error: boolean, links: any }) => error ? [] : data
        .map((item) => new AccountModel(item))));
  }

  /**
   * Load accounts list for admin
   * @returns {Observable<AccountInterface[]>}
   */
  public loadAdminAccounts(params: AccountFilterSearchInterface): Observable<{
    accounts: AccountInterface[],
    pagination: PaginationPageLimitInterface
  }> {
    return this.accountApiService.apiLoadAdminAccounts(AccountService.transformParams(params)).pipe(
      map(({ data, error, links }: { data: any[], error: boolean, links: any }) => {
        if (error) {
          return { accounts: [], pagination: PaginationService.defaultPaginationPageLimit };
        }

        return { accounts: data.map((item) => new AccountModel(item)), pagination: PaginationService.buildPaginationSizeNumber(links) };
        }
      ));
  }

  /**
   * Load accounts by userId
   * @param {string} userId
   * @param limit
   * @param ignoreBlocked
   * @returns {Observable<AccountInterface[]>}
   */
  public loadAdminAccountsByUserId(userId: string, limit?: number, ignoreBlocked: boolean = true): Observable<AccountInterface[]> {
    return this.accountApiService.apiLoadAdminAccountsByUserId(userId, limit, ignoreBlocked).pipe(
      map(({ data, error }: { data: any[], error: boolean, links: any }) => error ? [] : data.map((item) => new AccountModel(item)))
    );
  }

  /**
   * Generate account number
   * @returns {Observable<string>}
   */
  public generateAccountNumber(prefix: string): Observable<string> {
    return this.accountApiService.apiGenerateAccountNumber(prefix).pipe(
      map(({ data }: { data: any }): string => data));
  }

  /**
   * @returns {Observable<any>}
   */
  public importAccountsFromCsv(csv: FormData): Observable<any> {
    this.accountApiService.apiImportAccountsFromCsv(csv).subscribe(
      ({ data, error }: { data: any, error: boolean }) => {
        if (error) {
          this.onImportAccountsSubject$.next();
          return;
        }
        this.onImportAccountsSubject$.next();
      }
    );

    return this.onImportAccounts$;
  }

  /**
   * @returns {Observable<any>}
   */
  public exportAccountsToCsv(params: AccountFilterSearchInterface) {
    this.accountApiService.apiExportAccountsToCsv(AccountService.transformParams(params, true)).subscribe((data: FileDownloadModel) => {
      FileSaver.saveAs(data.blob, data.filename);
    });
  }

  public getRFCTime(convertDate: string): string {
    return moment(convertDate).startOf('day').format();
  }
}
