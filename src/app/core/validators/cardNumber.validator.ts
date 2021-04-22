import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CardTypeInterface } from '@interfaces/card-type-interface';
import { CardFormats } from '@constants/card-formats';

export function cardNumberValidatorFn(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const cardType: CardTypeInterface = control.get('cardType').value;
    const cardNumber: string = control.get('number').value;
    if (cardType && cardNumber) {
      if (cardType.format.code === CardFormats.ALPHANUMERIC && cardNumber.length > 20) {
        control.get('number').setErrors({ ['maxlength']: { requiredLength: 20 } });
        return { ['maxlength']: { requiredLength: 19 } };
      } else if (cardType.format.code === CardFormats.SIXTEEN_NUMERIC && cardNumber.length < 19) {
        control.get('number').setErrors({ ['minlength']: { requiredLength: 16 } });
        return { ['minlength']: { requiredLength: 16 } };
      }
      control.get('number').setErrors(null);
    }
    return null;
  };
}
