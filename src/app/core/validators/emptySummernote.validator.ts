import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

const strRegex = /\S/i;

export function emptySummernoteValidator(control: FormControl) {
  const value = control.value;
  const result = strRegex.test(control.value) && value !== '<br>' && value !== '<p><br></p>';

  if (result) {
    return null;
  }
  return {
    [ErrorCodes.EMPTY_SUMMERNOTE]: 'This field must not be empty.'
  };
}
