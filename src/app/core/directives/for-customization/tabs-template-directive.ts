import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ng-tabs-template]'
})
export class TabsTemplateDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
