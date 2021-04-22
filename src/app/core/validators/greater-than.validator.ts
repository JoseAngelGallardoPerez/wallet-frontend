import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function greaterThanValidator(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = parseFloat(control.value);
    return !isNaN(inputValue) && inputValue <= min ? { [ErrorCodes.GREATER_THAN]: min } : null;
  };
}
