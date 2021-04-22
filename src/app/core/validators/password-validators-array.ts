import { lowecaseLetterRequiredValidator } from '@validators/lowecaseLetterRequired.validator';
import { VALIDATION_PROPERTY } from '@constants/validation-property';
import { uppercaseLetterRequiredValidator } from '@validators/uppercaseLetterRequired.validator';
import { numberRequiredValidator } from '@validators/numberRequired.validator';
import { Validators } from '@angular/forms';
import { specialCharacterRequiredValidator } from '@validators/specialCharacterRequired.validator';

const PASSWORD_VALIDATORS_ARRAY = [
  Validators.minLength(VALIDATION_PROPERTY.PASSWORD_MIN_LENGTH),
  Validators.maxLength(VALIDATION_PROPERTY.PASSWORD_MAX_LENGTH),
  numberRequiredValidator,
  uppercaseLetterRequiredValidator,
  lowecaseLetterRequiredValidator,
  specialCharacterRequiredValidator,
];

export function getPasswordValidatorsArray(): any[] {
  return PASSWORD_VALIDATORS_ARRAY;
}

export function getRequiredPasswordValidatorsArray(): any[] {
  const arrayWithRequired = [...PASSWORD_VALIDATORS_ARRAY];
  arrayWithRequired.unshift(Validators.required);
  return arrayWithRequired;
}
