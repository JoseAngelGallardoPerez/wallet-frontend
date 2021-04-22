import {
  ComponentFactoryResolver, ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2, ViewContainerRef,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalSpinnerComponent } from '@components/spinner/local-spinner.component';

@Directive({
  selector: '[disableAfterClick]'
})
export class DisableAfterClickDirective implements OnInit, OnDestroy {
  @Input() disableAfterClick: EventEmitter<boolean>;
  private unsubscribeSubject = new Subject();
  private spinner: ComponentRef<LocalSpinnerComponent>;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @HostListener('click')
  onClick() {
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    this.spinner.instance.show();
  }

  ngOnInit() {
    this.spinner = this.viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(LocalSpinnerComponent)
    );
    this.spinner.instance.setName(this.el.nativeElement.textContent);

    this.disableAfterClick = this.disableAfterClick ? this.disableAfterClick : new EventEmitter();
    this.disableAfterClick
      .pipe(
        takeUntil(this.unsubscribeSubject)
      )
      .subscribe(value => {
      if (!value) {
        this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
        this.spinner.instance.hide();
      } else {
        this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.complete();
  }
}
