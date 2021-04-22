import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

const portRegExp: RegExp = /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;

export function serverPortValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return Validators.pattern(portRegExp)(control) ? { [ErrorCodes.SERVER_PORT]: true } : null;
  };
}
