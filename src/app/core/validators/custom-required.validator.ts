import { FormControl, Validators } from '@angular/forms';

export function customRequired(control: FormControl) {
  return Validators.required(control) ? {
    required: {
      errorMessage: ' Required field. '
    }
  } : null;
}

export function tanRequired(control: FormControl) {
  return Validators.required(control) ? {
    required: {
      errorMessage: ' Please enter TAN. '
    }
  } : null;
}
