import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function positiveIntegerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = parseInt(control.value, 10);
    return !isNaN(inputValue) && inputValue <= 0 ? { [ErrorCodes.NOT_POSITIVE_NUBER]: true } : null;
  };
}
