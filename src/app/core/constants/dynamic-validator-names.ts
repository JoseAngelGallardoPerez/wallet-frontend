import { Validators } from '@angular/forms';
import { onlyAlphanumericsValidator } from '@validators/only-alphanumerics.validator';
import { onlyNumericValidator } from '@validators/only-numeric.validator';

export const VALIDATOR_NAME = {
  min: 'min',
  max: 'max',
  minLength: 'minLength',
  maxLength: 'maxLength',

  required: 'required',
  onlyNumeric: 'onlyNumeric',
  onlyAlphanumerics: 'onlyAlphanumerics',
};

export const STATIC_VALIDATORS_LIST = {
  [VALIDATOR_NAME.required]: Validators.required,
  [VALIDATOR_NAME.onlyAlphanumerics]: onlyAlphanumericsValidator,
  [VALIDATOR_NAME.onlyNumeric]: onlyNumericValidator,
};

export const VALIDATORS_DATA_TYPE = {
  int32: 'int32',
  string: 'string',
};
