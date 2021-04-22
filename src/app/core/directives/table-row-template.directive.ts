import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ng-table-row-template]'
})
export class TableRowTemplateDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
