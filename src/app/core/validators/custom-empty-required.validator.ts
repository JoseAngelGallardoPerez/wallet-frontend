import { AbstractControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function customEmptyRequiredValidator(fieldName: string, errorCode = ErrorCodes.CUSTOM_REQUIRED) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const strRegex = /\S/i;
    const value = control.value;
    const result = strRegex.test(value) && value !== '<br>';

    if (result) {
      return null;
    }
    return { [errorCode]: fieldName };
  };

}
