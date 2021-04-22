import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ErrorCodes } from '@constants/errorCodes';
import { AccountInterface } from '@interfaces/account-interface';
import { BalanceHelper } from '@helpers/balance.helper';
import { removeErrorFromControl } from '@helpers/removeErrorFromControl';

export function minAmountValidatorFn(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const accountFrom: AccountInterface = control.get('accountFrom').value;
    const outgoingAmount: number = parseFloat(control.get('outgoingAmount').value);
    if (!isNaN(outgoingAmount) && accountFrom) {
      const minAmount = 1 / Math.pow(10, BalanceHelper.getCurrencyPrecision(accountFrom.type.currencyCode));
      if (outgoingAmount < minAmount) {
        control.get('outgoingAmount').setErrors({ [ErrorCodes.MIN_VALUE]: { min: minAmount } });
        return { [ErrorCodes.MIN_VALUE]: { min: minAmount } };
      }
    }
    removeErrorFromControl(control.get('outgoingAmount'), ErrorCodes.MIN_VALUE);
    return null;
  };
}
