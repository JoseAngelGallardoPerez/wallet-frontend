import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[SortHeader]'
})
export class SortHeaderDirective implements AfterViewInit, OnInit, OnDestroy {

  @Input() SortHeader: string;
  @Input() form: FormGroup;
  @Input() name: string;

  private upElement: HTMLElement;
  private downElement: HTMLElement;
  private subscription: Subscription;
  private control: FormControl;

  constructor(private elementRef: ElementRef,
              private _renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
    this.control = this.form.get('sort') as FormControl;
    this.checkValue();
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.classList.add('clickable');
    const spanWithName: HTMLSpanElement = this._renderer.createElement('span');
    this._renderer.createText(this.name);
    this._renderer.appendChild(spanWithName, this._renderer.createText(this.name));
    const spanWithCarets: HTMLSpanElement = this._renderer.createElement('span');
    spanWithCarets.classList.add('arrows', 'carets');
    this.upElement = this._renderer.createElement('i');
    this.upElement.classList.add('fas', 'fa-caret-up');
    this.downElement = this._renderer.createElement('i');
    this.downElement.classList.add('fas', 'fa-caret-down');
    this._renderer.appendChild(this.elementRef.nativeElement, spanWithName);
    this._renderer.appendChild(this.elementRef.nativeElement, spanWithCarets);
    this._renderer.appendChild(spanWithCarets, this.upElement);
    this._renderer.appendChild(spanWithCarets, this.downElement);
    this.setElementsClasses();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: KeyboardEvent) {
    if (this.isSortedByField()) {
      this.control.setValue(this.isSortOrderAsc() ? `-${ this.SortHeader }` : this.SortHeader);
    } else {
      this.control.setValue(`-${ this.SortHeader }`);
    }
  }

  private checkValue(): void {
    this.subscription = this.control.valueChanges.subscribe(() => {
        this.setElementsClasses();
      }
    );
  }

  private isSortedByField(): boolean {
    return this.SortHeader === this.control.value || `-${ this.SortHeader }` === this.control.value;
  }

  private isSortOrderAsc(): boolean {
    return this.control.value === this.SortHeader;
  }

  private setElementsClasses() {
    if (this.isSortedByField()) {
      if (this.isSortOrderAsc()) {
        this.upElement.classList.add('green');
        this.downElement.classList.remove('green');
      } else {
        this.downElement.classList.add('green');
        this.upElement.classList.remove('green');
      }
    } else {
      this.downElement.classList.remove('green');
      this.upElement.classList.remove('green');
    }
  }
}
