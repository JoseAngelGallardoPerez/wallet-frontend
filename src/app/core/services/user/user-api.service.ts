/**
 * @license
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders as Headers, HttpParams, HttpResponse } from '@angular/common/http';
import { ApiCallerService } from '../api-caller.service';
import { IUser } from '@interfaces/user-interface';
import { ConfigService } from '@app/config.service';
import { catchError, map } from 'rxjs/operators';
import { FileDownloadModel } from '@models/file-download.model';
import { CallResponceInterface } from '@interfaces/callResponce.interface';

@Injectable()
export class UserApiService {
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
   * Load list of users
   * @returns {Observable<any>}
   */
  public apiLoadUsers(params: [[string, string]]) {
    let requestParams = new HttpParams();
    params.forEach((param) => {
      if (param[0]) {
        requestParams = requestParams.append(param[0], param[1]);
      }
    });
    return this.http.get(
      this.configService.config.api.user.shortUsers,
      { params: requestParams }
    )
      .pipe(map((response: any) => {
          return { data: response && response.data || {}, error: false };
        }),
        catchError(() => of({ error: true })));
  }

  /**
   * Load single user
   * @returns {Observable<any>}
   */
  public apiLoadUser(uid: string) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.user.userById(uid),
        { headers }
      )
    ), 'apiLoadUser');
  }

  /**
   * Update user
   * @returns {Observable<any>}
   */
  public apiPutUser(user: IUser) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.put(
        this.configService.config.api.user.userById(user.uid),
        { data: user },
        { headers }
      )
    ), 'apiPutUser');
  }

  /**
   * Update user
   * @returns {Observable<any>}
   */
  public apiPatchUser(user: any, uid: string) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      // @TODO: replace put with patch after backend ready
      this.http.put(
        this.configService.config.api.user.userById(uid),
        { data: user },
        { headers }
      )
    ), 'apiPutUser');
  }

  /**
   * @returns {Observable<any>}
   */
  public apiLoadRegistrationRequest(id: number) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.user.registrationRequestById(id),
        { headers }
      )
    ), 'apiLoadRegistrationRequest');
  }

  public approveUser(id: number) {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.user.approveUser(id),
        {},
        { headers }
      )
    ), 'apiApproveUser');
  }

  public cancelUser(id: number, reason: string) {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.user.cancelUser(id),
        { reason },
        { headers }
      )
    ), 'apiCancelUser');
  }

  /**
   * Load list of registration requests
   * @returns {Observable<any>}
   */
  public apiLoadRegistrationRequests(params: { [key: string]: string }) {
    return this.http.get(
      this.configService.config.api.user.registrationRequests,
      { params }
    )
      .pipe(map((response: any) => {
          return { data: response && response.data || {}, error: false, links: response.links };
        }),
        catchError(() => of({ error: true })));
  }

  public apiLoadKYCRequests(params: { [key: string]: string }): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.get(this.configService.config.api.kyc.getListRequests, { params })
    ), 'apiLoadKYCRequests');
  }

  /**
   * @returns {Observable<any>}
   */
  public apiExportRegistrationRequestsToCsv(params: { [key: string]: string }) {

    return this.http.get(
      this.configService.config.api.user.exportRegistrationRequestsToCsv,
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
}
