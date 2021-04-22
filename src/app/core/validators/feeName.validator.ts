import { AbstractControl, Validators } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

const feeNameRegExp: RegExp = /^[a-zA-Z0-9\s\-_]+$/;

export function feeNameValidator(control: AbstractControl): { [key: string]: any } | null {
  return Validators.pattern(feeNameRegExp)(control) ? { [ErrorCodes.FEE_NAME_PATTERN]: true } : null;
}
