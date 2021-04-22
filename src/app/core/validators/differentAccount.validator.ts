import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';
import { AccountInterface } from '@interfaces/account-interface';
import { removeErrorFromControl } from '@helpers/removeErrorFromControl';

export function differentAccountValidatorFn(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const accountFrom: AccountInterface = control.get('accountFrom').value;
    const accountTo: AccountInterface = control.get('accountTo').value;
    if (accountFrom && accountTo && accountFrom.id === accountTo.id) {
      control.get('accountTo').setErrors({ [ErrorCodes.SAME_ACCOUNTS]: 'not the same' });
      return { [ErrorCodes.SAME_ACCOUNTS]: 'not the same' };
    }
    removeErrorFromControl(control.get('accountTo'), ErrorCodes.SAME_ACCOUNTS);
    return null;
  };
}
