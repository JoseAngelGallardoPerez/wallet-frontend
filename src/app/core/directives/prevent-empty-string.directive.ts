import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[PreventEmptyString]'
})
export class PreventEmptyStringDirective {

  private regex: RegExp = new RegExp(/^ +/);

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ' && this.el.nativeElement.value === '') {
      event.preventDefault();
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp() {
    if (this.regex.test(this.el.nativeElement.value)) {
      this.el.nativeElement.value = this.el.nativeElement.value.trim();
    }
  }
}
