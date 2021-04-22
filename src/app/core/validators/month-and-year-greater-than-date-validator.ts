import { FormGroup } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

/**
 * Validate month and year is greater than date
 * @param month
 * @param year
 * @param date
 */
export function monthAndYearGreaterThanDate(month: string, year: string, date: Date) {
  return (group: FormGroup): { [key: string]: any } => {
    const monthValue = parseInt(group.controls[month].value, 10);
    const yearValue = parseInt(group.controls[year].value, 10);
    const dateToCompare = monthValue && yearValue && !isNaN(yearValue) && !isNaN(monthValue)
      ? new Date(yearValue > 10 && yearValue < 100 ? '00' + yearValue : yearValue + '-' + monthValue + '-01')
      : null;
    if (dateToCompare && dateToCompare <= date) {
      group.controls[year].setErrors({ [ErrorCodes.MONTH_AND_YEAR_INVALID]: 'Invalid date' });
      return { [ErrorCodes.MONTH_AND_YEAR_INVALID]: 'Invalid date' };
    } else {
      group.controls[year].updateValueAndValidity({ onlySelf: true });
      return null;
    }
  };
}
