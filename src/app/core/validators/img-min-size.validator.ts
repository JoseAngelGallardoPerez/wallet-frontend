import { FormGroup } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function imgMinSizeValidator(minWidth: number, minHeight: number) {
  return (form: FormGroup): { [key: string]: any } | null => {

    if (form.get('width').value >= minWidth && form.get('height').value >= minHeight) {
      form.get('width').updateValueAndValidity({ onlySelf: true });
      return null;
    }

    form.get('width').setErrors({ [ErrorCodes.CANNOT_SAVE_LOGO_AREA]: '' });
    form.get('width').markAsTouched({ onlySelf: true });
    return null;
  };
}
