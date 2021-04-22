import { FormControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function invalidMaxYearValidator(control: FormControl) {

  if (+control.value < 3000) {
    return null;
  }
  return { [ErrorCodes.MONTH_AND_YEAR_INVALID]: '' };
}
