import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[onlyFloat]'
})
export class OnlyFloatDirective {

  private regex: RegExp = /^[0-9.]*$/;
  private floatValueReg: RegExp = /^0$|^0\.$|^.[0-9]+$|^[0-9]+[.]?[0-9]*$/;

  // Allow key codes for special events.
  // 'Backspace', 'Tab', 'End', 'Home', 'Delete', 'F5', 'ArrowLeft', 'ArrowRight'
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete', 'F5', 'ArrowLeft', 'ArrowRight'];

  constructor(private control: NgControl) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    } else if (this.control.value === '0' && this.regex.test(event.key) && !/\./.test(event.key)) {
      this.control.reset();
      return;
    } else if (!this.regex.test(event.key) || !this.floatValueReg.test(`${ this.control.value || '' }${ event.key }`)) {
      event.preventDefault();
    }
  }
}
