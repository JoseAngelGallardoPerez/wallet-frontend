import { AbstractControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function minCharactersValidator(min: number) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (+value >= +min) {
      return null;
    }

    return { [ErrorCodes.MIN_CHARACTERS]: min };
  };

}
