import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

// const strRegex = /^[a-z0-9]+$/i;
const usernamePattern = /^[a-zA-Z0-9_\.'\-\s]+$/;

export function usernameValidator(control: FormControl) {
  const result = usernamePattern.test(control.value);

  if (result) {
    return null;
  }
  return { [ErrorCodes.INVALID_USERNAME]: '' };
}
