import { ApiError } from '@models/api-error.model';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorCodes } from '@app/core/constants/errorCodes';

export class ApiErrorForm implements OnDestroy {
  public errors: ApiError[] = [];
  public errorCodes = ErrorCodes;
  protected unsubscribeSubject = new Subject();

  constructor() {
  }

  public ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  public hasApiErrorWithCode(code: ErrorCodes): boolean {
    return !!this.getErrorForCode(code);
  }

  public hasApiErrorForField(field: string): boolean {
    return !!this.getErrorForField(field);
  }

  public hasErrorWithTitle(title: string): boolean {
    return !!this.getErrorForTitle(title);
  }

  public getErrorForCode(code: ErrorCodes): ApiError | undefined {
    return this.errors.find((err: ApiError) => {
      return Object.is(err.code, code);
    });
  }

  public getErrorForField(field: string): ApiError | undefined {
    return this.errors.find((err: ApiError) => {
      return err.source === field;
    });
  }

  private getErrorForTitle(title: string): ApiError | undefined {
    return this.errors.find((err: ApiError) => {
      return err.title === title;
    });
  }
}
