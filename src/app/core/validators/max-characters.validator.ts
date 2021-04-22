import { AbstractControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function maxCharactersValidator(max: number) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (+value <= +max) {
      return null;
    }

    return { [ErrorCodes.MAX_CHARACTERS]: max };
  };

}
