import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function mimeTypeValidatorFn(acceptTypes: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.value && !acceptTypes.includes((<File>control.value).type)) {
      return { [ErrorCodes.FILE_EXTENSION]: true };
    }

    return null;
  };
}
