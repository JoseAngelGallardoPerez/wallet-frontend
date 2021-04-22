import { FormControl } from '@angular/forms';

export function emptyHtmlValidator(control: FormControl) {
  const value = strip(control.value);

  if (value !== '') {
    return null;
  }

  return {
    emptyHtmlValidator: {
      errorMessage: 'This field must not be empty.'
    }
  };
}

function strip(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}
