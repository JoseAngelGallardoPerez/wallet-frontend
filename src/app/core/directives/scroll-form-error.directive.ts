import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { UnsubscribeDestroyHelper } from '@helpers/unsubscribe-destroy.helper';
import { merge, Observable } from 'rxjs';
import { ApiErrorService } from '@services/apiError.service';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[scroll-top-error]'
})
export class ScrollFormErrorDirective extends UnsubscribeDestroyHelper implements AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private apiErrorService: ApiErrorService,
    private controlContainer: ControlContainer,
  ) {
    super();
  }

  private getFormSubmitPipe(): Observable<any> {
    return (this.controlContainer.formDirective as FormGroupDirective).ngSubmit;
  }

  ngAfterViewInit() {
    merge(
      this.getFormSubmitPipe(),
      this.apiErrorService.errorsFormSubject,
    ).pipe(
      takeUntil(this.unsubscribeSubject)
    ).subscribe(() => {
      this.seekErrorField();
    });
  }

  private cursorFocus(elem): void {
    if (elem && elem[0]) {
      const topErrorField = elem[0];
      const top = topErrorField.offsetTop ? topErrorField.offsetTop : topErrorField.offsetParent ? topErrorField.offsetParent.offsetTop : 0;
      topErrorField.focus();
      window.scrollTo(0, top);
    }
  }

  private seekErrorField(): void {
    setTimeout(() => {
      const field = this.elementRef.nativeElement.getElementsByClassName('error-field');
      this.cursorFocus(field);
    }, 100);
  }
}
