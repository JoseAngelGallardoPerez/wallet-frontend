import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export function maxDateValidator(maxDate: Date = new Date()): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return <Date>control.value > maxDate ? { DATE_MORE_THAN_MAX_DATE: moment(maxDate).format('MMM DD YYYY') } : null;
  };
}
