import { AfterContentInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[showPassword]'
})
export class ShowPasswordDirective implements AfterContentInit, OnDestroy {

  private eyeElement: HTMLLinkElement;
  private listenerFn: Function[] = [];

  constructor(private elementRef: ElementRef,
              private _renderer: Renderer2,
  ) {
    this.createEyeElement();
  }

  ngAfterContentInit(): void {
    this._renderer.appendChild(this.elementRef.nativeElement.parentNode, this.eyeElement);
    this.listenerFn.push(this._renderer.listen(this.eyeElement, 'mousedown', () => {
      this._renderer.setAttribute(this.elementRef.nativeElement, 'type', 'text');
    }));
    this.listenerFn.push(this._renderer.listen(this.eyeElement, 'mouseup', () => {
      this._renderer.setAttribute(this.elementRef.nativeElement, 'type', 'password');
    }));
  }

  ngOnDestroy(): void {
    this.listenerFn.forEach((fn) => fn());
  }

  private createEyeElement(): void {
    this.elementRef.nativeElement.classList.add('clickable');
    this.eyeElement = this._renderer.createElement('a');
    this.eyeElement.classList.add('bucket');
    const iconElement: HTMLElement = this._renderer.createElement('i');
    iconElement.classList.add('zmdi', 'zmdi-eye');
    this._renderer.appendChild(this.eyeElement, iconElement);
  }
}
