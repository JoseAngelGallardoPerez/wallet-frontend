/**
 * @license
 *
 * Use of this source code is governed by an CC BY-NC-ND 4.0 license that can be
 * found in the LICENSE file at https://creativecommons.org/licenses/by-nc-nd/4.0
 */
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders as Headers } from '@angular/common/http';
import { ApiCallerService } from '../api-caller.service';
import { ConfigService } from '@app/config.service';
import { queryParamsStringify } from '@helpers/queryParamsHelpers';
import { FilterUserGroupInterface } from '@interfaces/filter-user-group.interface';
import { CreateUserGroupRequest } from '@request-models/create-user-group-request';

@Injectable()
export class UserGroupApiService {

  public constructor(
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService
  ) {
  }

  public apiLoadUserGroups(filter: FilterUserGroupInterface) {
    const params = {
      page: filter.page,
      limit: filter.limit,
      sort: filter.sort
    };
    if (filter.query) {
      params['filter'] = {
        query: filter.query
      };
    }
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.userGroup.groups,
        {
          params: queryParamsStringify(params),
          headers
        }
      )
    ), 'apiLoadUserGroups');
  }

  public apiLoadUserGroup(groupId: number) {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.userGroup.userGroupById(groupId),
        {
          headers
        }
      )
    ), `apiLoadUserGroup${ groupId }`);
  }

  public apiCreateUserGroup(userGroup: CreateUserGroupRequest) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.userGroup.groups,
        {
          data: userGroup
        },
        { headers }
      )
    ), 'apiCreateUserGroup');
  }

  public apiUpdateUserGroup(userGroup: CreateUserGroupRequest) {
    const headers = new Headers();
    const url = this.configService.config.api.userGroup.userGroupById(userGroup.id);
    delete userGroup.id;
    return this.apiCallerService.call(() => (
      this.http.put(
        url,
        {
          data: userGroup
        },
        { headers }
      )
    ), 'apiUpdateUserGroup');
  }

  public apiDeleteUserGroup(id: number) {
    const url = this.configService.config.api.userGroup.userGroupById(id);
    return this.apiCallerService.call(() => (
      this.http.delete(
        url,
      )
    ), 'apiDeleteUserGroup');
  }
}
