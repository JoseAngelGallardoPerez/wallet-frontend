import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';
import { addErrorFromControl, removeErrorFromControl } from '@helpers/removeErrorFromControl';

export function minLessThanMaxValidatorFn(minFieldName: string, maxFieldName: string, errorCode?: ErrorCodes): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    errorCode = errorCode || ErrorCodes.MIN_LESS_THAN_MAX;

    const minControlValue = control.get(minFieldName).value;
    const maxControlValue = control.get(maxFieldName).value;

    let minIntLength: number;
    let maxIntLength: number;

    let error: boolean;

    if (minControlValue && maxControlValue) {

      minIntLength = getIntLength(minControlValue);
      maxIntLength = getIntLength(maxControlValue);

      if (minControlValue.length <= 15) {
        const minVal = parseFloat(minControlValue);
        const maxVal = parseFloat(maxControlValue);

        error = compareMinMax(minVal, maxVal);
      } else if (minControlValue.length > 15 && minControlValue.length <= 30) {
        const minVal1 = parseFloat(minControlValue.slice(0, 15));

        const minVal2 = minControlValue.slice(0, 15).includes('.')
          ? parseFloat('.' + minControlValue.slice(15, 30))
          : parseFloat(minControlValue.slice(15, 30));

        const maxVal1 = parseFloat(maxControlValue.slice(0, 15));

        const maxVal2 = returnMax2();

        error = compareMinMax(minVal1, maxVal1);

        if (error === false) {
          error = compareMinMax(minVal2, maxVal2);
        }

        checkBigInt(minVal2, maxVal2);

      } else {
        const minVal1 = parseFloat(minControlValue.slice(0, 15));

        const minVal2 = minControlValue.slice(0, 15).includes('.')
          ? parseFloat('.' + minControlValue.slice(15, 30)) : parseFloat(minControlValue.slice(15, 30));

        const minVal3 = parseFloat('.' + minControlValue.slice(30));

        const maxVal1 = parseFloat(maxControlValue.slice(0, 15));

        const maxVal2 = returnMax2();

        const maxVal3 = maxControlValue.length === 30 ? 0 : parseFloat('.' + maxControlValue.slice(30));

        error = compareMinMax(minVal1, maxVal1);

        if (error === false) {
          error = compareMinMax(minVal2, maxVal2);
        }

        if (error === false) {
          error = compareMinMax(minVal3, maxVal3);
        }

        checkBigInt(minVal2, maxVal2);
      }
    }

    function returnMax2(): number {
      return maxControlValue.slice(0, 15).includes('.')
        ? (maxControlValue.length === 15 ? 0 : parseFloat('.' + maxControlValue.slice(15, 30)))
        : (maxControlValue.length === 15 ? 0 : parseFloat(maxControlValue.slice(15, 30)));
    }

    function compareMinMax(min: number, max: number): boolean {
      // console.log(min + '  ' + max);
      // console.log(minIntLength + '  ' + maxIntLength);

      if (!isNaN(min) && !isNaN(max) && min > max && minIntLength >= maxIntLength) {
          return true;
      }

      if (!isNaN(min) && !isNaN(max) && min === max) {
        return false;
      }

      return undefined;
    }

    function checkBigInt(minVal2, maxVal2): void {
      if (error === undefined) {
        if (!isNaN(minVal2) && !isNaN(maxVal2) && minVal2 > maxVal2) {
          error = true;
        }
      }
    }

    function getIntLength(controlValue: string): number {
      let length: number;

      if (controlValue.includes('.')) {
        length = controlValue.split('.')[0].length;
      } else {
        length = controlValue.length;
      }

      return length;
    }

    if (error) {
      addErrorFromControl(control.get(minFieldName), errorCode);
      control.get(minFieldName).markAsTouched();
      return { [errorCode]: true };
    }

    removeErrorFromControl(control.get(minFieldName), errorCode);
    return null;
  };
}
