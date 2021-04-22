import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function emptyStringValidator(control: FormControl) {
  const strRegex = /\S/i;
  const value = control.value;
  const result = strRegex.test(value) && value !== '<br>';

  if (result) {
    return null;
  }

  return { [ErrorCodes.NOT_EMPTY]: 'This field should not be empty.' };

}
