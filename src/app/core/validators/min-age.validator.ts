import { FormGroup } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function minAge(month: string | number, year: string | number, day?: string | number, minAgeValue: number = 18) {
  const date: Date = new Date();
  return (group: FormGroup): { [key: string]: any } => {
    const monthValue = parseInt(group.controls[month].value, 10);
    const yearValue = parseInt(group.controls[year].value, 10);
    const dayValue = day ? parseInt(group.controls[day].value, 10) : 1;

    const hasAnyDate: boolean = (group.controls[year].value && group.controls[year].value.length > 3)
    && group.controls[month].value && (day ? group.controls[day].value : true);

    if (hasAnyDate) {
      const formatMonth = monthValue < 10 ? '0' + monthValue : monthValue;
      const formatYear = yearValue + minAgeValue;
      const formatDay = dayValue < 10 ? '0' + dayValue : dayValue;

      const dateFromField = new Date(`${ yearValue }-${ formatMonth }-${ formatDay }`);

      const dateToCompare = monthValue && yearValue && !isNaN(yearValue) && !isNaN(monthValue)
          ? new Date(`${ formatYear }-${ formatMonth }-${ formatDay }`)
          : null;

      if (dateToCompare > date && dateFromField <= date) {
        group.controls[year].setErrors({ [ErrorCodes.MIN_AGE]: true });
        return { [ErrorCodes.MIN_AGE]: 'MIN_AGE' };
      } else {
        return null;
      }
    }
  };
}
