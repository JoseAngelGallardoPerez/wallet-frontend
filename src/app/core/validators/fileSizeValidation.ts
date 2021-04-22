import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';
import { FormatBytes } from '@helpers/format-bytes.helper';

export function fileSizeValidatorFn(maxFileSize: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.value && control.value[control.value.length - 1] && (<File>control.value[control.value.length - 1]).size > maxFileSize) {
      return { [ErrorCodes.FILE_SIZE]: FormatBytes(maxFileSize) };
    }
    return null;
  };
}
