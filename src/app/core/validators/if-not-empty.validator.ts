import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ifNotEmptyValidator(validator: ValidatorFn): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }
    return validator(control);
  };
}
