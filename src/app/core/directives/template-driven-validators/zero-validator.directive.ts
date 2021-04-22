import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { zeroValidator } from '@validators/zero-validator';

@Directive({
  selector: '[zeroValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ZeroValidatorDirective,
      multi: true
    }
  ]
})
export class ZeroValidatorDirective implements Validator {
  validator: ValidatorFn;
  constructor() {
    this.validator = zeroValidator();
  }
  validate(c: FormControl) {
    return this.validator(c);
  }
}
