import { AfterContentInit, Directive, ElementRef, HostListener, OnDestroy, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[hideAutoCompletePassword]'
})
export class HideAutoCompleteDirective implements AfterContentInit, OnDestroy {

  private listenerFn: Function[] = [];
  private specialKeys: Array<string> = ['Backspace', 'Delete', 'ControlLeft', 'v'];

  constructor(private elementRef: ElementRef,
              private _renderer: Renderer2,
              private control: NgControl,
  ) {
  }

  ngAfterContentInit(): void {

    this._renderer.setAttribute(this.elementRef.nativeElement, 'type', 'text');

  }

  ngOnDestroy(): void {
    this.listenerFn.forEach((fn) => fn());
  }

  @HostListener('keyup', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    setTimeout(() => {
      if (this.elementRef.nativeElement.type !== 'password' && this.control.value) {
        this._renderer.setAttribute(this.elementRef.nativeElement, 'type', 'password');
        return;
      }
    }, 50);
  }
}
