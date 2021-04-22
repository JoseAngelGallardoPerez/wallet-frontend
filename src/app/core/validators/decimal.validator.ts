import { AbstractControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function decimalValidator(digBefore: number, digAfter: number) {

  return (control: AbstractControl): { [key: string]: any } => {

    const stringValue = String(control.value);
    let before: string;
    let after: string;

    if (stringValue.includes('.')) {
      before = stringValue.split('.')[0];
      after = stringValue.split('.')[1];
    } else {
      before = stringValue;
    }

    if (
      (before && Number.isInteger(+before) && +before.length > +digBefore)
      || (after && Number.isInteger(+after) && +after.length > +digAfter)
    ) {
      return { [ErrorCodes.DECIMAL_NOT_VALID]: digBefore + '.' + digAfter };
    }

    return null;
  };
}
