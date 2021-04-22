import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function confirmationValidatorFn(targetFieldName: string, confirmFieldName: string, errorFieldName: string): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } => {
    if (control.get(confirmFieldName).value !== control.get(targetFieldName).value) {
      if (targetFieldName === 'password') {
        control.get(confirmFieldName).setErrors({ [ErrorCodes.CONFIRM_PASSWORD_INVALID]: true });
      } else if (targetFieldName === 'email') {
        control.get(confirmFieldName).setErrors({ [ErrorCodes.CONFIRM_EMAIL_INVALID]: true });
      } else {
        control.get(confirmFieldName).setErrors({ [ErrorCodes.CONFIRM_FIELD_INVALID]: true });
      }
    } else {
      control.get(confirmFieldName).updateValueAndValidity({ onlySelf: true });
      return null;
    }
  };
}
