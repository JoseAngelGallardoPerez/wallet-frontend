import { AbstractControl, Validators } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

const feeNameRegExp: RegExp = /^[a-zA-Z0-9_ ]+$/;

export function userGroupNameValidator(control: AbstractControl): { [key: string]: any } | null {
  return Validators.pattern(feeNameRegExp)(control) ? { [ErrorCodes.USER_GROUP_NAME_PATTERN]: true } : null;
}
