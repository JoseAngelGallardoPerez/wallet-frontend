import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseErrorInterface } from '@interfaces/baseError.interface';
import { combineLatest, Observable, of } from 'rxjs';
import { ErrorDictionary } from '@constants/error.dictionary';
import { first, map } from 'rxjs/operators';
import { ErrorTargets } from '@constants/errorTargets';
import { ErrorCodes, MustShowDetailsErrorCodesWithoutTranslate, MustShowTitleErrorCodes } from '@constants/errorCodes';

@Injectable()
export class ErrorMessageTranslationService {

  private static translateMessage(code: string, target?: string, source?: string, title?: string, details?: string): string {
    // Get error message for specific field
    if (target === ErrorTargets.FIELD && source) {
      const fieldDict: Map<ErrorCodes | string, string> = <Map<ErrorCodes | string, string>>ErrorDictionary.get(source);
      if (fieldDict && fieldDict instanceof Map && fieldDict.get(code)) {
        return `errors.${ source }.${ fieldDict.get(code) }`;
      }
    } else if (MustShowTitleErrorCodes.includes(code)) {
      return title;
    }

    // Return default error message by error code
    return `errors.${ ErrorDictionary.get(code) || code }`;
  }

  constructor(private translate: TranslateService) {
  }

  public translateErrors(error: BaseErrorInterface[]): Observable<string> {
    return combineLatest(error.map((err): Observable<string> => (this.translateError(err))))
      .pipe(first(),
        map((values: string[]) => values.join('<br>')));
  }

  public handleError(error: BaseErrorInterface): Observable<string> {
    if (!MustShowDetailsErrorCodesWithoutTranslate.includes(error.code)) {
      return this.translateError(error);
    } else {
      return of(error.details);
    }
  }

  private translateError(error: BaseErrorInterface): Observable<string> {
    return this.translate.get(
      ErrorMessageTranslationService.translateMessage(error.code, error.target, error.source, error.title, error.details), error.meta
    ).pipe(first());
  }
}
