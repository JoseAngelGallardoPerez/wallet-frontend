import { Directive, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[spinnerText]'
})
export class SpinnerTextDirective {

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    viewContainer: ViewContainerRef,
  ) {
  }
}
