import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppOptionsService } from '@services/appOptions.service';
import { UserPermissions } from '@app/core/constants/userPermissions';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Directive({
  selector: '[viewPermissions]'
})
export class ViewPermissionsDirective implements OnDestroy {
  private hasView = false;
  private subscription: Subscription;

  @Input() set viewPermissions(keys: UserPermissions[]) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = combineLatest(
      keys.map((key: UserPermissions): Observable<boolean> => this.optionsService.getUserPermissionForKey(key)))
      .subscribe((permissions: boolean[]) => {
        const isAllowed = permissions.includes(true);

        if (isAllowed && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else {
          this.notificationService.error(
            'Error',
            `You do not have sufficient permissions to access this page`,
          );

          if (!isAllowed && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
          }
        }

      });
  }

  constructor(
    private notificationService: NotificationsService,
    private optionsService: AppOptionsService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
