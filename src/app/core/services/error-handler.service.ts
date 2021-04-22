import { ApiError } from '@models/api-error.model';
import { ErrorTargets } from '@app/core/constants/errorTargets';

export class ErrorHandlerService {
  public static generateApiErrors(errors: object | any[] | Error): ApiError[] {
    try {
      if (errors instanceof Array) {
        return errors.map((error): ApiError => {
          return new ApiError({
            details: error.details || error.detail,
            source: error.source || '',
            target: error.target,
            title: error.title,
            code: error.code,
            meta: error.meta
          });
        });
      }
      if (errors instanceof Error) {
        return [new ApiError({ details: errors.message, target: ErrorTargets.COMMON })];
      }
      return Object.keys(errors).map((key): ApiError => {
        return new ApiError({ details: errors[key], source: key });
      });
    } catch (e) {
      return [];
    }
  }
}
