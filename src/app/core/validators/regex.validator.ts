import { AbstractControl } from '@angular/forms';

export function regexValidator(regex: RegExp, errorCode: string) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const result = regex.test(control.value);

    if (result) {
      return null;
    }
    return { [errorCode]: { value: control.value } };
  };
}
