import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function insufficientFundsValidator(max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputValue = parseFloat(control.value);
    return !isNaN(inputValue) && inputValue > max ? { [ErrorCodes.INSUFFICIENT_FUNDS]: { max } } : null;
  };
}
