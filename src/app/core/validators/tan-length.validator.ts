import { FormControl, ValidatorFn } from '@angular/forms';

export function tanLengthValidator(length: number): ValidatorFn {
  return (control: FormControl): { [key: string]: any } | null => {
    if (control.value && control.value.length === length) {
      return null;
    }
    return {
      myMinLength: {
        requiredLength: length,
        errorMessage: ` Tan length ${length} digits. `
      }
    };
  };
}

export const tanMask = [ /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/ ];
