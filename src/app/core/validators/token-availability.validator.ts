import { ErrorCodes } from '@constants/errorCodes';
import { AbstractControl } from '@angular/forms';

export function tokenAvailabilityValidator(tokenName: string, strRegex: RegExp, errorCode = ErrorCodes.TOKEN_REQUIRED) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const result = strRegex.test(control.value);

    if (result) {
      return null;
    }

    return { [errorCode]: `[${tokenName}]` };
  };

}
