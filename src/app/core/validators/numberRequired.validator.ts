import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

// const strRegex = /^\w+$/;
const strRegex = /[0-9]/i;

export function numberRequiredValidator(control: FormControl) {
  const result = strRegex.test(control.value);

  if (result) {
    return null;
  }
  return { [ErrorCodes.NUMBER_REQUIRED]: { value: control.value } };
}
