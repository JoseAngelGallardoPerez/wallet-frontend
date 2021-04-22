import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppOptionsService } from '@services/appOptions.service';
import { Subscription } from 'rxjs';
import { optionsValuesNames } from '@constants/optionsPrefixes';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[activeModule]'
})
export class ActiveModuleDirective implements OnDestroy {
  private hasView = false;
  private subscription: Subscription;

  @Input() set activeModule(key: optionsValuesNames) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.optionsService.getOptionsValuePipe(key)
      .pipe(map((value: string) => value === 'enable'))
      .subscribe((isAllowed: boolean) => {
        if (isAllowed && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!isAllowed && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });
  }

  constructor(private optionsService: AppOptionsService,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
