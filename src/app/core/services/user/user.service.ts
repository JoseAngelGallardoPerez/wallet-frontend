/**
 * @license
 * Copyright iKantam LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserApiService } from './user-api.service';
import { User } from '@models/user-model';
import { IUser } from '@interfaces/user-interface';
import { PaginationPageLimitInterface } from '@interfaces/pagination-page-limit.interface';
import { PaginationService } from '@services/pagination/pagination.service';
import { map, switchMap, take } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import { FileDownloadModel } from '@models/file-download.model';
import { QueryFieldInterface } from '@interfaces/sort-bar/queryField.interface';
import { DateToFromFieldInterface } from '@interfaces/sort-bar/dateToFromField.interface';
import { SortFieldInterface } from '@interfaces/sort-bar/sortField.interface';
import { PaginationFieldInterface } from '@interfaces/sort-bar/paginationField.interface';
import { queryParamsStringify } from '@helpers/queryParamsHelpers';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';
import { RegistrationRequestInterface } from '@interfaces/registration-request.interface';
import { RegistrationRequestModel } from '@models/registration-request.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { KYCRequestInterface } from '@interfaces/kyc/kyc-request.interface';

export type RegistrationRequestFilter = QueryFieldInterface & DateToFromFieldInterface & SortFieldInterface & PaginationFieldInterface & {
  status: string;
  include?: string;
};

@Injectable()
export class UserService {

  public constructor(
    private userApiService: UserApiService,
    private spinner: NgxSpinnerService,
  ) {
  }
  /**
   * @type {Subject<RegistrationRequestFilter>}
   */
  public loadRegistrationRequestsSubject$: Subject<RegistrationRequestFilter> = new Subject<RegistrationRequestFilter>();

  public onLoadRegistrationRequests$: Observable<{ requests: RegistrationRequestInterface[], pagination: PaginationPageLimitInterface }> =
    this.loadRegistrationRequestsSubject$
      .asObservable()
      .pipe(map((query: RegistrationRequestFilter) => UserService.transformParamsForRequests(query, false)),
        switchMap((params: {[key: string]: string}) => this.userApiService.apiLoadRegistrationRequests(params)),
        map(({ data, error, links }: {data: any, error: boolean, links: any}) => {
          if (error) {
            return { requests: [], pagination: PaginationService.defaultPaginationPageLimit };
          }
          const requests = (<any[]>data).map((item) => new RegistrationRequestModel(item));
          const pagination = PaginationService.buildPaginationSizeNumber(links);
          return { requests, pagination };
        }));

  /**loadKYCRequests*/

  public loadKYCRequestsSubject$: Subject<{ [key: string]: string }> = new Subject<{ [key: string]: string }>();

  public onLoadKYCRequests$: Observable<{ requests: KYCRequestInterface[], pagination: PaginationPageLimitInterface }>
    = this.loadKYCRequestsSubject$.asObservable().pipe(
    map((query: RegistrationRequestFilter) => UserService.transformKycParams(query)),
    switchMap((params: { [key: string]: string }) => this.userApiService.apiLoadKYCRequests(params)),
    map((response: any) => {
      if (response.error) {
        return { requests: [], pagination: PaginationService.defaultPaginationPageLimit };
      }

      const requests = response.data as KYCRequestInterface[];

      const pagination = response.links
        ? PaginationService.buildPaginationPages(response.links) : PaginationService.defaultPaginationPageLimit;
      return { requests: requests, pagination: pagination };
    }),
  );

  private static transformKycParams(queryParams: { [key: string]: string }): { [key: string]: string } {
    const params = { ...queryParams };

    if (params.size) {
      params.limit = params.size;
      delete params.size;
    }

    return queryParamsStringify(params);
  }

  private static transformParams(queryParams: RegistrationRequestFilter, forCsv = false): {[key: string]: string} {
    const params = {
      sort: queryParams.sort,
      include: queryParams.include
    };

    if (!forCsv) {
      params['page'] = queryParams.page;
      params['limit'] = queryParams.size;
    }

    const filter = {};
    if (queryParams.query) {
      filter['query'] = queryParams.query;
    }
    if (queryParams.dateTo) {
      filter['dateTo'] = moment(queryParams.dateTo).endOf('day').utc().format();
    }
    if (queryParams.dateFrom) {
      filter['dateFrom'] = moment(queryParams.dateFrom).startOf('day').utc().format();
    }

    if (queryParams.status) {
      filter['status'] = queryParams.status;
    }
    if (Object.keys(filter).length) {
      params['filter'] = filter;
    }
    return queryParamsStringify(params);
  }

  private static transformParamsForRequests(queryParams: RegistrationRequestFilter, forCsv = false): { [key: string]: string } {
    const params = forCsv ? {} : {
      sort: queryParams.sort,
      include: queryParams.include
    };

    params['page'] = { number: queryParams.page, size: queryParams.size };

    const filter = {};
    if (queryParams.query) {
      filter['title'] = queryParams.query;
    }
    if (queryParams.dateTo) {
      filter['createdAt:lte'] = moment(queryParams.dateTo).endOf('day').utc().format();
    }
    if (queryParams.dateFrom) {
      filter['createdAt:gte'] = moment(queryParams.dateFrom).startOf('day').utc().format();
    }

    if (queryParams.status) {
      filter['status:eq'] = queryParams.status;
    }
    if (Object.keys(filter).length) {
      params['filter'] = filter;
    }

    return queryParamsStringify(params, false);
  }

  public loadUsersForSelect({ username, roleName }: { username: string, roleName: string[] }): Observable<IUser[]> {
    const params: [[string, string]] = [['', '']];
    if (username) {
      params.push(
        Object.entries(
          queryParamsStringify({
            filter: {
              query: username,
            }
          })
        )[0]
      );
    }
    roleName.forEach((name) => {
      params.push(
        Object.entries(
          queryParamsStringify({
            filter: {
              role_name: name,
            }
          })
        )[0]
      );
    });
    return this.userApiService.apiLoadUsers(params)
      .pipe(
      map(({ data, error }: { data: any, error: boolean }) => {
        if (error) {
          return [];
        }
        return data.items.map((item) => new User(item));
      }));
  }

  public loadUser(uid: string): Observable<IUser> {
    return this.userApiService.apiLoadUser(uid)
      .pipe(map(({ data, error }: { data: any, error: boolean }) => {
          if (error) {
            return null;
          }
          return new User(data);
        }
      ));
  }

  /**
   * @returns {Observable<RegistrationRequestInterface>}
   */
  public loadRegistrationRequest(id: number): Observable<RegistrationRequestInterface> {
    return this.userApiService.apiLoadRegistrationRequest(id)
      .pipe(map(({ data, error }: { data: any, error: boolean }) => {
        this.spinner.hide();
          if (error) {
            return null;
          }
          return new RegistrationRequestModel(data);
        }
      ));
  }

  public approveUser(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.userApiService.approveUser(id).pipe(take(1))
        .subscribe(({ data, error }: { data: any, error: boolean }) => {
          resolve(error === false);
        });
    });
  }

  public cancelUser(id: number, reason: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.userApiService.cancelUser(id, reason).pipe(take(1))
        .subscribe(({ data, error }: { data: any, error: boolean }) => {
          resolve(error === false);
        });
    });
  }

  public exportRegistrationRequestsToCsv(params: RegistrationRequestFilter) {
    this.userApiService.apiExportRegistrationRequestsToCsv(UserService.transformParamsForRequests(params, true))
      .pipe(take(1))
      .subscribe((data: FileDownloadModel) => {
        FileSaver.saveAs(data.blob, data.filename);
      });
  }
}
