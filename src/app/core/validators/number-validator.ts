import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return isNaN(control.value) ? { [ErrorCodes.NOT_NUMBER]: { value: control.value } } : null;
  };
}
