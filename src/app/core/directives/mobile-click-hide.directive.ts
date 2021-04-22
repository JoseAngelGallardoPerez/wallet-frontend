import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[mobileClickHide]'
})
export class MobileClickHideDirective {

  private selector: string;

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    const classList = event.target.classList;
    if (classList.contains('is-hide')) {
      classList.remove('is-hide');
      this.displayChange('block');
    } else {
      classList.add('is-hide');
      this.displayChange('none');
    }
  }

  public displayChange(value: string): void {
    [].forEach.call(document.querySelectorAll(this.selector), function (elem) {
      elem.style.display = value;
    });
  }

  @Input() set mobileClickHide(selector: string) {
    if (selector) {
      this.selector = selector;
    }
  }
}
