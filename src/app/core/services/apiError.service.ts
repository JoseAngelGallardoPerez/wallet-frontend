import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { ErrorHandlerService } from '@services/error-handler.service';
import { ErrorTargets } from '@constants/errorTargets';
import { ApiError } from '@models/api-error.model';
import { ErrorMessageTranslationService } from '@services/translate/errorMessageTranslation.service';
import { filter, first, mergeMap, map } from 'rxjs/operators';
import { SkipNotificationErrorCodes } from '@constants/errorCodes';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Injectable()
export class ApiErrorService implements OnDestroy {

  public errorsFormSubject: Subject<boolean> = new Subject<boolean>();
  private errorsSubject: Subject<ApiError[]> = new Subject<ApiError[]>();

  constructor(
    private notificationService: NotificationsService,
    private translateService: ErrorMessageTranslationService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
    this.showCommonErrors();
  }

  public get errorsPipe(): Observable<ApiError[]> {
    return this.errorsSubject.asObservable();
  }

  ngOnDestroy() {
    this.errorsSubject.complete();
    this.errorsFormSubject.complete();
  }

  public handleErrorResponse(res: HttpErrorResponse): void {
    let errors: ApiError[];
    this.spinner.hide();
    if (res && res.error && res.error.errors) {
      errors = ErrorHandlerService.generateApiErrors(res.error.errors);
      this.errorsSubject.next(errors);
      if (errors.some((error: ApiError) => error.target === ErrorTargets.FIELD)) {
        this.notificationService.error('Error', 'There are errors on the form. Please fix them and try submitting again.');
        this.errorsFormSubject.next(true);
      }
    } else if (res && res.status >= 500) {
      this.notificationService.error('Error', 'An error occurred, please try again later.');
    } else {
      this.notificationService
        .error('Error', 'Something went wrong. Please try again. Should the problem persist, please contact the administrator.');
      this.router.navigate(['not-found']);
    }
  }

  public handleSuccessResponse(): void {
    this.errorsSubject.next([]);
  }

  private showCommonErrors(): void {
    this.errorsPipe.pipe(
      map((errors: ApiError[]): ApiError[] => errors
        .filter((error: ApiError): boolean => error.target === ErrorTargets.COMMON && !SkipNotificationErrorCodes.includes(error.code))
      ),
      filter((errors: ApiError[]): boolean => !!errors.length),
      mergeMap((errors: ApiError[]): Observable<string[]> => combineLatest(
        errors.map((error) => this.translateService.handleError(error))
        ).pipe(first())
      ),
    ).subscribe((errorMessages: string[]): void => {
        errorMessages.filter((message: string) => message !== 'errors.')
          .forEach((message: string) => this.notificationService.error('Error', message));
      });
  }
}
