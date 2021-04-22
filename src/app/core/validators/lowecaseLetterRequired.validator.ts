import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

// const strRegex = /^\w+$/;
const strRegex = /[a-z]/;

export function lowecaseLetterRequiredValidator(control: FormControl) {
  const result = strRegex.test(control.value);

  if (result) {
    return null;
  }
  return { [ErrorCodes.LOWERCASE_LETTER_REQUIRED]: { value: control.value } };
}
