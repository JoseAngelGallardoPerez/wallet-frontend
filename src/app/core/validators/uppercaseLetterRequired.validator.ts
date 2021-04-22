import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

// const strRegex = /^\w+$/;
const strRegex = /[A-Z]/;

export function uppercaseLetterRequiredValidator(control: FormControl) {
  const result = strRegex.test(control.value);

  if (result) {
    return null;
  }
  return { [ErrorCodes.UPPERCASE_LETTER_REQUIRED]: { value: control.value } };
}
