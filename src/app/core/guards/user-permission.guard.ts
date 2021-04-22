import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { AppOptionsService } from '@services/appOptions.service';
import { UserPermissions } from '@app/core/constants/userPermissions';
import { map } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { ErrorDictionary } from '@constants/error.dictionary';

@Injectable()
export class UserPermissionGuard implements CanActivate {

  private errorDictionary = ErrorDictionary;

  constructor(
    private notificationService: NotificationsService,
    private appOptionService: AppOptionsService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const permissionsArray: string[] = route.data['permissions'];
    const permissionCode: string = permissionsArray[0];

    return combineLatest(permissionsArray.map((key: UserPermissions) => this.appOptionService.getUserPermissionForKey(key)))
      .pipe(
        map((permissions: boolean[]): boolean => {
          const isAllowed = permissions.includes(true);
          if (!isAllowed) {
            this.notificationService.error(
              'Error',
              this.errorDictionary.has(permissionCode)
                ? `You do not have sufficient permissions to ${ this.errorDictionary.get(permissionCode) }`
                : `You do not have sufficient permissions to access this page ${ permissionCode }`,
            );
            this.router.navigate([route.data['redirectTo'] || 'no-permission']);
          }
          return isAllowed;
        }));
  }
}
