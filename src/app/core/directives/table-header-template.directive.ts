import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ng-table-heared-template]'
})
export class TableHeaderTemplateDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
