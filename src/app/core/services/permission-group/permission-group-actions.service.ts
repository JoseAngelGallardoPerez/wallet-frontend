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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PermissionGroupAction } from '@models/permission-group-actions-model';

@Injectable()
export class PermissionGroupActionsService {

  public constructor(
    private http: HttpClient,
    private apiCallerService: ApiCallerService,
    private configService: ConfigService
  ) {
  }

  public loadPermissionGroupActions(groupId: string): Observable<PermissionGroupAction[] | null> {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.permission.admin.permissionGroupActions,
        {
          params: { groupId },
          headers
        }
      )
    ), 'apiLoadPermissionGroupActions')
      .pipe(
        map(({ data, error }: {
          data: {
            error: {
              errors: object
            }
            items: any[]
          }, error: boolean
        }): PermissionGroupAction[] | null => {
          if (error) {
            return null;
          }
          return data.items.map((item) => new PermissionGroupAction(item));
        })
      );
  }

  public loadAllActions(): Observable<PermissionGroupAction[] | null> {
    const headers = new Headers();
    return this.apiCallerService.call(() => (
      this.http.get(
        this.configService.config.api.permission.admin.permissionGroupActions,
        {
          headers
        }
      )
    ), 'loadAllActions')
      .pipe(
        map(({ data, error }: {
          data: {
            error: {
              errors: object
            }
            items: any[]
          }, error: boolean
        }): PermissionGroupAction[] | null => {
          if (error) {
            return null;
          }
          return data.items.map((item) => new PermissionGroupAction(item));
        })
      );
  }
}
