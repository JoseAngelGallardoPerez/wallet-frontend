import { AbstractControl } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';

export function noSpacesValidator() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const regex = / /gm;
    const result = regex.test(control.value);

    if (!result) {
      return null;
    }
    return { [ErrorCodes.NOT_SPACES]: { value: control.value } };
  };
}
