import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';
import { bufferCount, debounceTime, mergeMap, map, takeUntil, tap } from 'rxjs/operators';
import { merge, Observable, of, Subject } from 'rxjs';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective, NgControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';
import { ApiError } from '@models/api-error.model';
import { ErrorTargets } from '@constants/errorTargets';
import { ApiErrorService } from '@services/apiError.service';
import { BaseErrorInterface } from '@interfaces/baseError.interface';
import { ErrorMessageTranslationService } from '@services/translate/errorMessageTranslation.service';

@Directive({
  selector: '[appErrorHandle]'
})
export class ErrorHandleDirective implements OnDestroy, AfterViewInit {

  @Input() bufferSize = 1;
  @Input() appErrorHandle: ErrorCodes[];
  @Input() readonly setErrorLastChild = false;
  private alertElement = this._renderer.createElement('label');
  private unsubscribeSubject: Subject<void> = new Subject<void>();
  private touched: Subject<void> = new Subject<void>();
  private errors: ApiError[] = [];
  private relativeFormControlName: string;

  constructor(
    private elementRef: ElementRef,
    private _renderer: Renderer2,
    private errorService: ApiErrorService,
    private controlContainer: ControlContainer,
    private control: NgControl,
    private translateService: ErrorMessageTranslationService,
  ) {
    this.alertElement.classList.add('error-word');
  }

  private get form(): FormGroup {
    return this.controlContainer.formDirective ? (this.controlContainer.formDirective as FormGroupDirective).form : null;
  }

  private get parentNode(): ElementRef {
    return this.elementRef.nativeElement.parentNode;
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
    this.touched.complete();
  }

  ngAfterViewInit(): void {
    this.appendAlertElement();
    this.initRelativeControlName();
    this.subscribeToValueChanges();
  }

  @HostListener('blur', ['$event'])
  private onBlur(): void {
    this.touched.next();
  }

  private getValidatorsErrors(): BaseErrorInterface[] {
    if (this.control.errors) {
      return Object.keys(this.control.errors)
        .map((code: string) => {
          const error = this.control.errors[code];
          let meta: { [key: string]: string };
          switch (code) {
            case ErrorCodes.MIN_VALUE:
              meta = { value: error.min.toString() };
              break;
            case ErrorCodes.MAX_VALUE:
              meta = { value: error.max.toString() };
              break;
            case ErrorCodes.MIN_LENGTH:
            case ErrorCodes.MAX_LENGTH:
              meta = { value: error.requiredLength.toString() };
              break;
            default:
              meta = { value: error };
          }
          return { code, meta };
        });
    }
    return [];
  }

  private getApiErrorsPipe(): Observable<ApiError[]> {
    return this.errorService.errorsPipe.pipe(
      bufferCount(this.bufferSize),
      map((errors: ApiError[][]): ApiError[] => [].concat.apply([], (errors as any))
        .filter((error) => this.errorMatch(error))),
      tap((errors: ApiError[]) => {
        this.errors = errors;
      }));
  }

  private getFormSubmitPipe(): Observable<{}> {
    return (this.controlContainer.formDirective as FormGroupDirective).ngSubmit
      .pipe(tap(() => {
        this.control.control.markAsTouched({ onlySelf: true });
      }));
  }

  private errorMatch(error: ApiError): boolean {
    if (error.target === ErrorTargets.FIELD) {
      return error.source === this.relativeFormControlName;
    } else {
      return this.appErrorHandle && this.appErrorHandle.includes(<ErrorCodes>error.code);
    }
  }

  private initRelativeControlName(): void {
    const formPath = this.controlContainer.path;
    let formControlName = this.control.name;

    if (!formControlName) {
      formControlName = this.getControlName(this.form.controls);
    }

    if (!formControlName && formPath.length) {
      formControlName = this.getControlName(this.recursiveGetControls(formPath));
    }

    if (!formPath.length) {
      this.relativeFormControlName = formControlName;
    } else {
      this.relativeFormControlName = `${formPath.join('.')}.${formControlName}`;
    }
  }

  private recursiveGetControls(formPaths: string[]): { [key: string]: AbstractControl } {
    return formPaths.reduce((controls: { [key: string]: AbstractControl }, partName: string) => {
      return controls[partName]['controls'];
    }, this.form.controls);
  }

  private getControlName(controls: { [key: string]: AbstractControl }): string {
    let controlName = '';

    Object.keys(controls).forEach((key) => {
      if (controls[key] === this.control.control) {
        controlName = key;
      }
    });

    return controlName;
  }

  private appendAlertElement(): void {
    if (!this.setErrorLastChild) {
      this._renderer.insertBefore(this.parentNode, this.alertElement, this.elementRef.nativeElement.nextSibling);
    } else {
      this._renderer.appendChild(this.parentNode, this.alertElement);
    }
  }

  private subscribeToValueChanges(): void {
    merge(
      this.getApiErrorsPipe(),
      this.getFormSubmitPipe(),
      this.form.statusChanges,
      this.touched.asObservable(),
      this.control.valueChanges,
      of(''),
    ).pipe(
      debounceTime(50),
      mergeMap(() => {
        if ((this.control.invalid && this.control.touched) || this.errors.length) {
          return this.translateService.translateErrors([...this.getValidatorsErrors(), ...this.errors]);
        } else {
          return of('');
        }
      }),
      takeUntil(this.unsubscribeSubject),
    ).subscribe((text: string) => {
      if (text) {
        this._renderer.addClass(this.parentNode, 'error-field');
        this.alertElement.innerHTML = text;
      } else {
        this._renderer.removeClass(this.parentNode, 'error-field');
        this.alertElement.innerHTML = '';
      }
      this.errors = [];
    });
  }
}
