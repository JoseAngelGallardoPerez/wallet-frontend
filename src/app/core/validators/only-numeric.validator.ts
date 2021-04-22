import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

const strRegex = /^[0-9]+$/;

export function onlyNumericValidator(control: FormControl) {
  const result = strRegex.test(control.value);

  if (!control.value || result) {
    return null;
  }
  return { [ErrorCodes.NUMERIC]: { value: control.value } };
}
