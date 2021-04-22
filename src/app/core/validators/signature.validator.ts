import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

const strRegex = /^[0-9]+$/;

export function signatureValidator(control: FormControl) {
  const result = strRegex.test(control.value);

  if (control.value && control.value.length === 8 && result) {
    return null;
  }
  return { [ErrorCodes.SIGNATURE_INVALID]: '' };
}
