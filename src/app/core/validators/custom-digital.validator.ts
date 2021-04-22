import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function customDigitalValidator(control: FormControl) {
  const strRegex = /^[0-9]*$/;
  const value = control.value;
  const result = strRegex.test(value);

  if (result) {
    return null;
  }
  return { [ErrorCodes.NOT_NUMBER]: { value: control.value } };
}
