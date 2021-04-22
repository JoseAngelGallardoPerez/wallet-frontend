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
import { CreatePermissionGroupRequest } from '@request-models/create-permission-group-request';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGroupApiService {

  public constructor(
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService
  ) {
  }

  public apiLoadPermissionGroups(admin: boolean = true) {
    return this.apiCallerService.call(() => (
      this.http.get(
        admin ? this.configService.config.api.permission.admin.groups : this.configService.config.api.permission.admin.clientGroups
      )
    ), 'apiLoadPermissionGroups');
  }

  public apiLoadPermissionGroup(id: number) {
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.permission.admin.permissionGroupById(id),
      )
    ), 'apiLoadPermissionGroup');
  }

  public apiCreatePermissionGroup(permissionGroup: CreatePermissionGroupRequest) {
    const headers = new Headers();

    return this.apiCallerService.call(() => (
      this.http.post(
        this.configService.config.api.permission.admin.groups,
        permissionGroup
        ,
        { headers }
      )
    ), 'apiCreatePermissionGroup');
  }

  public apiUpdatePermissionGroup(permissionGroup: CreatePermissionGroupRequest) {
    const headers = new Headers();
    const url = this.configService.config.api.permission.admin.permissionGroupById(permissionGroup.id);
    delete permissionGroup.id;
    return this.apiCallerService.call(() => (
      this.http.post(
        url,
        permissionGroup
        ,
        { headers }
      )
    ), 'apiUpdatePermissionGroup');
  }

  public apiDeletePermissionGroup(groupId: number) {
    return this.apiCallerService.call(() => (
      this.http.delete(
        this.configService.config.api.permission.admin.permissionGroupById(groupId)
      )
    ), 'apiDeletePermissionGroup');
  }

  public apiLoadUserPermissions(userId: string) {
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.permission.permissionsByUserId,
        { params: { userId } }
      )
    ), 'apiLoadUserPermissions');
  }

  public apiLoadPermissionsCategory(groupId: string): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.get(
        // this.configService.config.api.permission.permissionsByUserId, {  //  todo For Crash Error With spinning wheel
          this.configService.config.api.permission.admin.category, {
          params: { groupId }
        }
      )
    ), 'apiLoadPermissionsCategory');
  }

  public apiLoadPermissionsAllCategory(): Observable<CallResponceInterface> {
    return this.apiCallerService.call(() => (
      this.http.get(this.configService.config.api.permission.admin.category)
    ), 'apiLoadPermissionsAllCategory');
  }
}
