import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

const strRegex = /^[a-z0-9]+$/i;

export function onlyAlphanumericsValidator(control: FormControl) {
  const result = strRegex.test(control.value);

  if (!control.value || result) {
    return null;
  }
  return { [ErrorCodes.ALLOWED_ONLY_ALPHANUMERICS]: '' };
}
