import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

// const strRegex = /^\w+$/;
const strRegex = /[\^$*.[\]{}()?\-\+"!@#%&/,><':;|_~']/i;

export function specialCharacterRequiredValidator(control: FormControl) {
  const result = strRegex.test(control.value);

  if (result) {
    return null;
  }
  return { [ErrorCodes.SPECIAL_CHARACTER_REQUIRED]: { value: control.value } };
}
