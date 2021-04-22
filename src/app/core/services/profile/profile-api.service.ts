/**
 * @license
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders as Headers, HttpResponse } from '@angular/common/http';
import { ApiCallerService } from '../api-caller.service';
import { ConfigService } from '@app/config.service';
import { ProfileFilter } from '@interfaces/profile-filter-interface';
import { queryParamsStringify } from '@helpers/queryParamsHelpers';
import { convertToIso2 } from '@helpers/stringHelpers';
import { CreateProfileRequest } from '@request-models/create-profile-request';
import { Observable } from 'rxjs';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';
import { map } from 'rxjs/operators';
import { FileDownloadModel } from '@models/file-download.model';
import { TokenService } from '@services/token-service';
import { ProfileModel } from '@models/profile-model';

@Injectable()
export class ProfileApiService {

  public constructor(
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService,
    private tokenService: TokenService
  ) {
  }

  public apiCreateProfile(profile: ProfileModel | CreateProfileRequest) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.user.users,
        {
          data: convertToIso2(profile)
        },
        { headers }
      )
    ), 'apiCreateAccount');
  }

  public apiUpdateProfile(profile: ProfileModel | CreateProfileRequest) {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.put(
        this.configService.config.api.user.userById(profile.uid),
        convertToIso2(profile),
        { headers }
      )
    ), 'apiUpdateProfile');
  }

  public apiLoadProfile(id: string) {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.user.userById(id),
        { headers }
      )
    ), 'apiLoadProfile');
  }

  public apiLoadLimitedMyProfile() {
    const headers = new Headers({
      'X-Tmp-Auth': this.tokenService.getTempAuthToken(),
    });
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.user.limitedProfile,
        { headers }
      )
    ), 'apiLoadLimitedMyProfile');
  }

  public apiLoadMyProfile() {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.user.myProfile,
        { headers }
      )
    ), 'apiLoadMyProfile');
  }

  public apiLoadUserProfiles(params: {[key: string]: string}) {
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.user.users,
        {
          params
        }
      )
    ), 'apiLoadUserProfiles');
  }

  public apiLoadAdminProfiles(params: {[key: string]: string}) {
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.user.users,
        {
          params
        }
      )
    ), 'apiLoadAdminProfiles');
  }

  public apiLoadBlockedProfiles(filter: ProfileFilter): Observable<CallResponceInterface> {
    const userFilter = {
      ...queryParamsStringify(filter),
    };

    const params = this.toCamelCase(queryParamsStringify(this.setDatesWithZone(userFilter)));

    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.user.shortUsers, { params: params }
      )
    ), 'apiLoadBlockedProfiles');
  }

  public apiUnblockProfiles(profiles: {uid: string}[]): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.user.unblockProfiles,
        {
          data: profiles,
        }
      )
    ), 'apiUnblockProfiles');
  }

  /**
   * @returns {Observable<any>}
   */
  public apiExportUserProfilesToCsv(params: {[key: string]: string}) {
    delete params['filter[role_name]'];
    return this.http.get(
      this.configService.config.api.user.exportUserProfilesToCsv,
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
   * @returns {Observable<any>}
   */
  public apiExportAdminProfilesToCsv(params: {[key: string]: string}) {
    delete params['filter[role_name]'];
    return this.http.get(
      this.configService.config.api.user.exportAdminProfilesToCsv,
      {
        params,
        responseType: 'arraybuffer',
        observe: 'response'
      }
    ).pipe(
      map((res: HttpResponse<ArrayBuffer>): {blob: Blob, filename: string} => {
          return new FileDownloadModel(
            new Blob([res.body], { type: 'text/csv' }),
            res.headers.get('Content-Disposition').split(';')[1].trim().split('=')[1]
          );
        }
      )
    );
  }

  private setDatesWithZone(userFilter: {[key: string]: string}): {[key: string]: string} {
    if (userFilter['filter[date_from]']) {
      userFilter['filter[date_from]'] = moment(userFilter['filter[date_from]']).startOf('day').utc().format();
    }
    if (userFilter['filter[date_to]']) {
      userFilter['filter[date_to]'] = moment(userFilter['filter[date_to]']).endOf('day').utc().format();
    }
    return userFilter;
  }

  private toCamelCase(params: {[key: string]: string}): {[key: string]: string} {
    if (params['filter[is_blocked]']) {
      delete params['filter[is_blocked]'];
      params['filter[isBlocked]'] = 'true';
    }

    return params;
  }
}
