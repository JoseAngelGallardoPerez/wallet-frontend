import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

const floatValueReg: RegExp = /^0$|^[0-9]+$|^[0-9]+[.]?[0-9]+$/;

export function onlyFloatValidator(control: FormControl) {
  const result = floatValueReg.test(control.value);

  if (!control.value || result) {
    return null;
  }
  return { [ErrorCodes.NUMERIC]: { value: control.value } };
}
