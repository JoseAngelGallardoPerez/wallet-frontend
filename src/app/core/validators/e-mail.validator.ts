import { AbstractControl, Validators } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';
import { APPLICATION_CONFIG } from '@environments/application-config';

const emailRegExp: RegExp = APPLICATION_CONFIG.patterns.email;

export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  return Validators.pattern(emailRegExp)(control) ? { [ErrorCodes.EMAIL]: true } : null;
}
