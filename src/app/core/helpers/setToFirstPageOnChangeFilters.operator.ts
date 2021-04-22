import { distinctUntilChanged } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

export function setToFirstPageOnChangeFilters(form: FormGroup) {
  return distinctUntilChanged((oldFilter: object, newFilter: object): boolean => {
    const changedProperties: string[] = Object.keys(oldFilter)
      .filter((key: string): boolean => newFilter[key] !== oldFilter[key]);

    if (changedProperties.length && !changedProperties.includes('page') && newFilter['page'] !== '1') {
      form.patchValue({ page: '1' });
      return true;
    } else if (!changedProperties.length && newFilter['page'] !== '1') {
      return true;
    }

    return false;
  });
}
