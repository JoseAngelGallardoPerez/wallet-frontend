import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppOptionsService } from '@services/appOptions.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';

@Directive({
  selector: '[showIfRoot]'
})
export class ShowOnlyIfRootDirective implements OnDestroy {
  private hasView = false;
  private subscription: Subscription;
  private isRoot = this.authService.isRoot();

  @Input() set showIfRoot(key: any) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.isRoot && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!this.isRoot && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private optionsService: AppOptionsService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
