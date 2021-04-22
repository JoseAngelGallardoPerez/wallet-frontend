import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';
import { AccountInterface } from '@interfaces/account-interface';
import { removeErrorFromControl } from '@helpers/removeErrorFromControl';

export function sufficientAmountValidatorFn(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const accountFrom: AccountInterface = control.get('accountFrom').value;
    const outgoingAmount: number = parseFloat(control.get('outgoingAmount').value);
    if (!isNaN(outgoingAmount) && accountFrom && outgoingAmount && outgoingAmount > accountFrom.availableAmount) {
      control.get('outgoingAmount').setErrors({ [ErrorCodes.INSUFFICIENT_FUNDS]: 'insufficient amount' });
      return { [ErrorCodes.INSUFFICIENT_FUNDS]: 'insufficient amount' };
    }
    removeErrorFromControl(control.get('outgoingAmount'), ErrorCodes.INSUFFICIENT_FUNDS);
    return null;
  };
}
