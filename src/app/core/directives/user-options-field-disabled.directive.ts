import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { userOptionNames } from '@constants/optionsPrefixes';
import { AppOptionsService } from '@services/appOptions.service';
import { take } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';

@Directive({
  selector: '[user-options-field-disabled]'
})
export class UserOptionsFieldDisabledDirective {
  @Input()
  set optionName(value: userOptionNames) {
    if (this.authService.isAdmin()) {
      return;
    }
    this.appOptionsService.getUserOption(value).pipe(take(1)).subscribe((enabled: boolean) => {
      if (!enabled) {
        this.control.control.disable();
      }
    });
  }

  constructor(private control: NgControl,
              private appOptionsService: AppOptionsService,
              private authService: AuthService) {
  }
}
