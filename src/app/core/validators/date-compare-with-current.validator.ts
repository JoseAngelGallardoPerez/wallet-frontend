import { FormGroup } from '@angular/forms';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data.min';
import { ErrorCodes } from '@constants/errorCodes';

export function dateCompareWithCurrent(month: string | number, year: string | number, day?: string | number, less: boolean = true) {
  const date: Date = new Date();
  return (group: FormGroup): { [key: string]: any } => {
    const monthValue = parseInt(group.controls[month].value, 10);
    const yearValue = parseInt(group.controls[year].value, 10);
    const dayValue = day ? parseInt(group.controls[day].value, 10) : 1;

    const formatMonth = monthValue < 10 ? '0' + monthValue : monthValue;
    const formatYear = yearValue > 10 && yearValue < 100 ? '00' + yearValue : yearValue;
    const formatDay = dayValue < 10 ? '0' + dayValue : dayValue;

    const dateToCompare = monthValue && yearValue && !isNaN(yearValue) && !isNaN(monthValue)
      ? new Date(`${ formatYear }-${ formatMonth }-${ formatDay }`)
      : null;

    const isValidDate: boolean = moment(`${ formatDay }-${ formatMonth }-${ formatYear }`, 'DD-MM-YYYY', true).isValid();

    if (isValidDate && yearValue > 1800 && dateToCompare && (less ? dateToCompare <= date : dateToCompare >= date)) {
      group.controls[year].updateValueAndValidity({ onlySelf: true });
      return null;
    } else if (yearValue || monthValue || (day ? dayValue : false)) {
      group.controls[year].setErrors({ [ErrorCodes.MONTH_AND_YEAR_INVALID]: 'Invalid date' });
      return { [ErrorCodes.MONTH_AND_YEAR_INVALID]: 'Invalid date' };
    }
  };
}
