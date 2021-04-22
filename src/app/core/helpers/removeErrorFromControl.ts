import { AbstractControl } from '@angular/forms';

export function removeErrorFromControl(control: AbstractControl, errorName: string) {
  const errors = Object.assign({}, control.errors);
  delete errors[errorName];
  control.setErrors(Object.keys(errors).length ? errors : null);
}

export function addErrorFromControl(control: AbstractControl, errorName: string) {
  const errors = Object.assign({}, control.errors);
  errors[errorName] = true;
  control.setErrors(Object.keys(errors).length ? errors : null);
}
