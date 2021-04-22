import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function zeroValidator(errorCode = ErrorCodes.NOT_ZERO): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value !== '' && !isNaN(control.value) && +control.value === 0
      ? { [errorCode]: { value: control.value } }
      : null;
  };
}
