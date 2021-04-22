import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';
import { IUser } from '@interfaces/user-interface';
import { removeErrorFromControl } from '@helpers/removeErrorFromControl';

export function differentUsersValidatorFn(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const userFrom: IUser = control.get('userFrom').value;
    const userTo: IUser = control.get('userTo').value;
    if (userFrom && userTo && userFrom.uid === userTo.uid) {
      control.get('userTo').setErrors({ [ErrorCodes.SAME_USERS]: 'not the same' }, { emitEvent: false });
      control.get('userFrom').setErrors({ [ErrorCodes.SAME_USERS]: 'not the same' }, { emitEvent: false });
      return { [ErrorCodes.SAME_USERS]: 'not the same' };
    }
    removeErrorFromControl(control.get('userTo'), ErrorCodes.SAME_USERS);
    removeErrorFromControl(control.get('userFrom'), ErrorCodes.SAME_USERS);
    return null;
  };
}
