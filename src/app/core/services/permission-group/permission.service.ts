import { Injectable } from '@angular/core';
import { PermissionGroupApiService } from '@services/permission-group/permission-group-api.service';
import { map, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { CallResponceInterface } from '@interfaces/callResponce.interface';
import { Observable } from 'rxjs';
import { PermissionCategoryInterface } from '@interfaces/permission-category.interface';

@Injectable()
export class PermissionService {

  constructor(
    private permissionApiService: PermissionGroupApiService,
    private spinner: NgxSpinnerService,
  ) {
  }

  public loadPermissionsCategory(groupId: string): Observable<PermissionCategoryInterface[]> {
    return this.permissionApiService.apiLoadPermissionsCategory(groupId).pipe(
      tap(() => {
        }, () => {
        }, () => {
          this.spinner.hide();
        }
      ),
      map((data: CallResponceInterface) => {
        if (!data.error && data.data) {
          return data.data['items'];
        }
      })
    );
  }

  public loadPermissionsAllCategory(): Observable<PermissionCategoryInterface[]> {
    return this.permissionApiService.apiLoadPermissionsAllCategory().pipe(
      tap(() => {
        }, () => {
        }, () => {
          this.spinner.hide();
        }
      ),
      map((data: CallResponceInterface) => {
        if (!data.error && data.data) {
          return data.data['items'];
        }
      })
    );
  }

}
